'use strict';
// const { readSync } = require('fs');
// const { ReactiveFlags } = require('../../../../../../../../../ruanjian/HBuilderX.3.3.13.20220314.full/HBuilderX/plugins/hbuilderx-language-services/builtin-dts/common/vue2And3.js');
/**
 * 此处建议只改下订单状态，保证能及时返回给第三方支付服务器成功状态
 * 限制4秒内必须执行完全部的异步回调逻辑，建议将消息发送、返佣、业绩结算等业务逻辑异步处理（如用定时任务去处理这些异步逻辑）
 * 建议再判断下金额和你业务系统订单中的金额是否一致
 */

// const payCrypto = require('../libs/crypto.js'); // 获取加密服务

module.exports = async (obj) => {
	let user_order_success = true;
	let { data = {} } = obj;
	let {
		order_no,
		out_trade_no,
		total_fee
	} = data; // uni-pay-orders 表内的数据均可获取到

	// 此处写你自己的支付成功逻辑开始-----------------------------------------------------------
	console.log('支付回调接口 ', JSON.stringify( obj ) )
	
	// {"verifyResult":{"openid":"ouYVl5TcUzVuP96SpZurmHZRgmbY","sign":"35322B9F3AD2F664357D9DFADFA7EA42","bankType":"CMB_DEBIT","cashFee":1,"feeType":"CNY","isSubscribe":"N","mchId":"1639303348","nonceStr":"tlgdqpjvtoi6r0p3","outTradeNo":"6416b2bdf43e603fbe889f88-1","resultCode":"SUCCESS","returnCode":"SUCCESS","timeEnd":"20230319145928","totalFee":1,"tradeType":"NATIVE","transactionId":"4200001762202303191912615976","appId":"wxe138116c8c85e553","couponList":[]},"data":{"_id":"6416b2c028064a03b746c09c","provider":"wxpay","provider_pay_type":"native","uni_platform":"web","status":1,"type":"goods","order_no":"6416b2bdf43e603fbe889f88","out_trade_no":"6416b2bdf43e603fbe889f88-1","user_id":"64159e720c801c2ac9cc053f","device_id":"16791086865556982938","client_ip":"127.0.0.1","description":"大模型试用","total_fee":1,"refund_fee":0,"refund_count":0,"provider_appid":"wxe138116c8c85e553","appid":"__UNI__D947FCF","create_date":1679209150110,"stat_data":{"platform":"web","app_version":"1.0.0","app_version_code":"100","os":"windows","ua":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36","channel":"1001","scene":1001},"notify_date":1679209169425,"openid":"ouYVl5TcUzVuP96SpZurmHZRgmbY","original_data":{"appid":"wxe138116c8c85e553","bank_type":"CMB_DEBIT","cash_fee":"1","fee_type":"CNY","is_subscribe":"N","mch_id":"1639303348","nonce_str":"tlgdqpjvtoi6r0p3","openid":"ouYVl5TcUzVuP96SpZurmHZRgmbY","out_trade_no":"6416b2bdf43e603fbe889f88-1","result_code":"SUCCESS","return_code":"SUCCESS","sign":"35322B9F3AD2F664357D9DFADFA7EA42","time_end":"20230319145928","total_fee":"1","trade_type":"NATIVE","transaction_id":"4200001762202303191912615976"},"pay_date":1679209169425,"transaction_id":"4200001762202303191912615976"},"clientInfo":{"secretType":"none","clientIP":"101.226.103.14","userAgent":"Mozilla/4.0","source":"http","requestId":"ac1cd3731679209169096151492"},"cloudInfo":{"provider":"aliyun","spaceId":"mp-d09a8771-fe72-4fbf-8510-c2fd14055eb3","useOldSpaceId":false,"functionName":"uni-pay-co","functionType":"cloudobject"}}
	
	// 这里需要把 params1 params2 params3 改成你数据库里允许用户添加的字段
	// if(!order_no){
	// 	order_no = _id
	// }
	
	// let info2  = await vk.baseDao.findById({
	// 	dbName:'share-my-order',
	// 	id:order_no
	// })
	// console.log('返回数据 ',info2)
	// // let total_fee = 1 // 到时候注释了
	// if(info2.price !== total_fee){
	// 	return { code : -1, msg : '金额不对' };
	// }
	// //更新订单状态
	// let ret  = await vk.baseDao.updateById({
	// 	dbName: 'share-my-order',
	// 	id: order_no,
	// 	dataJson: {
	// 		order_state:'已支付'
	// 	}
	// });
	const db = uniCloud.database();
	let ret = await db.collection('share-my-order').doc(order_no).update({
		order_state:'已支付'
	});
	
	console.log("更新订单状态 ", JSON.stringify( ret ) )
	let reOrder = await db.collection('share-my-order').doc(order_no).get();
	console.log("查询订单 ", JSON.stringify( reOrder ) )
	if(reOrder.data && reOrder.data.length>0){
		
		if(reOrder.data[0].from_uid){
			let reUser2 = await db.collection('uni-id-users').doc(reOrder.data[0].from_uid).get()
			console.log("查询用户 ", JSON.stringify( reUser2 ) )
			if(reUser2.data && reUser2.data.length>0){
				let userMoney = reUser2.data[0].money || 0
				console.log("更新用户 参数 ", JSON.stringify( {
					money:(userMoney + reOrder.data[0].price )
				} ) )
				let reUser = await db.collection('uni-id-users').doc(reOrder.data[0].from_uid).update({
					money:(userMoney + reOrder.data[0].price )
				});
				console.log("查询用户 结果 ", JSON.stringify( reUser ) )
			}
			
		}
	}
	
	return ret
	// 有三种方式
	// 方式一：直接写数据库操作
	// 方式二：使用 await uniCloud.callFunction 调用其他云函数或云对象，云对象则使用 uniCloud.importObject('云对象名称')来请求
	// 方式三：使用 await uniCloud.httpclient.request 调用http接口地址


	/* 
	// 方式二安全模式一（加密）
	let encrypted = payCrypto.aes.encrypt({
		data: data, // 待加密的原文
	});
	await uniCloud.callFunction({
		name: "你的云函数名称",
		data: {
			encrypted, // 传输加密数据
		},
	});
	*/


	/* 
	// 方式二安全模式二（只传一个订单号 out_trade_no，你自己的回调里查数据库表  uni-pay-orders 判断 status是否等于1来判断是否真的支付了）
	await uniCloud.callFunction({
		name: "你的云函数名称",
		data: {
			out_trade_no, // 支付插件订单号
		},
	});
	*/


	/* 
	// 方式三安全模式一（加密）
	let encrypted = payCrypto.aes.encrypt({
		data: data, // 待加密的原文
	});
	await uniCloud.httpclient.request("你的服务器接口请求地址", {
		method: "POST",
		data: {
			encrypted, // 传输加密数据
		},
	});
 */


	/* 
	// 方式三安全模式二（只传一个订单号 out_trade_no，你自己的回调里执行url请求来请求 uni-pay-co 云对象的 getOrder 接口来判断订单是否真的支付了）
	await uniCloud.httpclient.request("你的服务器接口请求地址", {
		method: "POST",
		data: {
			out_trade_no, // 支付插件订单号
		},
	});
 */


	// 此处写你自己的支付成功逻辑结束-----------------------------------------------------------
	// user_order_success =  true 代表你自己的逻辑处理成功 返回 false 代表你自己的处理逻辑失败。
	return user_order_success;
};
