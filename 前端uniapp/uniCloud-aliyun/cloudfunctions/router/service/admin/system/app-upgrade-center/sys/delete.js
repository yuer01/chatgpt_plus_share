module.exports = {
	/**
	 * 删除
	 * @url admin/system/app-upgrade-center/sys/delete 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {String} _id 		id
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
		let { _id } = data;
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: 'id不能为空' };
		let dbName = "opendb-app-versions";
		let info = await vk.baseDao.findById({
			dbName,
			id: _id,
		});
		if (vk.pubfn.isNull(info)) return { code: -1, msg: "版本不存在" };
		if (info.stable_publish) return { code: -1, msg: "不可删除已上线的版本" };
		res.num = await vk.baseDao.deleteById({
			dbName,
			id: _id
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
