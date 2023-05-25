module.exports = {
  /**
   * 修改数据
   * @url admin/kong/sys/update 前端调用的url参数地址
   * data 请求参数 说明
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
			from_pjx,
			from_pjmemo,
			to_pjx,
			to_pjmemo			
		} = data;
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		if(vk.pubfn.isNullOne(_id)){
			return { code : -1, msg : '参数错误' };
		}
		let dbName = "share-my-order";
		await vk.baseDao.updateById({
			dbName,
			id:_id,
			dataJson:{
				from_pjx,
				from_pjmemo,
				to_pjx,
				to_pjmemo,
				order_state:'已评价'
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}
