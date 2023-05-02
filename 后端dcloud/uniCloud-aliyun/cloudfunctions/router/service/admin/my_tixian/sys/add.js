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
			money,
			to_weixin,
			to_alipay,
			to_cardno,
			mobile,
			memo,
		} = data;
		// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
		
		if(money &&money<5000){
			return { code : -1, msg : '提现金额不足50元' };
		}
		
		let resUser = await vk.baseDao.getTableData({
			dbName:'uni-id-users',
			data,
			 whereJson: {
				_id: userInfo._id
			  } ,
			  fieldJson:{
			  	money:true
			  }
		});
		if(resUser.rows[0].money < money){
			return { code : -1, msg : '提现金额大于用户余额' };
		}
		
		let dbName = "share-my-tixian";
		res.id = await vk.baseDao.add({
			dbName,
			dataJson:{
				// { key:"money", title:"提现金额", type:"money", placeholder:"请输入提现金额，单次最少50，最多200" ,rightText:"元",max:200,min:50},
				// { key:"to_weixin", title:"收款微信", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
				// { key:"to_alipay", title:"收款支付宝", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
				// { key:"to_cardno", title:"收款银行卡号", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
				// { key:"mobile", title:"手机号", type:"text" },
				// { key:"memo", title:"备注", type:"textarea",
				// 							maxlength:"99", showWordLimit:true, autosize:{ minRows: 2, maxRows: 10 } ,
				// },
				from_uid: userInfo._id,
				money,
				to_weixin,
				to_alipay,
				to_cardno,
				mobile,
				memo,
				state:'待提现'
				
			}
		});
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
