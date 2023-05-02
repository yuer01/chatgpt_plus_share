## 重要说明

#### 框架目前的配置（不含`uni-id`）在 `cloudfunctions/common/uni-config-center/vk-unicloud/index.js` 中配置

#### `uni-id` 的配置是在 `cloudfunctions/common/uni-config-center/uni-id/config.json` 中配置

#### 每次修改完 配置 中的内容后如果不生效，则尝试以下操作。
```
1. 上传 uni-config-center 公共模块
2. 重新上传 router 云函数

如果是连接本地云函数，则需要重启本地服务才会生效。（hbx的原因）
```


### 由于`uni-id`配置无法打注释，故下方为`uni-id`配置的介绍
```js
{
	"passwordSecret": "passwordSecret-demo",// 加密密码所用的密钥，修改会导致所用户之前的密码失效。如一定要修改，请查看https://uniapp.dcloud.io/uniCloud/uni-id?id=modifysecret
	"tokenSecret": "tokenSecret-demo",			// 生成token所用的密钥，修改会导致所有用户之前的token失效。
	"tokenExpiresIn": 604800,								// 全平台token过期时间，未指定过期时间的平台会使用此值，604800代表7天
	"tokenExpiresThreshold": 3600,					// 新增于uni-id 1.1.7版本，checkToken时如果token有效期小于此值则自动获取新token，如果不配置此参数则不开启自动获取新token功能
	"passwordErrorLimit": 6,								// 密码错误最大重试次数
	"bindTokenToDevice": false,							// 是否将token和设备绑定，设置为true会进行ua校验
	"passwordErrorRetryTime": 3600,					// 密码错误重试次数超限之后的冻结时间
	"autoSetInviteCode": true,							// 是否在用户注册时自动设置邀请码
	"forceInviteCode": false,								// 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）
	"app-plus": {
		"tokenExpiresIn": 604800, 						// app端 token过期时间
		"oauth" : {
			// App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
			"weixin" : {
				"appid" : "",
				"appsecret" : ""
			}
		}
	},
	"mp-weixin": {
		"oauth" : {
			// 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
			"weixin" : {
				"appid" : "",
				"appsecret" : ""
			}
		}
	},
	"mp-alipay": {
		"oauth" : {
			// 支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr
			"alipay" : {
				"appid" : "",
				"privateKey" : ""
			}
		}
	},
	"service": {
		// unicloud短信
		"sms": {
			"name": "重要",										// 应用名称，对应短信模版的name
			"codeExpiresIn": 180,							// 验证码过期时间，单位为秒，注意一定要是60的整数倍
			"smsKey": "你的smsKey",						// 短信密钥key，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
			"smsSecret": "你的smsSecret",			// 短信密钥secret，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
			"templateId":"你的短信模板ID"				// 短信模板ID
		},
		// 一键登录
		"univerify": {
			"appid":"your appid",							// uniapp的appid
			"apiKey": "your apiKey",					// 一键登录的apiKey
			"apiSecret": "your apiSecret"			// 一键登录的apiSecret
		}
	}
}
```