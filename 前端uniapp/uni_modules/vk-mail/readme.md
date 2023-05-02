# vk-mail
### 插件名称：`vk-mail`
### 作者：VK

### 关于插件问题，可以加Q群：`22466457`，只要是插件问题，基本都能在群内得到解决。

## 什么是 `vk-mail` ？
#### `vk-mail` 是一个 `邮件发送` 请求库，大小约200KB，兼容任何 `unicloud` 框架。（只要是 `node.js` 就能使用，使用此库后无需再 npm i nodemailer）

___使用非常简单，与 `nodemailer` API接口保持一致。此库是为了减少一次 npm i nodemailer ，你可以理解为本地版的 nodemailer （nodemailer太大了）___

## 示例

#### 主要代码分为 3 步

```js
// 1、引入 vk-mail
var vkmail = require('vk-mail');

// 2、创建邮箱服务实例
let emailService = vkmail.createTransport({
	"host": "", // 邮件服务商域名地址
	"port": "", // 端口
	"secure": "", // use SSL
	"auth": {
		"user": "", // 发件人邮箱账号
		"pass": "", // 账号授权码
	}
});

// 3、发送邮件
let sendMailRes = await emailService.sendMail({
	"from": "", // 邮件的发送者
	"to": "", // 邮件的接收者
	"cc": "", // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
	"subject": "", // 邮件的标题
	"text": "", // 邮件的内容
	"html": "", // html代码 html和text二选一
});
```

#### 使用云函数发送邮箱验证码完整示例代码

```js
'use strict';

var vkmail;
try {
	vkmail = require('vk-mail');
} catch (err) {
	console.error("请先添加公共模块：vk-mail");
}

exports.main = async (event, context) => {
	let res = { code: 0, msg: "" };

	let {
		email, // 前端接收邮箱
		type = "bind", // 前端接收验证码类型（如: login register bind unbind）
	} = event;

	// 支持QQ 163 等主流邮箱

	let emailConfig = {
		"host": "smtp.163.com",
		"port": 465,
		"secure": true,
		"auth": {
			"user": "xxxx@163.com", // 发件人邮箱账号
			"pass": "xxxxxxxxxxxx", // 账号授权码
		}
	};

	if (!email) return { code: -1, msg: "email不能为空" };
	if (!type) return { code: -1, msg: "type不能为空" };

	let code = Math.floor(Math.random() * 100000) + 100000;
	let subject = `验证码 ${code}`;
	let text = `验证码 ${code}，打死也不要告诉别人！`;

	// 创建邮箱服务实例
	let emailService = vkmail.createTransport({
		"host": emailConfig.host,
		"port": emailConfig.port,
		"secure": emailConfig.secure, // use SSL
		"auth": emailConfig.auth
	});

	try {
		// 发送邮件
		res.sendMailRes = await emailService.sendMail({
			"from": emailConfig.auth.user, // 邮件的发送者
			"to": email, // 邮件的接收者
			"cc": emailConfig.auth.user, // 由于邮件可能会被当成垃圾邮件，但只要把右键抄送给自己一份，就不会被当成垃圾邮件。
			"subject": subject, // 邮件的标题
			"text": text, // 邮件的内容
		});
		// 标记发送成功
		res.code = 0;
		res.msg = "ok";
		// 发送验证码成功后，通常需要设置验证码（写入数据库）
		// await uniID.setVerifyCode({ code, email, type });
	} catch (err) {
		res.code = -1;
		res.msg = "邮件发送失败";
		res.err = err;
	}
	return res;
};

```

## 如何获取配置信息?
```json
{
	"host": "", // 邮件服务商域名地址
	"port": 465, // 端口
	"secure": true, // use SSL
	"auth": {
		"user": "", // 发件人邮箱账号
		"pass": "", // 账号授权码
	}
}
```

### host

登录自己的网页版邮箱，有类似 `设置` 之类的按钮，以 163 邮箱为例。

* 点击 `设置`- `POP3/SMTP/IMAP`
* 将 `IMAP/SMTP服务` 开启
* 在下面可以看到 `SMTP服务器` 域名为 `smtp.163.com` 故 host 为 `smtp.163.com`

### port

port 如无特殊说明，一般固定为 `465` 故 port 为 `465`

### secure

固定为 `true` 即可

### auth 授权信息
#### user 发件人邮箱账号
#### pass 账号授权码 

一般在你开启服务时，页面上会显示你的账号授权码

