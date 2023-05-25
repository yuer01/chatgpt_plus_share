const platform_Android = 'Android';
const platform_iOS = 'iOS';
const package_app = 'native_app';
const package_wgt = 'wgt';
const app_version_db_name = 'opendb-app-versions'
module.exports = {
	/**
	 * App升级中心 - 检测是当前版本是否需要升级
	 * @url user/pub/checkVersion 前端调用的url参数地址
	 * @description 验证token是否有效(会返回uid)
	 * @param {String} uniIdToken 用户token
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} uid 当前token对应的用户uid
	 * @param {Object} userInfo 当前用户信息
	 * @param {Array} role 当前用户角色
	 * @param {Array} permission 当前用户权限
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { customUtil, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		let { context } = originalParam;
		// 业务逻辑开始-----------------------------------------------------------
		/**
		 * 检测升级 使用说明
		 * 上传包：
		 * 1. 根据传参，先检测传参是否完整，appid appVersion wgtVersion 必传
		 * 2. 先从数据库取出所有该平台（从上下文读取平台信息，默认 Andriod）的所有线上发行更新
		 * 3. 再从所有线上发行更新中取出版本最大的一版。如果可以，尽量先检测wgt的线上发行版更新
		 * 4. 使用上步取出的版本包的版本号 和传参 appVersion、wgtVersion 来检测是否有更新，必须同时大于这两项，否则返回暂无更新
		 * 5. 如果库中 wgt包 版本大于传参 appVersion，但是不满足 min_uni_version < appVersion，则不会使用wgt更新，会接着判断库中 app包version 是否大于 appVersion
		 */
		let {
			appid,
			appVersion,
			wgtVersion,
		} = data;

		let platform = context.OS === 'ios' ? platform_iOS : platform_Android;

		// 参数非空检测
		let nullKey = vk.pubfn.isNullOneByObject({ appid, appVersion, wgtVersion, platform });
		if (nullKey) return { code: -102, msg: '参数 ' + nullKey + ' 不能为空' };

		let versionList = await vk.baseDao.select({
			dbName: app_version_db_name,
			getCount: false,
			pageIndex: 1,
			pageSize: 500,
			getMain: true,
			whereJson: {
				appid,
				platform,
				stable_publish: true
			},
			sortArr: [{ name: "create_date", type: "desc" }],
		});
		if (vk.pubfn.isNull(versionList)) return { code: -101, msg: "暂无更新或检查appid是否填写正确" };

		const appVersionInDb = versionList.find(item => item.type === package_app) || {};
		const wgtVersionInDb = versionList.find(item => item.type === package_wgt) || {};
		const hasAppPackage = !!Object.keys(appVersionInDb).length;
		const hasWgtPackage = !!Object.keys(wgtVersionInDb).length;

		// 取两个版本中版本号最大的包，版本一样，使用wgt包
		let stablePublishDb = hasAppPackage ?
			hasWgtPackage ?
			compare(wgtVersionInDb.version, appVersionInDb.version) >= 0 ?
			wgtVersionInDb :
			appVersionInDb :
			appVersionInDb :
			wgtVersionInDb;

		const {
			version,
			min_uni_version
		} = stablePublishDb;

		// 库中的version必须满足同时大于appVersion和wgtVersion才行，因为上次更新可能是wgt更新
		const appUpdate = compare(version, appVersion) === 1; // app包可用更新
		const wgtUpdate = compare(version, wgtVersion) === 1; // wgt包可用更新

		if (Object.keys(stablePublishDb).length && appUpdate && wgtUpdate) {
			// 判断是否可用wgt更新
			if (min_uni_version && compare(min_uni_version, appVersion) < 1) {
				return {
					code: 101,
					msg: 'wgt更新',
					...stablePublishDb
				};
			} else if (hasAppPackage && compare(appVersionInDb.version, appVersion) === 1) {
				return {
					code: 102,
					msg: '整包更新',
					...appVersionInDb
				};
			}
		} else {
			return { code: 0, msg: '当前版本已经是最新的，不需要更新' };
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}



/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
function compare(v1 = '0', v2 = '0') {
	v1 = String(v1).split('.')
	v2 = String(v2).split('.')
	const minVersionLens = Math.min(v1.length, v2.length);

	let result = 0;
	for (let i = 0; i < minVersionLens; i++) {
		const curV1 = Number(v1[i])
		const curV2 = Number(v2[i])

		if (curV1 > curV2) {
			result = 1
			break;
		} else if (curV1 < curV2) {
			result = -1
			break;
		}
	}

	if (result === 0 && (v1.length !== v2.length)) {
		const v1BiggerThenv2 = v1.length > v2.length;
		const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
		for (let i = minVersionLens; i < maxLensVersion.length; i++) {
			const curVersion = Number(maxLensVersion[i])
			if (curVersion > 0) {
				v1BiggerThenv2 ? result = 1 : result = -1
				break;
			}
		}
	}

	return result;
}
