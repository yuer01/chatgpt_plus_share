'use strict';
module.exports = {
	/**
	 * 获取小程序 URL Link，适用于短信、邮件、网页、微信内等拉起小程序的业务场景。通过该接口，可以选择生成到期失效和永久有效的小程序链接，有数量限制，目前仅针对国内非个人主体的小程序开放
	 * @url user/kh/getWeixinMPurl 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} path    小程序页面路径
	 * @param {String} query   小程序页面参数
	 * @param {String} env_version  默认值"release"。要打开的小程序版本。正式版为 "release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			path,
			query,
			env_version
		} = data;
		// 超过180天有10万个限制,故这里强制设为90天
		res = await vk.openapi.weixin.urllink.generate({
			path,
			query,
			env_version,
			is_expire: true,
			expire_type: 1,
			expire_interval: 90, // 90天后失效
		});
		return res;
		// 业务逻辑结束-----------------------------------------------------------
	}
}
