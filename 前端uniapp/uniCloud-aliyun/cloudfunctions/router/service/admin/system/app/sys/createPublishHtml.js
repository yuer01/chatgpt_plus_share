'use strict';
const createPublishHtml = require('../util/createPublishHtml/index.js')
module.exports = {
	/**
	 * 生成发布页HTML
	 * @url admin/system/app/sys/createPublishHtml 前端调用的url参数地址
	 * data 请求参数
	 * @param {String} params1  参数1
	 */
	main: async (event) => {
		let { data = {}, userInfo, util } = event;
		let { vk, db, _ } = util;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始-----------------------------------------------------------
		let { id } = data;
		res = await createPublishHtml({
			id
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
