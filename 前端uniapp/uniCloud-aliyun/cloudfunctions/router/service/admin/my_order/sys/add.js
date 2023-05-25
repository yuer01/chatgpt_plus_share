module.exports = {
  /**
   * 添加单条数据
   * @url admin/kong/sys/add 前端调用的url参数地址
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
			acc_id,
			from_uid,
			price,
			order_type,
			_add_time
		} = data;
		console.log('创建订单 ',data)
		// if(1===1){
		// 	return { code : -1, msg : '最近由于对亚洲地区封控严重，系统暂停购买，已购账号不影响，同时要谨慎使用，开放时间请多关注微信群' };
		// }
		
		if(userInfo.role && userInfo.role.length>0 && userInfo.role[0] === 'youke' ){
			return { code : -1, msg : '游客不能购买，请退出后用自己注册的账号购买' };
		}
		
		let infoCheck  =  await vk.baseDao.selects({
			dbName:'share-my-order',
			whereJson:{
				acc_id:acc_id,
				order_state:'已支付',
				from_uid:from_uid
			}
		})
		// console.log('下单111',{
		// 	acc_id:acc_id,
		// 	pay_state:'已支付',
		// 	from_uid:from_uid
		// })
		
		console.log('下单2222',infoCheck)
		
		if(infoCheck.total >= 8){
			return { code : -1, msg : '该账号已组队满8人，请选择其他账号' };
		}
		// return
		
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		let dbName = "share-my-order";
		res.id = await vk.baseDao.add({
			dbName,
			dataJson:{
				acc_id,
				from_uid,
				to_uid: userInfo._id,
				price,
				order_state:'待支付'
			}
		});
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
