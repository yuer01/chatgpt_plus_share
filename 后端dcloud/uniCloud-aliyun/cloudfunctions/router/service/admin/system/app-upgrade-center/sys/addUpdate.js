const formRules = require("../util/formRules.js");
module.exports = {
	/**
	 * 添加或修改
	 * @url admin/system/app-upgrade-center/sys/addUpdate, 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} appid 				应用的AppID
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util } = event;
		let { vk, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		if (data.platformRadio && vk.pubfn.isNull(data.platform)) {
			data.platform = [data.platformRadio];
		}
		let {
			_id,
			appid,
			name,
			title,
			contents,
			platform,
			platformRadio,
			type,
			version,
			min_uni_version,
			url,
			stable_publish,
			is_silently,
			is_mandatory,
			create_env = "upgrade-center",
			store_list
		} = data;
		// 参数合法校验开始-----------------------------------------------------------
		let mode = _id ? "update" : "add";
		let formRulesRes = await formRules[mode](event);
		if (formRulesRes.code !== 0) {
			return formRulesRes;
		}
		if (type === "wgt") {
			if (vk.pubfn.isNull(min_uni_version)) return { code: -1, msg: "最低app版本号不能为空" };
		}
		// 参数合法校验结束-----------------------------------------------------------
		appid = appid.trim();
		let create_date = Date.now();
		let uni_platform = platform.indexOf("Android") > -1 ? "android" : "ios";
		let dbName = "opendb-app-versions";
		// 添加和修改公共的dataJson
		let dataJson = {
			title,
			contents,
			url,
			min_uni_version,
			stable_publish,
			is_silently,
			is_mandatory,
			store_list
		};

		if (mode === "add") {
			// 获取最新的已发布的版本信息
			let info = await vk.baseDao.select({
				dbName,
				getCount: false,
				getMain: true,
				getOne: true,
				pageIndex: 1,
				pageSize: 1,
				whereJson: {
					appid,
					type,
					platform,
					stable_publish: true
				},
				sortArr: [{ name: "create_date", type: "desc" }],
			});
			// 版本必须比之前的版本高
			if (info && info.version && compareVersion(version, info.version) !== 1) {
				return { code: -1, msg: `版本必须大于${info.version}` };
			}
			// 添加
			vk.pubfn.objectAssign(dataJson, {
				appid,
				name,
				platform,
				version,
				type,
				create_date,
				uni_platform,
				create_env,
			});
			_id = await vk.baseDao.add({
				dbName,
				dataJson
			});
			if (_id) {
				res.success = true;
				res.msg = "添加成功";
			}
		} else {
			// 修改并返回修改后的数据
			res.info = await vk.baseDao.updateAndReturn({
				dbName,
				whereJson: {
					_id
				},
				dataJson
			});
			if (res.info) {
				res.success = true;
				res.msg = "修改成功";
			}
		}

		if (res.success && dataJson.stable_publish) {
			// 将其他版本设置为已下线
			await vk.baseDao.update({
				dbName,
				whereJson: {
					appid,
					type,
					platform,
					stable_publish: true,
					_id: _.neq(_id)
				},
				dataJson: {
					stable_publish: false
				}
			});
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
/**
 * 比较2个版本号的大小
 * 1  version1 > version2
 * 0  version1 = version2
 * -1 version1 < version2
 */
function compareVersion(version1, version2) {
	let arr1 = version1.split(".");
	let arr2 = version2.split(".");
	if (Number(arr1[0]) === Number(arr2[0]) && Number(arr1[1]) === Number(arr2[1]) && Number(arr1[2]) === Number(arr2[2])) {
		return 0;
	}
	if (Number(arr1[0]) > Number(arr2[0])) {
		return 1;
	}
	if (Number(arr1[0]) === Number(arr2[0]) && Number(arr1[1]) > Number(arr2[1])) {
		return 1;
	}
	if (Number(arr1[0]) === Number(arr2[0]) && Number(arr1[1]) === Number(arr2[1]) && Number(arr1[2]) > Number(arr2[2])) {
		return 1;
	}
	return -1;
}
