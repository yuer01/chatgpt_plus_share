'use strict';
module.exports = {
	/**
	 * 发送公众号模板消息（touser可以是小程序下的openid，也可以是公众号下的openid）
	 * @url template/openapi/weixin/pub/sendTemplateMessage 前端调用的url参数地址
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util } = event;
		let { config, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		res = await vk.openapi.weixin.uniformMessage.send({
			touser: "", // 接收者（用户）的 openid（可以是小程序下的openid，也可以是公众号下的openid）
			template_id: "", // 所需下发的订阅模板id
			url: "https://www.baidu.com", // 跳转网页时填写（如填了miniprogram参数则忽略url参数）
			miniprogram: {
				appid: "",
				pagepath: "pages/order/order?id=aaa"
			},
			data: {
				"first": {
					"value": "您购买的订单已经发货啦，正快马加鞭向您飞奔而去。",
					"color": "#173177"
				},
				"keyword1": {
					"value": "D201803111235825",
					"color": "#173177"
				},
				"keyword2": {
					"value": "2018-03-11 19:56",
					"color": "#173177"
				},
				"keyword3": {
					"value": "顺丰快递",
					"color": "#173177"
				},
				"keyword4": {
					"value": "980456952123",
					"color": "#173177"
				},
				"keyword5": {
					"value": "王先生 135xxxxxxxx 广东省深圳市龙华区建设东路",
					"color": "#173177"
				},
				"remark": {
					"value": "欢迎再次购买！",
					"color": "#173177"
				}
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
