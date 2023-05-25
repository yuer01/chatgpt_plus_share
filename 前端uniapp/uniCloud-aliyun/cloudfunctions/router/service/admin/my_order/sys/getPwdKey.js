module.exports = {
  /**
   * 查询多条记录 分页
   * @url admin/kong/sys/getList 前端调用的url参数地址
   * data 请求参数 说明
   * @param {Number}         pageIndex 当前页码
   * @param {Number}         pageSize  每页显示数量
   * @param {Array<Object>}  sortRule  排序规则
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   * res 返回参数说明
   * @param {Number}         code      错误码，0表示成功
   * @param {String}         msg       详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid,order_no } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		
		// let dbName = "share-my-acc";
		let res2 = await vk.baseDao.getTableData({
			dbName:'share-my-order',
			// data,
			 whereJson: {
				_id: order_no
			  } 
		});
		
		if(!res2.rows || res2.rows.length === 0){
			return { code : -1, msg : '找不到订单' };
		}
		if(res2.rows[0].order_state !== '已支付' && res2.rows[0].order_state !== '已评价'){
			return { code : -1, msg : '订单状态不对' };
		}
		let acc_id = res2.rows[0].acc_id
		let res3 = await vk.baseDao.getTableData({
			dbName:'share-my-acc',
			// data,
			 whereJson: {
				_id: acc_id
			  } ,
			  fieldJson: {
			  	password_key:true
			  },
		});
		if(!res3.rows || res3.rows.length === 0){
			return { code : -1, msg : '找不到账号信息' };
		}
		console.log('我的订单 33 ', JSON.stringify( res2 ) )
		let ret5 = { code : 0, msg : res3.rows[0].password_key }
		return ret5;
  }

}
