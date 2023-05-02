/**
 * 注册成功后，统一给用户初始化字段值
 */

module.exports = [{
	id: "registerInit",
	// 符合下方正则条件的云函数才会进入该中间件
	regExp: [
		"^user/pub/register(.*)",
		"^user/pub/login(.*)",
		"^admin/system/user/sys/add"
	],
	description: "注册成功后，统一给用户初始化字段值",
	index: 301,
	mode: "onActionExecuted", // 可选 onActionExecuting onActionExecuted
	enable: true, // 通过设置enable=false可以关闭该中间件
	main: async function(event, serviceRes) {
		let { data = {}, util, filterResponse, originalParam } = event;
		let { vk, config, db, _ } = util;
		let res = serviceRes;

		// 初始化用户信息（只在用户注册成功时才执行下面的代码）
		if (res.code === 0 && res.type === "register" && res.uid) {
			let uniIdConfig = vk.pubfn.getUniIdConfig(config); // 获取uniID的配置
			// 你要初始化的字段数据
			let initData = {
				// 这里可以加你想要初始化的其他字段，如 status字段初始化为 0
				status: 0, // 用户状态：0 正常 1 禁用 2 审核中 3 审核拒绝

			};
			// 如果开启了删除dcloud_appid功能，则初始化数据带上 dcloud_appid: _.remove()
			if (uniIdConfig.removeDcloudAppid) {
				// remove功能是删除该字段（代表关闭隔离不同端用户功能），该用户在其他项目中登录时就不会产生新的账号 详见：https://uniapp.dcloud.io/uniCloud/uni-id.html#isolate-user
				initData["dcloud_appid"] = _.remove();
			}
			// 修改用户信息，并返回修改后的用户信息
			res.userInfo = await vk.daoCenter.userDao.updateAndReturn({
				whereJson: {
					_id: res.uid,
				},
				dataJson: initData
			});
		}
		return res;
	}
}]
