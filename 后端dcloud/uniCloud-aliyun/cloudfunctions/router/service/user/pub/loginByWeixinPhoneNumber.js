module.exports = {
	/**
	 * 用户登录(微信手机号授权)
	 * @url user/pub/loginByWeixinPhoneNumber 前端调用的url参数地址
	 * @description 用户登录(微信授权)
	 * data 请求参数 说明
	 * @param {String} code 通过 getphonenumber 事件获取到的code（code和encryptedData+iv二选一）
	 * @param {String} encryptedData（code和encryptedData+iv二选一）
	 * @param {String} iv（code和encryptedData+iv二选一）
	 * @param {String} encryptedKey code2SessionWeixin 接口返回的encryptedKey
	 * res 返回参数说明
	 * @param {Number} code 错误码，0表示成功
	 * @param {String} msg 详细信息
	 * @param {String} token 登录成功之后返回的token信息
	 * @param {String} tokenExpired token过期时间
	 */
	main: async (event) => {
		let { data = {}, util, originalParam } = event;
		let { uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = {};
		// 业务逻辑开始-----------------------------------------------------------
		let {
			nickname,
			avatar,
			gender,
			inviteCode,
			encryptedKey,
			code,
			encryptedData,
			iv
		} = data;

		// 获取微信绑定的手机号
		res = await vk.openapi.weixin.decrypt.getPhoneNumber({
			encryptedKey,
			code,
			encryptedData,
			iv
		});
		if (res.code !== 0) return res;
		let {
			mobile
		} = res;
		let mobileCode = vk.pubfn.random(6);
		// 指定操作类型，可选值为login、register，不传此参数时表现为手机号已注册则登录，手机号未注册则进行注册
		let type;
		// 通过手机号登录
		await uniID.setVerifyCode({ mobile, code: mobileCode, expiresIn: 60, type: "login" });
		res = await uniID.loginBySms({ mobile, code: mobileCode, type, inviteCode });
		if (!res.token) return res;
		if (!res.msg) {
			res.msg = res.type === "register" ? "注册成功" : "登录成功";
		}
		if (res.type === "register") {
			// 解密获得openid和unionid
			let decryptedRes = vk.crypto.aes.decrypt({
				data: encryptedKey, // 待解密的原文
			});
			let wx_openid = {};
			let wx_unionid = decryptedRes.unionid;
			wx_openid["mp-weixin"] = decryptedRes.openid;
			// 查询openid或unionid是否已经存在,如果存在,则不绑定微信.
			let queryUserInfo = await vk.daoCenter.userDao.findByUserInfo({
				"wx_openid.mp-weixin": wx_openid["mp-weixin"],
				"wx_unionid": wx_unionid
			});
			res.bindWeixin = vk.pubfn.isNull(queryUserInfo) ? true : false;
			// 需要额外添加的字段
			let mobileStr = mobile.substring(7);
			let dataJson = {
				nickname: nickname || `手机尾号${mobileStr}用户`,
				avatar,
				gender
			};
			if (res.bindWeixin) {
				dataJson["wx_openid"] = wx_openid;
				dataJson["wx_unionid"] = wx_unionid;
			}
			res.userInfo = await vk.baseDao.updateAndReturn({
				dbName: "uni-id-users",
				whereJson: {
					_id: res.uid
				},
				dataJson
			});
		}
		// 日志服务
		const loginLogService = vk.require("service/user/util/login_log");
		await loginLogService.add({
			type: res.type,
			login_type: "weixinPhoneNumber",
			user_id: res.uid,
			context: originalParam.context
		}, util);
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
