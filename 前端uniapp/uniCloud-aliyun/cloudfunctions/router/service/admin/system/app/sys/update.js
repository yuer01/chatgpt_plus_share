const formRules = require("../util/formRules.js");
module.exports = {
	/**
	 * 修改应用
	 * @url admin/system/app/sys/update 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} _id 					id
	 * @param {String} name					应用名称
	 * @param {String} type					应用类型
	 * @param {String} description 	应用描述
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			_id,
			appid,
			type,
			name,
			description,
			// 1.13.4 新增以下字段（主要用于生成统一发布页和APP升级中心）
			enable_upgrade_center,
			introduction,
			icon_url,
			screenshot,
			app_android,
			app_ios,
			mp_weixin,
			mp_alipay,
			mp_baidu,
			mp_toutiao,
			mp_qq,
			mp_kuaishou,
			mp_lark,
			mp_jd,
			mp_dingtalk,
			quickapp,
			h5,
			store_list,
		} = data;
		// 参数合法校验开始-----------------------------------------------------------
		let formRulesRes = await formRules.update(event);
		if (formRulesRes.code !== 0) {
			return formRulesRes;
		}
		// 参数合法校验结束-----------------------------------------------------------
		appid = appid.trim();
		let dbName = "opendb-app-list";
		let num = await vk.baseDao.count({
			dbName,
			whereJson: {
				_id: _.neq(_id),
				appid
			}
		});
		if (num > 0) {
			return { code: -1, msg: '修改失败，appid已存在！' };
		}
		res.num = await vk.baseDao.updateById({
			dbName,
			id:_id,
			dataJson:{
				appid,
				type,
				name,
				description,
				// 1.13.4 新增以下字段（主要用于生成统一发布页和APP升级中心）
				enable_upgrade_center,
				introduction,
				icon_url,
				screenshot,
				app_android,
				app_ios,
				mp_weixin,
				mp_alipay,
				mp_baidu,
				mp_toutiao,
				mp_qq,
				mp_kuaishou,
				mp_lark,
				mp_jd,
				mp_dingtalk,
				quickapp,
				h5,
				store_list,
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
