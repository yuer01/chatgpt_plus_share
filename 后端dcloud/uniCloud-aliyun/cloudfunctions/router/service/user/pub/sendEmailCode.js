var vkmail;
try {
	vkmail = require('vk-mail');
} catch (err) {
	console.error("请先添加公共模块：vk-mail（右键对应的云函数，点击管理公共模块或扩展库依赖，勾选vk-mail依赖）");
}
module.exports = {
	/**
	 * 发送邮箱验证码
	 * @url user/pub/sendEmailCode 前端调用的url参数地址
	 * @description 发送邮箱验证码
	 * data 请求参数 说明
	 * @param {String} email 邮箱
	 * @param {String} type  验证码类型
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} email 手机号  
	 * @param {String} verifyCode 验证码
	 */
	main: async (event) => {
		let { data = {}, util } = event;
		let { uniID, config } = util;
		let { email, type } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始----------------------------------------------------------- 
		let code = vk.pubfn.random(6, "0123456789");
		let param = {
			code,
			type,
			email
		};
		// 发送验证码开始
		var emailConfig = config.vk.service.email;
		let emailService = vkmail.createTransport({
			"host": emailConfig[data.serviceType].host,
			"port": emailConfig[data.serviceType].port,
			"secure": emailConfig[data.serviceType].secure, // use SSL
			"auth": emailConfig[data.serviceType].auth
		});
		try {
			// 发送邮件
			await emailService.sendMail({
				"from": emailConfig[data.serviceType].auth.user,
				"to": data.email,
				"cc": emailConfig[data.serviceType].auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把邮件抄送给自己一份，就不会被当成垃圾邮件。
				"subject": data.subject, // 邮件的标题
				"text": `您的验证码是${code},打死也不要告诉别人哦!`, // 邮件的内容
			});
			// 发送验证码成功后，设置验证码
			await uniID.setVerifyCode(param);
		} catch (err) {
			console.error(err);
			return { code: -1, msg: "邮件发送失败", err };
		}
		// 发送验证码结束

		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
