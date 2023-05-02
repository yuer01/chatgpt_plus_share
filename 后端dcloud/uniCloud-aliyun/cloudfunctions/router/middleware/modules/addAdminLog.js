/**
 * 添加操作日志
 */

// 需要添加日志的云函数列表
const urlList = [
	{ url: "admin/system/user/sys/add", title: "用户添加" },
	{ url: "admin/system/user/sys/update", title: "用户修改" },
	{ url: "admin/system/user/sys/delete", title: "用户删除" },
	{ url: "admin/system/user/sys/batchUpdateStatus", title: "批量修改用户冻结状态" }
];

// 生成regExp规则
let regExp = urlList.map((item, index) => {
	return `^${item.url}$`;
});

module.exports = [{
	id: "addAdminLog",
	// 需要添加操作日志的云函数列表
	regExp,
	description: "添加admin操作日志",
	index: 999, // 确保最后执行即可
	mode: "onActionExecuted", // 可选 onActionExecuting onActionExecuted
	enable: true, // 通过设置enable=false可以关闭该中间件
	main: async function(event, serviceRes) {
		let { url, data = {}, uniIdToken, util, filterResponse, originalParam } = event;
		let { uniID, config, vk, db, _ } = util;
		let { userInfo = {} } = filterResponse;
		let res = serviceRes;
		try {
			// 此处加 try catch 保证即使添加日志环节出错，不影响业务运行。
			if (res.code === 0) {
				// 只有请求成功的请求才添加日志
				let item = vk.pubfn.getListItem(urlList, "url", url);
				let title = item && item.title ? item.title : "未分类";
				delete data.uid;
				// 日志写入数据库
				// 获取请求id（只有云端云函数才有请求id，本地运行的云函数无请求id）
				let request_id;
				if (typeof vk.pubfn.getUniCloudRequestId === "function") {
					request_id = vk.pubfn.getUniCloudRequestId();
				}
				await vk.baseDao.add({
					dbName: "opendb-admin-log",
					dataJson: {
						user_id: userInfo._id,
						user_name: userInfo.nickname,
						title,
						ip: originalParam.context.CLIENTIP,
						url: url,
						request_param: data,
						response: serviceRes,
						request_id
					}
				});
			}
		} catch (err) {
			console.error("添加日志异常", err);
		}
		return res;
	}
}]
