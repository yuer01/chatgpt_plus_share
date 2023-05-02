module.exports = {
	/**
	 * 发送短信的验证码
	 * @url user/pub/sendSmsCode 前端调用的url参数地址
	 * @description 发送验证码
	 * data 请求参数 说明
	 * @param {String} mobile 手机号
	 * @param {String} type  验证码类型
	 * @param {Boolean} checkUserExist 是否需要检测手机号对应的账号是否存在，默认false：不检测 设置为true：会检测，如果检测到用户不存在，则不发短信。
	 * 
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {Object} requestRes 原始返回数据
	 * @param {Object} requestParam 包含服务供应商和发送的手机号
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { mobile, type, checkUserExist = false } = data;
		if (vk.pubfn.isNull(mobile)) {
			return { code: -1, msg: '手机号不能为空' };
		}
		if (!vk.pubfn.test(mobile, 'mobile')) {
			return { code: -1, msg: "手机号格式错误" };
		}
		if (checkUserExist) {
			let dcloud_appid = originalParam.context.appId;
			// 检测手机号对应的账号是否存在
			let num = await vk.daoCenter.userDao.count({
				mobile,
				dcloud_appid: _.or(_.eq(dcloud_appid), _.exists(false))
			});
			if (num === 0) {
				return { code: -1, msg: `手机号：${mobile} 未注册`, notExists:true };
			}
		}
		let code = vk.pubfn.random(6, "0123456789");
		let provider = "unicloud";
		if (vk.pubfn.getData(config, "vk.service.sms.aliyun.enable")) {
			provider = "aliyun";
		}
		res = await vk.system.smsUtil.sendSmsVerifyCode({
			provider,
			code,
			type,
			phone: mobile,
			expiresIn: 180, // 验证码实际有效时间，必须是60的倍数
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
