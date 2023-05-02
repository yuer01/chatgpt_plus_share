'use strict';
module.exports = {
	/**
	 * 获取菜单列表（一次性获取全部）
	 * @url admin/system/menu/sys/getAll 前端调用的url参数地址
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: "" };
		// 业务逻辑开始----------------------------------------------------------- 
		// 返回树状结构代码详情见：https://vkdoc.fsq.pub/client/uniCloud/db/getTree.html
		res = await vk.system.sysDao.listMenuToTree({
			pageIndex: 1,
			pageSize: 500,
			whereJson: {
				parent_id: _.in([null,""])
			},
			treeProps:{
				level: 3
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
