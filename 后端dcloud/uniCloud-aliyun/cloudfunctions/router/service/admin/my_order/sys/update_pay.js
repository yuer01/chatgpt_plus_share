const { updateAndReturn } = require("../../../../../../../uniCloud-aliyun/cloudfunctions/router/dao/modules/userDao");

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
		
		// pay_order:
		// appid: "__UNI__D947FCF"
		// client_ip: "127.0.0.1"
		// create_date: 1679206755914
		// description: "大模型试用"
		// device_id: "16791086865556982938"
		// order_no: "6416a96309e2988160ffd74e"
		// out_trade_no: "6416a96309e2988160ffd74e-1"
		// provider: "wxpay"
		// provider_appid: "wxe138116c8c85e553"
		// provider_pay_type: "native"
		// refund_count: 0
		// refund_fee: 0
		// stat_data: {platform: 'web', app_version: '1.0.0', app_version_code: '100', os: 'windows', ua: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/5…ML, like Gecko) Chrome/99.0.4844.51 Safari/537.36', …}
		// status: 0
		// total_fee: 1
		// type: "shiyong"
		// uni_platform: "web"
		// user_id: "64159e720c801c2ac9cc053f"
		// _id: "6416a96409e2988160ffd806"
		
		let {
			order_no,
			_id,
			// password_key,
			// pay_state
		} = data;
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		if(!order_no){
			order_no = _id
		}
		
		let info2  = await vk.baseDao.findById({
			dbName:'share-my-order',
			id:order_no
		})
		console.log('返回数据 ',info2)
		let total_fee = 1 // 到时候注释了
		if(info2.price !== total_fee){
			return { code : -1, msg : '金额不对' };
		}
		//更新订单状态
		let ret3  = await vk.baseDao.updateById({
			dbName: 'share-my-order',
			id: order_no,
			dataJson: {
				order_state:'已支付'
			}
		});
		if(ret3){
			return { code : 0, msg : '更新订单成功' };
		}else{
			return { code : -1, msg : '更新订单失败' };
		}
		
		return
		//
		let info  =  await vk.baseDao.selects({
			dbName:'share-my-order',
			whereJson:{
				_id:order_no
			},
			foreignDB:[
				{
					dbName:'share-my-acc',
					localKey:"_id",
					foreignKey:'acc_id',
					as:'t1',
					limit:1
				}
			]
		})
		// 查询订单信息
		console.log('查询订单信息 111111 ',info)
		//查询passwor_key
		let password_key = info
		
		let dbName = "share-my-order";
		await vk.baseDao.updateById({
			dbName,
			id:order_no,
			dataJson:{
				password_key,
				order_state:'已支付'
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
    return res;
  }

}
