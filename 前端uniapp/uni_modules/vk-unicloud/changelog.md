## 2.13.2（2023-01-19）
* 1、【调整】router云函数运行内存调整为512M（实测512M即可达到最优性能）
* 2、【新增】微信最新版头像和昵称获取示例，详见：/pages_template/uni-id/weixin/set-user-info.vue
* 3、【优化】升级微信小程序文本检测API `vk.openapi.weixin.security.msgSecCheck` 至2.0版本 [传送门 - 微信文档](https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html)
* 4、【修复】`微信公众号万能API调用接口` 在调用部分接口时可能会报错的问题
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.13.1（2022-12-29）
* 1、【调整】url化后token的请求头从 `uni_id_token` 改为 `uni-id-token`（新版阿里云不支持 `uni_id_token` 请求头）
* 2、【修复】`vk.openapi.weixin.h5.request` 接口无法在阿里云空间中自动使用代理的问题。
* 3、【修复】`vk.pubfn.getOffsetTime` 接口在云端月偏移量计算在可能会出错的问题。
* 4、【优化】其他一些兼容性问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.13.0（2022-12-29）
* 1、【调整】url化后token的请求头从 `uni_id_token` 改为 `uni-id-token`（新版阿里云不支持 `uni_id_token` 请求头）
* 2、【修复】`vk.openapi.weixin.h5.request` 接口无法在阿里云空间中自动使用代理的问题。
* 3、【修复】`vk.pubfn.getOffsetTime` 接口在云端月偏移量计算在可能会出错的问题。
* 4、【优化】其他一些兼容性问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.9（2022-12-13）
* 1、【优化】`vk.pubfn.getCommonTime()` API内部细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.8（2022-12-05）
* 1、【修复】let { weekStart } = vk.pubfn.getCommonTime(new Date()); weekStart一直是undefined的问题
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.7（2022-11-30）
* 1、【优化】新版阿里云空间通过代理请求微信公众号API细节处理
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.6（2022-11-24）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.5（2022-11-12）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.4（2022-11-12）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.3（2022-11-05）
* 1、【优化】新增 cancelAddTimeStr 配置，用于单独取消 _add_time_str
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/0092145a-8169-475d-83c5-c873ae8d0c05.png)
* 2、【优化】部分API的报错提示
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.2（2022-10-25）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.1（2022-10-10）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.12.0（2022-10-07）
* 1、【重要】vk实例初始化代码调整（因HBX更新导致本地运行时，不同的云函数环境目前没有隔离（云端无此问题，只有本地运行有此问题），从而导致HBX本地运行时，A云函数和B云函数复用了同一个vk实例，而更新后，vk实例在不同云函数内会隔离）

`router/index.js` 代码修改（注意：如果你只使用一个router，则不修改也没有问题）

```js
'use strict';
// 注意：此为云函数路由入口文件，请勿修改此文件代码，你自己的云函数逻辑应写在service目录下
const vk = require('vk-unicloud');              // vk-unicloud 工具包
vk.init(require('./config.js'));
exports.main = async (event, context) => {
	return await vk.router({ event, context, vk });
};
```

修改为

```js
'use strict';
// 注意：此为云函数路由入口文件，请勿修改此文件代码，你自己的云函数逻辑应写在service目录下
const vkCloud = require('vk-unicloud');                    // 引入 vk-unicloud
const vk = vkCloud.createInstance(require('./config.js')); // 通过 vkCloud.createInstance 创建 vk 实例
exports.main = async (event, context) => {
	return await vk.router({ event, context, vk });
};
```

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.20（2022-09-29）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.19（2022-09-29）
* 1、【修复】升级HBX后带来的部分兼容性问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.18（2022-09-26）
* 1、【优化】`vk.pubfn.getCurrentPage()` API 在最新版HBX上的兼容性。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.17（2022-09-22）
* 1、【重要】微信公众号万能API调用接口支持在阿里云空间执行（自动使用阿里云代理模式）[传送门 - 阿里云固定IP设置](https://uniapp.dcloud.net.cn/uniCloud/cf-functions.html#aliyun-eip)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.16（2022-09-18）
* 1、【修复】`vk.crypto.aes.encrypt`、`vk.crypto.aes.decrypt` 在非 `router` 目录结构的云函数中运行可能会报错的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.15（2022-09-17）
* 1、【修复】`vk.crypto.aes.encrypt`、`vk.crypto.aes.decrypt` 在非 `router` 目录结构的云函数中运行可能会报错的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.14（2022-09-16）
* 1、【修复】`vk.baseDao.getTableData` 的查询条件某个字段的值指定为null时，可能会报错的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.13（2022-09-12）
* 1、【修复】`vk.baseDao.getTableData` 内使用 `_.geoNear` 无效的问题。
* 2、【优化】前端使用 `vk.request` 请求时，若本地缓存中有 `uni_id_token`，则请求头会带上 `uni_id_token` 的值
* 3、【优化】`router` 函数 `url化后`，若没有直接传 `uni_id_token` 参数，则会尝试从请求头中获取 `uni_id_token` 
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.12（2022-09-12）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.11（2022-09-11）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.10（2022-09-11）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.9（2022-09-08）
* 1、【修复】`vk.baseDao.getTableData` 内使用 `_.geoNear` 无效的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.8（2022-09-05）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.7（2022-08-29）
* 1、【重要】新增 `监听token更新` API [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html?t=20220829#vk-onrefreshtoken-%E7%9B%91%E5%90%ACtoken%E6%9B%B4%E6%96%B0%E4%BA%8B%E4%BB%B6)
* 2、【优化】`云对象` 新增 `this.getUniCloudRequestId`（获取当前请求id）[传送门](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#this-getunicloudrequestid-%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E8%AF%B7%E6%B1%82id)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.6（2022-08-26）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.5（2022-08-25）
* 1、【优化】`vk.pubfn.getCommonTime` 更新文档 [传送门](https://vkdoc.fsq.pub/client/jsapi.html?t=20220825#vk-pubfn-getcommontime-%E8%8E%B7%E5%8F%96%E6%97%B6%E9%97%B4%E8%8C%83%E5%9B%B4)
* 2、【优化】其他细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.4（2022-08-23）
* 1、【修复】快手小程序自动跳登录页面的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.3（2022-08-22）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.2（2022-08-22）
* 1、【重要】前端 `微信登录` 、 `微信获取openid` 等接口不再返回 `sessionKey` 取而代之的是返回 `encryptedKey`（加密后的数据，云函数解密后可获得 `sessionKey`）
* 2、【重要】新增配置 `vk.crypto.aes` 用于返回给前端加密数据时的加密密钥

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/a4ca3d72-358e-4437-8766-d0b14e269697.png)

* 3、【新增】`vk.crypto.aes.encrypt` 用于加密数据
* 4、【新增】`vk.crypto.aes.decrypt` 用于解密数据

```js
// 加密数据
let encryptedKey = vk.crypto.aes.encrypt({
	data: {
		sessionKey: "XXXXX"
	}
});
console.log('encryptedKey: ', encryptedKey)

// 解密 sessionKey 示例
let decryptedRes = vk.crypto.aes.decrypt({
	data: encryptedKey, // 待解密的原文
});
console.log('decryptedRes: ', decryptedRes)
let sessionKey = decryptedRes.sessionKey;
console.log('sessionKey: ', sessionKey)
```

**特别注意**

* 1、本次更新需要替换 `router/service/user/pub/` 目录

* 2、如果你使用了 `使用微信小程序绑定的手机号一键登录` 的API，则请看此处调整代码 [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html?t=20220822#vk-usercenter-loginbyweixinphonenumber-%E9%80%9A%E8%BF%87%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%91%E5%AE%9A%E7%9A%84%E6%89%8B%E6%9C%BA%E5%8F%B7%E7%99%BB%E5%BD%95)

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.1（2022-08-22）
* 1、【重要】前端 `微信登录` 、 `微信获取openid` 等接口不再返回 `sessionKey` 取而代之的是返回 `encryptedKey`（加密后的数据，云函数解密后可获得 `sessionKey`）
* 2、【重要】新增配置 `vk.crypto.aes` 用于返回给前端加密数据时的加密密钥

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/a4ca3d72-358e-4437-8766-d0b14e269697.png)

* 3、【新增】`vk.crypto.aes.encrypt` 用于加密数据
* 4、【新增】`vk.crypto.aes.decrypt` 用于解密数据

```js
// 加密数据
let encryptedKey = vk.crypto.aes.encrypt({
	data: {
		sessionKey: "XXXXX"
	}
});
console.log('encryptedKey: ', encryptedKey)

// 解密 sessionKey 示例
let decryptedRes = vk.crypto.aes.decrypt({
	data: encryptedKey, // 待解密的原文
});
console.log('decryptedRes: ', decryptedRes)
let sessionKey = decryptedRes.sessionKey;
console.log('sessionKey: ', sessionKey)
```

**特别注意**

* 1、本次更新需要替换 `router/service/user/pub/` 目录

* 2、如果你使用了 `使用微信小程序绑定的手机号一键登录` 的API，则请看此处调整代码 [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html?t=20220822#vk-usercenter-loginbyweixinphonenumber-%E9%80%9A%E8%BF%87%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BB%91%E5%AE%9A%E7%9A%84%E6%89%8B%E6%9C%BA%E5%8F%B7%E7%99%BB%E5%BD%95)

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.11.0（2022-08-22）
* 1、【重要】前端 `微信登录` 、 `微信获取openid` 等接口不再返回 `sessionKey` 取而代之的是返回 `encryptedKey`（加密后的数据，云函数解密后可获得 `sessionKey`）
* 2、【重要】新增配置 `vk.crypto.aes` 用于返回给前端加密数据时的加密密钥
* 3、【新增】`vk.crypto.aes.encrypt` 用于加密数据
* 4、【新增】`vk.crypto.aes.decrypt` 用于解密数据
```js
// 加密数据
let encryptedKey = vk.crypto.aes.encrypt({
	data: {
		sessionKey: "XXXXX"
	}
});
console.log('encryptedKey: ', encryptedKey)

// 解密 sessionKey 示例
let decryptedRes = vk.crypto.aes.decrypt({
	data: encryptedKey, // 待解密的原文
});
console.log('decryptedRes: ', decryptedRes)
let sessionKey = decryptedRes.sessionKey;
console.log('sessionKey: ', sessionKey)
```
**特别注意**

本次更新需要替换 `router/service/user/pub/` 目录

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.15（2022-08-20）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.14（2022-08-20）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.13（2022-08-19）
* 1、【优化】发送短信验证码接口和组件新增参数 `checkUserExist` : 是否需要检测手机号对应的账号是否存在，默认false：不检测 设置为true：会检测，如果检测到用户不存在，则不发短信。（如通过手机号找回密码的业务，如果手机号都未注册，则没有必要发短信）（需要替换文件：`router/service/user/pub/sendSmsCode.js`）
* 2、【修复】数据库API，`_.geoNear` 部分情况下会失效的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.12（2022-08-15）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.11（2022-08-15）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.10（2022-08-13）
* 1、【调整】根据手机验证码重置账号密码的短信验证 `type` 从 `reset` 改为 `reset-pwd`（与unicloud官方对齐）
* 2、【调整】根据邮箱验证码重置账号密码的邮件验证 `type` 从 `reset` 改为 `reset-pwd`（与unicloud官方对齐）
* 3、【修复】vk.pubfn.test("aaahttps://www.baidu.com","url") 会返回 true 的bug
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.9（2022-07-30）
* 1、【优化】云对象 `this.getCloudInfo()` 内增加 `functionName`、`functionType` [传送门](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#this-getcloudinfo-%E8%8E%B7%E5%8F%96%E4%BA%91%E7%AB%AF%E4%BF%A1%E6%81%AF)
* 2、【优化】云对象 `this.getClientInfo()` 内增加 `source` [传送门](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#this-getclientinfo-%E8%8E%B7%E5%8F%96%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BF%A1%E6%81%AF)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.8（2022-07-28）
* 1、【新增】`uni-id` 配置 `removeDcloudAppid` 默认false，若设置true，则注册成功后，会自动删除 `dcloud_appid` 字段，以达到禁用隔离不同端用户的功能。（需配合中间件registerInitFilter）
* 2、【新增】`vk.openapi.weixin.urllink.generate` 云函数生成小程序url链接API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E8%8E%B7%E5%8F%96%E5%B0%8F%E7%A8%8B%E5%BA%8Furl%E9%93%BE%E6%8E%A5)
* 3、【新增】`vk.userCenter.getWeixinMPurl` 前端直接生成小程序url链接API [传送门](https://vkdoc.fsq.pub/client/vk.userCenter.html#vk-usercenter-getweixinmpurl-%E7%94%9F%E6%88%90%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8Furl%E9%93%BE%E6%8E%A5)
* 4、【优化】`vk.openapi.weixin.wxacode.getUnlimited` 和 `vk.openapi.weixin.urlscheme.generate` 支持参数 `env_version` [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E8%8E%B7%E5%8F%96%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%A0%81)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.7（2022-07-23）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.6（2022-07-22）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.5（2022-07-22）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.4（2022-07-21）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.3（2022-07-20）
* 1、【修复】`_.geoNear` 和 `lastWhereJson` 同时使用时报错的bug
* 2、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.2（2022-07-18）
* 1、`vk.pubfn.batchRun` 新增另外一种调用方式。[传送门](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-batchrun)
* 2、新增 `vk.uploadFile` 代替 `vk.callFunctionUtil.uploadFile`（保留旧写法） [传送门](https://vkdoc.fsq.pub/client/pages/uploadFile.html)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.1（2022-07-12）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.10.0（2022-07-09）
* 1、【优化】`vk.baseDao.update` `vk.baseDao.updateById` `vk.baseDao.updateAndReturn` API的 `dataJson` 参数若有 `_id`，则自动忽略 `_id`（因_id不可修改，原先是直接报错）
* 2、【优化】其他细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.12（2022-07-04）
* 1、【新增】微信小程序服务端万能API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%87%E8%83%BDapi%E8%B0%83%E7%94%A8%E6%8E%A5%E5%8F%A3)
* 2、【新增】微信公众号服务端万能API [传送门](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin-h5.html)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.11（2022-06-28）
* 1、【优化】`万能连表` 支持使用数组下标对应的值进行连表，如用户表根据inviter_uid的第一个值进行连表达到只查出第一个上级用户信息的效果 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html#%E5%9C%BA%E6%99%AF11)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.10（2022-06-25）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.9（2022-06-22）
* 1、【重要】新增安全规则：未标记 `isCloudObject:true` 的对象定义为私有对象（如 `service/user/util/login_log.js`），前端禁止访问（只能被云函数/云对象 `require` 方式调用）。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.8（2022-06-22）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.7（2022-06-22）
* 1、【新增】数据库表内的字段重命名api [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/question.html#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%94%B9%E5%AD%97%E6%AE%B5%E5%90%8D)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.6（2022-06-20）
* 1、【新增】云函数专用api `vk.pubfn.randomAsync`（异步）产生指定位数的不重复随机数（支持任意字符，s默认纯数字）[点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-randomasync)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.5（2022-06-17）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.4（2022-06-15）
* 1、【调整】`vk.getVuex` 当数据不存在时，返回值由 `undefined` 调整为 `空字符串`（undefined在部分平台会有问题）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.3（2022-06-11）
* 1、【重要】`uni-id` 新增配置参数 `"preferedWebPlatform": "h5",`，用于解决因HBX3.4.14版本导致的 `h5` 变为 `web` 带来的一系列问题。（完美兼容，你无需改自己的逻辑代码了）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.2（2022-06-10）
* 1、【调整】`vk.getVuex` 当数据不存在时，返回值由 `空字符串` 调整为 `undefined`
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.1（2022-06-08）
* 1、【优化】`云对象` 的内置api `this.getClientInfo` 可以获取到更多信息（uni.getSystemInfo返回的客户端信息）
* 2、【优化】`云函数` 的 `originalParam.context` 可以获取到更多信息（uni.getSystemInfo返回的客户端信息）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.9.0（2022-06-07）
* 1、【新增】`vk.callFunction` api [点击查看详情](https://vkdoc.fsq.pub/client/question/question.html#%E4%BA%91%E5%87%BD%E6%95%B0-%E4%BA%91%E5%AF%B9%E8%B1%A1-%E4%B8%AD%E5%A6%82%E4%BD%95%E8%B0%83%E7%94%A8%E5%8F%A6%E4%B8%80%E4%B8%AA%E4%BA%91%E5%87%BD%E6%95%B0-%E4%BA%91%E5%AF%B9%E8%B1%A1)
> * 1.1、支持在云对象中请求其他云对象内的函数。
> * 1.2、支持在云对象中请求云函数。
> * 1.3、支持在云函数内请求其他云函数。
> * 1.4、支持在云函数内请求云对象内的函数。
* 2、【优化】`pub` 类型的函数无需 `need_user_info:true`，也能从token中解析并获取到uid（无数据库请求，不影响性能）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.15（2022-06-02）
* 1、【优化】为了兼容DCloud推出的uniCloud响应体规范，请求后的返回值会自动加上errCode和errMsg，其中errCode=code，errMsg=msg
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.14（2022-06-02）
* 1、【优化】为了兼容DCloud推出的uniCloud响应体规范，请求后的返回值会自动加上errCode和errMsg，其中errCode=code，errMsg=msg
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.13（2022-05-30）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.12（2022-05-30）
* 1、【修复】`云对象` 模式下 `sys类型函数` 在非admin目录下时，请求会提示 `need_user_info` 的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.11（2022-05-28）
* 1、【修复】`interceptor.login` 前端自定义login拦截器，在某些情况下无法正常拦截的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.10（2022-05-27）
* 1、【修复】当 `云对象` 在 `service` 层根目录时，`pub.对象名.js` pub权限失效的问题。
* 2、【优化】其他一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.9（2022-05-26）
* 1、【新增】`vk.baseDao.selects` 和 `vk.baseDao.getTableData` 新增 `lastSortArr` 参数，用于聚合后再排序。
* 注意：`lastWhereJson` 和 `lastSortArr` 在数据量大的情况下是有性能问题的，（建议主表的where条件中先进行筛选，如只查本季度数据，只要主表过滤完后数据量不大，则没有性能问题。）
* 2、【修复】`lastWhereJson` 后，返回的 `total` 不准确的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.8（2022-05-25）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.7（2022-05-14）
* 1、【新增】`vk.pubfn.getFileType(url)` 根据文件url获取文件类型
* 2、【新增】`vk.pubfn.getFileSuffix(url)` 根据文件url获取文件后缀名
* 3、【新增】`vk.pubfn.checkFileSuffix(url,["png", "jpg", "jpeg", "gif", "bmp", "svg"])` 根据文件url判断是否满足指定后缀名中的任意1个
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.6（2022-05-13）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.5（2022-05-05）
* 1、【重要】vk实例对象已调整为页面内置对象，vk实例对象内的api在任意地方都可以直接通过vk.xxx()使用，不再需要 this.vk.xxx() 或 uni.vk.xxx() 的方式来调用。
* 2、【重要】vk实例对象已调整为云函数内置对象，vk实例对象内的api在任意地方都可以直接通过vk.xxx()使用，不再需要 this.vk.xxx() 或 uniCloud.vk.xxx() 的方式来调用。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.3（2022-04-28）
* 1、【新增】`vk.openapi.weixin.uniformMessage.send` 小程序转公众号消息模板接口 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E8%BD%AC%E5%85%AC%E4%BC%97%E5%8F%B7%E6%A8%A1%E6%9D%BF%E6%B6%88%E6%81%AF)
* 2、【新增】`vk.openapi.weixin.h5.templateMessage.send` 公众号消息模板接口 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/plus/weixin.html#%E5%8D%95%E7%8B%AC%E5%85%AC%E4%BC%97%E5%8F%B7%E6%A8%A1%E6%9D%BF%E6%B6%88%E6%81%AF)

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.2（2022-04-21）
* 1、【重要】`uni-id` 配置新增 `tokenMaxLimit` 每个账户的最大token数量，0为不限，淘汰策略：新的淘汰旧的（注意，即使设置为0，框架也会自动淘汰已过期的token）[点击查看](https://vkdoc.fsq.pub/client/uniCloud/config/uni-id.html)
* 2、【重要】微信登录支持多小程序：如果使用多小程序登录，则同一用户（同一个微信号）在不同小程序登录时，会分别创建不同的用户（除非小程序绑定在同一个开放平台下）
* 3、【新增】全局参数 `targetTimezone` 可设置默认时区（中国为8，8代表东8区，-8代表西8区）

> [查看前端全局配置](https://vkdoc.fsq.pub/client/pages/config.html) 

> [查看云函数全局配置](https://vkdoc.fsq.pub/client/uniCloud/config/vk-unicloud.html)

* 4、【新增】全局参数 `functionNameToUrl` 和 `isRequestDefault` [点击查看](https://vkdoc.fsq.pub/client/pages/callFunctionForUrl.html#%E6%B3%A8%E6%84%8F-%E4%BA%91%E5%87%BD%E6%95%B0url%E5%8C%96%E6%96%B9%E5%BC%8F%E8%B0%83%E7%94%A8%E9%9C%80%E8%A6%81%E9%85%8D%E7%BD%AE%E4%BD%A0%E7%9A%84%E4%BA%91%E5%87%BD%E6%95%B0url%E8%B7%AF%E5%BE%84%E5%9C%B0%E5%9D%80)
* 5、【优化】微信注册时支持新增自定义字段，如：nickname和avatar等。
* 6、【优化】当云函数全局配置文件出错时，优化报错提示。

**本次更新除了常规升级框架外，还需要下载最新版框架示例项目，从最新版中复制 以下文件 替换 你项目中的对应文件。**

* 1、`router/middleware/modules/returnUserInfoFilter.js` （此为用户登录注册全局中间件）
* 2、`router/service/user/pub/loginByWeixin.js` （此为微信登录云函数）

* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.1（2022-04-14）
* 1、【新增】前端请求多服务空间的极简方式（通过配置直接指定调用环境）[点击查看](https://vkdoc.fsq.pub/client/question/q9.html#%E6%96%B9%E5%BC%8F%E4%BA%8C)
* 2、【新增】`vk.userCenter.resetPasswordByEmail`（根据邮箱证码重置账号密码） [点击查看](https://vkdoc.fsq.pub/client/vk.userCenter.html#vk-usercenter-resetpasswordbyemail-%E6%A0%B9%E6%8D%AE%E9%82%AE%E7%AE%B1%E8%AF%81%E7%A0%81%E9%87%8D%E7%BD%AE%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.8.0（2022-04-01）
* 1、【重要】新增 `云对象` 路由模式 [什么是云对象？](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html)
* 2、【重要】自此，在VK框架中，可以做到云对象和云函数同时存在。即在VK框架中，同时支持 `云对象路由模式` 和 `云函数路由模式`。
* 3、【新增】本地运行支持云对象 [点击查看](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/cloudObject.html#%E6%9C%AC%E5%9C%B0%E8%BF%90%E8%A1%8C)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.7.6（2022-03-26）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.7.5（2022-03-22）
* 1、【新增】`vk.userCenter.bindNewMobile` 换绑新的手机号接口 [查看详情](https://vkdoc.fsq.pub/client/vk.userCenter.html#vk-usercenter-bindnewmobile-%E6%8D%A2%E7%BB%91%E6%89%8B%E6%9C%BA%E5%8F%B7)
* 2、【新增】`vk.userCenter.bindNewEmail` 换绑新的邮箱接口 [查看详情](https://vkdoc.fsq.pub/client/vk.userCenter.html#vk-usercenter-bindnewemail-%E6%8D%A2%E7%BB%91%E9%82%AE%E7%AE%B1)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.7.4（2022-03-21）
* 1、【优化】H5环境下，微信登录、微信绑定、微信解绑API，使之自动识别微信公众号环境（h5-weixin）的配置。
注意：微信公众号的 `uni-id` 配置属性是 `h5-weixin`，非 `h5`。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.7.3（2022-03-18）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.7.2（2022-03-14）
* 1、【修复】`vk.navigateTo` 以 ./ 开头时 如：vk.navigateTo("./order-list") 判断是否需要登录不准确的问题。
## 2.7.1（2022-03-14）
* 1、【优化】`app.config.js` 中的 `checkTokenPages` 检测页面是否需要登录支持 首页(启动页)的检测
* 2、【优化】其他细节

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.7.0（2022-02-26）
###【重要】由于uni官方限制自定义表不可以用 `opendb-` 和 `uni-` 开头，故以下数据库表名只能进行调整

* 1、`opendb-components-dynamic` 改为 `vk-components-dynamic`
* 2、`opendb-global-data` 改为 `vk-global-data`
* 3、`uni-id-files` 改为 `vk-files`
* 4、`uni-id-files-categories` 改为 `vk-files-categories`

___更改表名势必会对老项目产生影响。___

### 老项目更新注意事项：
* 1、老项目更新后，还需要从 `unicloud控制台` 把表名改成对应的新表名
* 2、在项目代码中全局搜索旧表名，替换成新表名

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.6.15（2022-02-24）
* 1、【优化】`万能连表` 支持副表外键是数组类型（只要数组内任意元素与主表外键匹配即可）[点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/selects.html#%E5%9C%BA%E6%99%AF6)
* 2、【优化】其他一些细节

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.6.14（2022-01-20）
* 1、【优化】一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.13（2022-01-14）
* 1、【优化】一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.12（2022-01-08）
* 【修复】`vk.openapi.weixin.security.imgSecCheck` 图片安全检测失效的问题
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.11（2021-12-24）
* 1、【修复】`vk.pubfn.string2Number` 会将空字符串转为0的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.10（2021-12-17）
* 1、【优化】一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.9（2021-12-16）
* 1、【修复】`vk.pubfn.priceFilter` 、`vk.pubfn.percentageFilter` 、`vk.pubfn.discountFilter` 部分情况下，默认值不生效的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.8（2021-12-14）
* 1、【优化】一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.7（2021-12-14）
* 1、【优化】一些细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.6（2021-12-10）
* 1、【修复】少数情况下，http请求可能获取不到数据的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.5（2021-12-07）
* 1、【修复】公众号登录可能会获取不到昵称和头像的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.4（2021-12-07）
* 1、【优化】上传api的url自动去除原文件名的中文部分。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.3（2021-11-29）
* 1、【新增】`vk.baseDao` 内api支持连接其他服务空间的数据库 [点击查看](https://vkdoc.fsq.pub/client/question/q9.html#%E4%BA%91%E5%87%BD%E6%95%B0%E7%AB%AF%E8%AF%B7%E6%B1%82%E5%A4%9A%E6%9C%8D%E5%8A%A1%E7%A9%BA%E9%97%B4%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.2（2021-11-26）
* 1、【新增】`await vk.pubfn.batchRun` 批量循环并发执行异步函数（云函数内专用, 使用场景: 批量发送短信、邮件、消息通知等。）[点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-batchrun)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.1（2021-11-26）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.6.0（2021-11-19）
* 1、【重要】移除了内置的 `npm` 方式安装的 `uView` 组件库，开发者可以选择自己喜欢的组件库进行开发。[点击查看](https://vkdoc.fsq.pub/client/quickstart.html#%E8%87%AA-client%E7%AB%AF%E6%A1%86%E6%9E%B6-2-6-0-%E8%B5%B7-%E4%B8%8D%E5%86%8D%E5%86%85%E7%BD%AE%E4%BB%BB%E4%BD%95-ui-%E6%A1%86%E6%9E%B6-%E4%BD%A0%E5%8F%AF%E4%BB%A5%E9%80%89%E6%8B%A9%E8%87%AA%E5%B7%B1%E5%96%9C%E6%AC%A2%E7%9A%84-ui-%E7%BB%84%E4%BB%B6%E5%BA%93%E8%BF%9B%E8%A1%8C%E5%BC%80%E5%8F%91%E3%80%82)
* 2、【重要】移除内置组件 `vk-u-goods-sku-popup`（推荐 `vk-data-goods-sku-popup` 代替）[点击查看](https://ext.dcloud.net.cn/plugin?id=2848)
* 3、【重要】移除内置组件 `vk-u-number-box`（推荐 `u-number-box` 代替）
* 4、【重要】移除内置组件 `vk-u-grid-button`
* 5、【重要】移除内置组件 `vk-u-swiper`
* 6、【重要】重构内置组件 `vk-u-verification-code` 并改名为 `vk-data-verification-code`
* 如想要继续使用这些组件，可以把这些组件复制到项目根目录的 `components` 目录（没有则新建）（目录名和组件名需一致，如 `vk-u-grid-button/vk-u-grid-button`）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.6（2021-11-13）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.5（2021-11-11）
* 1、【新增】`vk.pubfn.getOffsetTime` 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getoffsettime-%E8%8E%B7%E5%BE%97%E6%8C%87%E5%AE%9A%E6%97%B6%E9%97%B4%E5%81%8F%E7%A7%BB-year%E5%B9%B4-month%E6%9C%88-day%E5%A4%A9-hours%E6%97%B6-minutes%E5%88%86-seconds%E7%A7%92%E5%89%8D%E6%88%96%E5%90%8E%E7%9A%84%E6%97%B6%E9%97%B4%E6%88%B3)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.4（2021-11-10）
* 1、【优化】前端请求云函数的一处细节。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.3（2021-11-09）
* 1、【优化】`vk.pubfn.base64ToFile` 支持 APP 环境执行
* 2、【优化】`vk.pubfn.fileToBase64` 支持 APP 环境执行
* 3、【修复】`vk.baseDao.selects` 当 `localKey` 为 `a.b.c` 这样的形式时会报错的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.2（2021-11-03）
* 1、【修复】`vk.baseDao.adds` 无返回值的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.1（2021-11-02）
* 1、【新增】`vk.h5` 前端API接口（H5专用的一些接口，只有H5环境时，才有该对象，不会增大小程序的包体积）
* 2、【新增】`vk.h5.wx`（wx为公众号js_sdk接口) [微信小程序环境内js_sdk文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html) [微信公众号环境内js_sdk文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
* 3、【新增】`vk.navigateToHome` 跳转到首页 （app.config.js 的 index.url）
* 4、【新增】`vk.navigateToLogin` 跳转到登录页 （app.config.js 的 login.url）
* 5、【修复】`vk.callFunctionUtil.updateRequestGlobalParam` 全局公共请求参数的一处逻辑问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.5.0（2021-11-02）
* 1、【新增】`vk.h5` 前端API接口（H5专用的一些接口，只有H5环境时，才有该对象，不会增大小程序的包体积）
* 2、【新增】`vk.h5.wx`（wx为公众号js_sdk接口) [微信小程序环境内js_sdk文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html) [微信公众号环境内js_sdk文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
* 3、【新增】`vk.navigate.navigateToHome` 跳转到首页 
* 4、【新增】`vk.navigate.navigateToLogin` 跳转到登录页
* 5、【修复】`vk.callFunctionUtil.updateRequestGlobalParam` 全局公共请求参数的一处逻辑问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.12（2021-10-30）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.11（2021-10-28）
* 1、【优化】`vk.pubfn.hidden(str, first, last);` 的 `first` 和 `last` 默认为0 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-hidden-%E5%B0%86%E6%89%8B%E6%9C%BA%E5%8F%B7%E3%80%81%E8%B4%A6%E5%8F%B7%E7%AD%89%E9%9A%90%E8%97%8F%E4%B8%AD%E9%97%B4%E5%AD%97%E6%AE%B5)
* 2、【优化】其他一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.10（2021-10-26）
* 【优化】在 `template` 模板中使用 `vk.pubfn`（可以用简写法 `$fn` 代替 `vk.pubfn`）
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.9（2021-10-23）
* 【优化】`vk.userCenter` 接口细节，现在参数 `loading:true` 或 `loading:false` 均可以关闭 `loading提示框`
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.8（2021-10-16）
* 【优化】当配置文件编译错误时，增加对应的错误提示。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.7（2021-10-15）
* 【优化】当 `router/util/pubFunction.js` 内的代码出现编译错误时，控制台能打印编译错误信息。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.6（2021-10-07）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.4.5（2021-09-30）
* 1、【优化】`vk.pubfn.string2Number` 新增第二位参数option
```js
/**
 * 将能转成数字的字符串转数字（支持字符串、对象、数组）
 * @param {Any} obj
 * @param {Object} option 哪些格式需要排除
 * 默认排除
 * mobile:true 手机号，如 15200000001
 * idCard:true 身份证，如 330154202109301214
 * startFrom0:true 第一位是0，且长度大于1的，同时第二位不是.的字符串  如 01，057189101254
 */
vk.pubfn.string2Number(obj, option);
```

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.4.3（2021-09-30）
* 1、【优化】`vk.pubfn.string2Number` 新增第二位参数option，默认排除手机号、身份证、第一位是0，且长度大于1的字符串（可自由设置）

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.4.2（2021-09-30）
* 1、【新增】`vk.pubfn.string2Number` 将能转成数字的字符串值转Number类型（支持字符串、对象、数组）（深度遍历）
* 2、【优化】`vk.callFunctionUtil.updateRequestGlobalParam` 设置全局请求参数 `regExp` 参数支持数组（满足数组内任意正则即算匹配） [点击查看](https://vkdoc.fsq.pub/client/pages/updateRequestGlobalParam.html)


##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.4.1（2021-09-28）
* 1、【重要】支持微信公众号登录（有头像和昵称）详情见示例项目：`pages_template/openapi/h5-weixin/h5-weixin`
* 2、【优化】APP使用微信登录时，有头像和昵称 详情见示例项目：`pages_template/uni-id/weixin/weixin`

公众号配置文件在 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`

```js
"h5-weixin": {
  "oauth": {
    "weixin": {
      "appid": "微信公众号appid",
      "appsecret": "微信公众号appsecret"
    }
  }
},
```
##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.4.0（2021-09-28）
* 1、【重要】支持微信公众号登录（有头像和昵称）详情见示例项目：`pages_template/openapi/h5-weixin/h5-weixin`
* 2、【优化】APP使用微信登录时，有头像和昵称 详情见示例项目：`pages_template/uni-id/weixin/weixin`

公众号配置文件在 `uniCloud/cloudfunctions/common/uni-config-center/uni-id/config.json`

```js
"h5-weixin": {
  "oauth": {
    "weixin": {
      "appid": "微信公众号appid",
      "appsecret": "微信公众号appsecret"
    }
  }
},
```
##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.3.29（2021-09-27）
* 1、【新增】`vk.pubfn.snake2camelJson` 对象内的属性名 - 蛇形转驼峰 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-snake2cameljson-%E5%AF%B9%E8%B1%A1%E5%86%85%E7%9A%84%E5%B1%9E%E6%80%A7%E5%90%8D-%E8%9B%87%E5%BD%A2%E8%BD%AC%E9%A9%BC%E5%B3%B0)
* 2、【新增】`vk.pubfn.camel2snakeJson` 对象内的属性名 - 驼峰转蛇形 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-camel2snakejson-%E5%AF%B9%E8%B1%A1%E5%86%85%E7%9A%84%E5%B1%9E%E6%80%A7%E5%90%8D-%E9%A9%BC%E5%B3%B0%E8%BD%AC%E8%9B%87%E5%BD%A2)
* 3、【新增】`vk.pubfn.snake2camel` 字符串 - 蛇形转驼峰 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-snake2camel-%E5%AD%97%E7%AC%A6%E4%B8%B2-%E8%9B%87%E5%BD%A2%E8%BD%AC%E9%A9%BC%E5%B3%B0)
* 4、【新增】`vk.pubfn.camel2snake` 字符串 - 驼峰转蛇形 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-camel2snake-%E5%AD%97%E7%AC%A6%E4%B8%B2-%E9%A9%BC%E5%B3%B0%E8%BD%AC%E8%9B%87%E5%BD%A2)

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

##### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.3.28（2021-09-16）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.27（2021-09-14）
* 【优化】`vk.pubfn.dateDiff` 新增后缀参数 [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-datediff-%E5%B0%86%E6%97%B6%E9%97%B4%E6%98%BE%E7%A4%BA%E6%88%901%E7%A7%92%E5%89%8D%E3%80%811%E5%A4%A9%E5%89%8D)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.26（2021-09-14）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.25（2021-09-13）
* 1、【优化】文件上传逻辑
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.24（2021-09-08）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.23（2021-09-07）
* 1、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.22（2021-09-01）
* 1、【优化】文件上传逻辑
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.21（2021-08-31）
* 1、【新增】配置`vk.db.unicloud.getTableData.sortArr`，可以设置`vk.baseDao.getTableData`全局默认排序规则
* 2、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.20（2021-08-26）
* 1、【新增】`app.config.js` 新增参数 `globalErrorCode` 可以修改全局异常的提示信息 [点击查看](https://vkdoc.fsq.pub/client/pages/config.html)
* 2、【新增】`javascript代码块提示.json` 最近新增的api的代码提示 [点击查看](https://vkdoc.fsq.pub/client/codeTips.html)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.19（2021-08-26）
* 1、【新增】`app.config.js` 新增参数 `globalErrorCode` 可以修改全局异常的提示信息 [点击查看](https://vkdoc.fsq.pub/client/pages/config.html)
* 2、【新增】`javascript代码块提示.json` 最近新增的api的代码提示 [点击查看](https://vkdoc.fsq.pub/client/codeTips.html)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.18（2021-08-24）
* 1、【修复】腾讯云的图片上传无法回显图片的问题。
* 2、【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.17（2021-08-24）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.16（2021-08-24）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.15（2021-08-24）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.14（2021-08-23）
* 【修复】腾讯云的图片上传无法回显图片的问题。
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.13（2021-08-23）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.12（2021-08-23）
* 【优化】一些细节
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.11（2021-08-21）
* 【新增】`vk.pubfn.sleep` 进程等待（主要用于在云函数中需要故意等待几秒的情况）[点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-sleep-%E8%BF%9B%E7%A8%8B%E5%BC%BA%E5%88%B6%E7%AD%89%E5%BE%85-%E4%BC%91%E7%9C%A0)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.10（2021-08-21）
* 【优化】`vk.pubfn.timeFormat` 等API，当参数time为字符串时间戳时的特殊处理
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.9（2021-08-21）
* 【新增】`vk.pubfn.getDayOffsetStartAndEnd` 获得相对当前时间的偏移 count 天的起止日期(日的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getdayoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%A4%A9%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getMonthOffsetStartAndEnd` 获得相对当前时间的偏移 count 月的起止日期(月的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getmonthoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E6%9C%88%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getYearOffsetStartAndEnd`获得相对当前时间的偏移 count 年的起止日期(年的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getyearoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%B9%B4%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.8（2021-08-21）
* 【新增】`vk.pubfn.getDayOffsetStartAndEnd` 获得相对当前时间的偏移 count 天的起止日期(日的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getdayoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%A4%A9%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getMonthOffsetStartAndEnd` 获得相对当前时间的偏移 count 月的起止日期(月的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getmonthoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E6%9C%88%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getYearOffsetStartAndEnd`获得相对当前时间的偏移 count 年的起止日期(年的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getyearoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%B9%B4%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.7（2021-08-21）
* 【新增】`vk.pubfn.getDayOffsetStartAndEnd` 获得相对当前时间的偏移 count 天的起止日期(日的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getdayoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%A4%A9%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getMonthOffsetStartAndEnd` 获得相对当前时间的偏移 count 月的起止日期(月的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getmonthoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E6%9C%88%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 【新增】`vk.pubfn.getYearOffsetStartAndEnd`获得相对当前时间的偏移 count 年的起止日期(年的开始和结束) [点击查看](https://vkdoc.fsq.pub/client/jsapi.html#vk-pubfn-getyearoffsetstartandend-%E8%8E%B7%E5%BE%97%E7%9B%B8%E5%AF%B9%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4%E7%9A%84%E5%81%8F%E7%A7%BB-count-%E5%B9%B4%E7%9A%84%E8%B5%B7%E6%AD%A2%E6%97%A5%E6%9C%9F)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.6（2021-08-19）
* 【优化】`vk.baseDao.selects`新增参数`addFields` [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/question.html#%E5%88%86%E7%BB%84count)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.5（2021-08-19）
* 【优化】`vk.baseDao.selects`新增参数`addFields` [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/question.html#%E5%88%86%E7%BB%84count)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.4（2021-08-19）
* 【新增】`vk.baseDao.updateAndReturn` API [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/api.html#%E6%9B%B4%E6%96%B0%E5%B9%B6%E8%BF%94%E5%9B%9E%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.3（2021-08-19）
* 【新增】`vk.baseDao.updateAndReturn` API [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/api.html#%E6%9B%B4%E6%96%B0%E5%B9%B6%E8%BF%94%E5%9B%9E%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.2（2021-08-19）
* 【新增】`vk.baseDao.updateAndReturn` API [点击查看](https://vkdoc.fsq.pub/client/uniCloud/db/api.html#%E6%9B%B4%E6%96%B0%E5%B9%B6%E8%BF%94%E5%9B%9E%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84%E6%95%B0%E6%8D%AE-%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C)
* 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.1（2021-08-16）
####【重要】文档已搬家（gitee文档地址仅作为备用地址）[查看新版文档地址](https://vkdoc.fsq.pub/)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.3.0（2021-08-16）
####【重要】文档已搬家（gitee文档地址仅作为备用地址）[查看新版文档地址](https://vkdoc.fsq.pub/)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.13（2021-08-12）
#### 【优化】一些细节（为兼容Vue3做铺垫）
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.12（2021-08-11）
#### 【优化】一些细节（为兼容Vue3做铺垫）
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.11（2021-08-11）
#### 【优化】一些细节（为兼容Vue3做铺垫）
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.10（2021-08-06）
#### 【优化】一些细节
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.9（2021-08-06）
#### 【优化】一些细节
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.8（2021-08-05）
###  更新内容
#### 1、【修复】因`uni-id`配置隔离导致的微信`vk.openapi.weixin` API 兼容性问题。
#### 2、【新增】`vk.pubfn.isArray` 判断变量是否是数组类型
#### 3、【新增】`vk.pubfn.isObject` 判断变量是否是对象类型
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.2.7（2021-08-04）
###  更新内容
#### 【优化】一些细节
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.6（2021-07-28）
###  更新内容
#### 【新增】前端 `vk.callFunction` 支持请求其他服务空间的云函数
```js
const myCloud = uniCloud.init({
  provider: 'aliyun',
  spaceId: 'xxxx-yyy',
  clientSecret: 'xxxx'
});
vk.callFunction({
  url: 'template/db_api/pub/count',
  title:'请求中...',
  unicloud: myCloud,
  success(data) {
    console.log(data);
  }
});
```
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.2.4（2021-07-12）
###  更新内容
####【修复】已知问题
## 2.2.3（2021-07-12）
###  更新内容
####【修复】首次使用框架，上传部署后访问云函数可能会出现 `createInstance is undefined` 的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.2.2（2021-07-12）
###  更新内容
####【修复】连表查询时，因`lastWhereJson`而导致`getCount`错误的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.1（2021-07-12）
###  更新内容
####【修复】连表查询时，因`lastWhereJson`而导致`getCount`错误的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.2.0（2021-07-09）
###  更新内容
#### 1、【重要调整】删除了`config`公共模块，升级为`uni-config-center`模式 [点击查看升级教程](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4219337&doc_id=975983)
#### 1、【重要调整】删除了`config`公共模块，升级为`uni-config-center`模式 [点击查看升级教程](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4219337&doc_id=975983)
#### 1、【重要调整】删除了`config`公共模块，升级为`uni-config-center`模式 [点击查看升级教程](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4219337&doc_id=975983)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.14（2021-07-07）
###  更新内容
####【修复】已知bug
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.13（2021-07-05）
###  更新内容
####【修复】已知bug
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.12（2021-06-28）
###  更新内容
#### 1、【修复】`user/kh/getMenu`云函数获取菜单错误的bug。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.11（2021-06-22）
###  更新内容
#### 1、【优化】`vk.pubfn.timeFormat` 若参数不符合规则，则原值显示。
#### 2、【优化】`vk.pubfn.random` 新增第三个参数`arr` （产生的随机数不会和此数组的任意一项重复） [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3268613&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.10（2021-06-22）
###  更新内容
#### 1、【优化】`vk.pubfn.timeFormat` 若参数不符合规则，则原值显示。
#### 2、【优化】`vk.pubfn.random` 新增第三个参数`arr` （产生的随机数不会和此数组的任意一项重复） [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3268613&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.9（2021-06-16）
###  更新内容
####【修复】`vk.baseDao.add` 因hbx 3.1.18版本导致的本地运行时 `_add_time_str` 错误的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.8（2021-06-12）
###  更新内容
####【修复】`vk.pubfn.copyObject` 若参数值为undefined则会报异常的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.1.7（2021-06-10）
####【优化】`vk.callFunctionUtil.uploadFile` 自动识别文件类型，无需传`fileType`参数
####【修复】已知问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.1.6（2021-06-04）
###  更新内容
####【修复】`返回树状结构`时最后一级子节点没有继承主表`foreignDB`属性的bug。[查询返回树状结构文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3906510&doc_id=975983) 
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.1.5（2021-06-04）
###  更新内容
####【修复】`返回树状结构`时最后一级子节点没有继承主表`foreignDB`属性的bug。[查询返回树状结构文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3906510&doc_id=975983) 
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.1.4（2021-06-03）
###  更新内容
####【新增】`onActionIntercepted`（被中间件拦截时执行） 和 `onActionError`（云函数执行异常时执行） 类型中间件 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3035637&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.3（2021-06-03）
###  更新内容
####【新增】`onActionIntercepted`（被中间件拦截时执行） 和 `onActionError`（云函数执行异常时执行） 类型中间件 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3035637&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.2（2021-05-31）
###  更新内容
####【优化】过滤器 `timeFilter`、`dateDiff` 能正确识别10位数时间戳和13位时间戳。[点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3269404&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.1.1（2021-05-31）
###  更新内容
####【优化】`云函数URL化` 路由模式下，URL重写支持只允许部分云函数可被访问。（可以做到只暴露指定的API接口，增加URL化后的安全性）
#### `router/util/urlrewrite.js`文件配置内容如下 [点击URL重写规则](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3916806&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 2.0.11（2021-05-27）
###  更新内容
#### 【优化】`vk.baseDao.select` 也支持 `getOne` 、 `getMain` 
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.10（2021-05-27）
###  更新内容
#### 【修复】`vk.callFunctionUtil.uploadFile` 上传视频时后缀名可能会错误的问题。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.9（2021-05-26）
###  更新内容
#### 【优化】`vk.baseDao.selects` 中按距离查询的逻辑 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.8（2021-05-25）
###  更新内容
#### 【优化】`vk.baseDao.selects` 新增两个属性`getOne` 、 `getMain` [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4054561&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.7（2021-05-25）
###  更新内容
#### 【优化】`vk.baseDao.selects` 新增两个属性`getOne` 、 `getMain` [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4054561&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)


## 2.0.6（2021-05-25）
###  更新内容
#### 【优化】`vk.baseDao.selects` 新增两个属性`getOne` 、 `getMain` [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4054561&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)



## 2.0.5（2021-05-21）
###  更新内容
#### 【优化】`vk.baseDao.getTableData` 和 `vk.baseDao.selects` 连表查询逻辑。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.4（2021-05-21）
【调整】`vk.baseDao.getTableData` 默认排序规则调整为`_id`降序，之前是`_add_time`降序（因不是每个表都有`_add_time`字段）
## 2.0.3（2021-05-21）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
####【优化】`vk.baseDao` API的查询性能。

##### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。

## 2.0.2（2021-05-16）
###  更新内容
#### 【优化】修复验证码发送的已知bug
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.1（2021-05-15）
###  更新内容
#### 【优化】用户角色权限，支持admin使用 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4003879&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 2.0.0（2021-05-15）
###  更新内容
#### 【优化】用户角色权限，支持admin使用 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4003879&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.9.4（2021-05-10）
###  uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【优化】`vk.baseDao.selects` 支持分组查询，对应 `groupJson` 参数 [点击查看万能连表场景6](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
#### 2、【优化】`vk.globalDataCache.get` 支持如果缓存有值，则读取缓存，如果缓存无值，则执行函数，并将函数return的结果保存到缓存 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3442025&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.9.3（2021-04-23）
###  更新内容
###  uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
#### 1、【重要】【新增】 `pages-dev.json` 机制，写法与`pages.json` 相同，但里面的页面只有运行（开发）环境时才会被HBX打包，发行（正式）环境下不会被HBX打包进去。[点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3928718&doc_id=975983)
```js
可以将一些测试页面写在 `pages-dev.json`内，这些测试页面在正式发布时是不会被HBX打包到源码里的。
```
#### 2、【重要】【新增】阿里云和unicloud短信聚合API （阿里云短信的实现不依赖阿里云SDK核心库，无需`npm install @alicloud/pop-core`）[点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E4%B8%8A%E4%BC%A0%20%E4%BA%91%E5%82%A8%E5%AD%98%E6%88%96%E9%98%BF%E9%87%8C%E4%BA%91OSS?sort_id=3673784)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.9.2（2021-04-19）
###  更新内容
###  uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
#### 【优化】`vk.selects` 支持主表外键是数组的情况下（如`uni-id-users`表的`role`字段）连表查出`roleList` [点击查看场景5](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
#### 1、【重要】【全网首家】`云函数url化` 支持以纯链接形式访问路由后的云函数 如： `https://xxx.bspapp.com/http/router/client/user/pub/findGoodsInfo?id=1`
#### 2、【重要】【全网首家】`云函数url化` 支持URL重写 [点击查看URL重写详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3916806&doc_id=975983)
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.9.1（2021-04-16）
###  更新内容
#### 【优化】`vk.selects` 支持主表外键是数组的情况下（如`uni-id-users`表的`role`字段）连表查出`roleList` [点击查看场景5](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)

## 1.9.0（2021-04-15）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】`vk.selects` 支持返回树状结构 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3906510&doc_id=975983)
#### 2、【新增】`vk.pubfn.deepClone` 深度克隆（与`vk.pubfn.copyObject`的区别：可以克隆函数)
#### 3、【优化】`vk.setData` 内部逻辑
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.24（2021-04-13）
###  更新内容
#### 1、【调整】`vk.request`默认的`header`与官方对其（之前默认是`{"content-type": "application/json; charset=UTF-8"}`）
#### 2、【优化】`uni-id` 模式调整为：兼容单实例多并发模式
## 1.8.23（2021-04-12）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
####【优化】云函数中 `vk.request`新增参数`needOriginalRes` 默认为`false`，若为`true`，则会返回原始数据（包含请求头等数据）
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.22（2021-04-07）
###  更新内容
####【修复】`console.log`在小程序端可能会无法打印出代码所在位置的问题。
## 1.8.21（2021-04-07）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
###  1、【优化】如需要在云函数中主动抛出异常，且能让前端框架自动识别后进行alert弹窗提示，则可使用以下方式
```js
// 注意: 必须以msg:为前缀，否则框架无法识别（只支持字符串）
throw new Error("msg:这里是错误的提示");
```
#### 2、【新增】`app.config.js` 新增 `tokenExpiredAutoDelete` 属性，默认`true` 若设为`false`，则`token`失效时，依然保留前端的`token缓存`。
```
官方原生语法中，连表查询和非连表查询在使用`_.geoNear`时用较大差别；
而 vk.baseDao.selects（万能连表）写法跟 vk.baseDao.select（单表查询） 写法保持统一，使上手更简单。
```
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.20（2021-03-29）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
####【优化】`vk.baseDao.selects` 支持`_.geoNear`API（将记录按照离给定点从近到远输出。）[点击查看万能连表场景4](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
```
官方原生语法中，连表查询和非连表查询在使用`_.geoNear`时用较大差别；
而 vk.baseDao.selects（万能连表）写法跟 vk.baseDao.select（单表查询） 写法保持统一，使上手更简单。
```
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.19（2021-03-27）
###  更新内容
#### 1、【新增】`百度开放平台API接口` (营业执照识别、身份证识别等) [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3803034&doc_id=975983)
#### 2、【优化】`kh`目录下的函数默认会获取 `userInfo`（当前登录用户信息），如果此云函数不需要用户信息，可以在前端多传一个参数`need_user_info:false` 可以减少一次数据库查询（加快响应速度）(快100ms左右) [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3790840&doc_id=975983)
#### 3、【优化】`returnUserInfoFilter` 过滤器的内部逻辑
#### 4、【优化】`vk.callFunction` 新增参数 `needAlert`(默认为true) 来代替 `noAlert`（默认为false） 二选一即可（建议后面都使用`needAlert`参数，它更语义化)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.18（2021-03-24）
###  更新内容
#### 1、【重要】`uni_modules`版本 [点击查看升级指南](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3541759&doc_id=975983)
#### 2、【新增】`vk.pubfn.timeUtil.isLeapYear` 判断是否是闰年
#### 3、【新增】`vk.pubfn.timeUtil.isQingming` 判断是否是清明节
#### 4、【新增】清明节灰色页面实现方案 [点击查看](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3782115&doc_id=975983)
```js
/**
 * 判断是否是闰年
 * @param {Number | Date} year 需要计算的年份或时间,默认使用当前时间的年份
 */
vk.pubfn.timeUtil.isLeapYear(2021);
/**
 * 判断是否是清明节
 * @param {Object} date 时间对象 
 */
vk.pubfn.timeUtil.isQingming(new Date());
```
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)


## 1.8.17（2021-03-20）
###  更新内容
#### 【优化】`vk.userCenter.code2SessionWeixin` 的内部逻辑。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.16（2021-03-20）
###  更新内容
#### 1、【优化】`vk.callFunctionUtil.uploadFile` 新增参数 `suffix`，可直接自定义文件后缀名 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673784&doc_id=975983)

## 1.8.15（2021-03-19）
###  更新内容
#### 1、【修复】微信小程序服务端API在保存`token`时，缓存时间错误的问题。
#### 2、【修复】`vk.callFunctionUtil.uploadFile` 上传视频返回`.png`的问题 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673784&doc_id=975983)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.14（2021-03-19）
###  更新内容
#### 【新增】APP本机号码一键登录API `vk.userCenter.loginByUniverify`
## 1.8.13（2021-03-17）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【优化】在安装了`vuex`后，移除了名为`uni_id_user_info`的本地缓存（重复了）（`userInfo`使用`vk.getVuex('$user.userInfo')`获取）
#### 2、【修复】微信小程序服务端API在获取`token`时，没有正确使用缓存的问题。

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.12（2021-03-12）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】现在可以在js文件中直接通过 `uni.vk` 来使用 `vk` 对象内的API 
#### 2、【新增】`app.config.js` 新增参数 `checkSharePages` 控制页面是否可以被小程序分享
#### 3、【优化】发行模式下，`console.log` 将不会打印任何日志。
```js
若发行模式下需要强制打印，可用 `vk.log` 代替 `console.log`
```
## 1.8.11（2021-03-10）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【新增】`vk.callFunctionUtil.uploadFile` 支持前端直传至`阿里云oss` [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673784&doc_id=975983)
#### 2、【新增】`app.config.js` 新增 `myfn` 参数，可用来拓展自定义公共函数 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3673929&doc_id=975983)

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)

## 1.8.10（2021-03-06）
###  更新内容
#### 【优化】`vk.setVuex` 和 `vk.setData` 的赋值逻辑
```js
如数据源$data
{
	a:1,
	b:"1",
};
执行 vk.setVuex("$data.a.b.c",1); 
结果：
{
	a:{
		b:{
			c:1
		}
	},
	b:"1"
}
```
## 1.8.9（2021-03-05）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【新增】`vk.openapi.weixin.subscribeMessage.send` 微信小程序发送订阅消息 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3569379&doc_id=975983)
#### 2、【优化】`vk.baseDao.add` 和 `vk.baseDao.adds` 新增参数 `cancelAddTime` 为`true`,则不会有`_add_time`和`_add_time_str`字段生成
#### 3、【优化】`vk.baseDao.add` 和 `vk.baseDao.adds` 支持添加自定义 `_id`

#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.8（2021-03-04）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【重要】`vuex` 的使用方式有较大更新。(有性能提升)[点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3654596&doc_id=975983)

## 1.8.7（2021-02-24）
### 更新内容
#### 【修复】`vk.openapi.weixin.auth.code2Session` 会报`vk is not defined`的错误。

## 1.8.6（2021-02-24）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【修复】`vk.baseDao.deleteById` 会报`vk is not defined`的错误。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.5（2021-02-23）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【优化】`vk.baseDao.selects` 支持副表与副表的副表进行连表 [点击查看详情](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)
```
1.1、支持无限张副表和主表进行连接（横向无限张表）
1.2、支持副表与副表的副表进行连接（竖向无限层连接）
```



## 1.8.4（2021-02-16）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 微信小程序服务端API [点击查看文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3569379&doc_id=975983)
#### 1、【新增】`获取AccessToken` : `vk.openapi.weixin.auth.getAccessToken`
#### 2、【新增】`code换取openid` : `vk.openapi.weixin.auth.code2Session`
#### 3、【新增】`获取微信绑定的手机号` : `vk.openapi.weixin.decrypt.getPhoneNumber`
#### 4、【新增】`文本违规检测` : `vk.openapi.weixin.security.msgSecCheck`
#### 5、【新增】`图片违规检测` : `vk.openapi.weixin.security.imgSecCheck`
#### 6、【新增】`获取小程序码` : `vk.openapi.weixin.wxacode.getUnlimited`
#### 7、【新增】`小程序Scheme码` : `vk.openapi.weixin.urlscheme.generate`

## 1.8.3（2021-02-11）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
### 更新内容
#### 【优化】`main.js` 代码结构。
#### 完整框架项目地址：`https://ext.dcloud.net.cn/plugin?id=2204`[点击查看](https://ext.dcloud.net.cn/plugin?id=2204)
## 1.8.2（2021-02-08）
### 支持 `uni-pay` 模块
## 1.8.1（2021-02-08）
### 优化插件目录结构
完整框架项目地址：https://ext.dcloud.net.cn/plugin?id=2204
## 1.8.0（2021-02-07）
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】升级至`uni_modules`版本 [点击查看升级指南](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/1.8%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7%E8%87%B31.8%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97%20%E5%8D%87%E7%BA%A7%E6%88%90%20uni_modules%E7%89%88%E6%9C%AC?sort_id=3541759)
#### 2、【重要】本次更新文件有重大改动，升级成功后将变成`uni_modules`版本，下次更新框架只需要在hbx编译器中一键更新。
#### 3、【新增】【小程序API】`vk.userCenter.loginByWeixinPhoneNumber` 前端可以使用微信小程序一键进行手机号登录
#### 4、【新增】【小程序API】`vk.userCenter.getPhoneNumber` 前端一键获取微信小程序绑定的手机号
#### 5、【新增】【小程序API】`vk.openapi.weixin.decrypt.getPhoneNumber` 云函数解析微信小程序绑定的手机号
#### 6、【新增】【小程序API】`vk.userCenter.getWeixinMPqrcode` 前端一键生成带参数的小程序码
#### 7、【新增】【小程序API】`vk.userCenter.getWeixinMPscheme` 前端一键生成带参数的小程序scheme码（支持从手机短信跳转到小程序）
#### 8、【优化】`middleware/modules/returnUserInfoFilter` 中间件的处理逻辑。
#### 9、【优化】`javascript代码块提示.json` 输入`vk.`可以快速提示代码块 `根目录/使用帮助/代码快捷提示`

#### 如有疑问，请加群：22466457 关于插件的问题包教包会！
### 你也可以在评论区发布留言交流心得。
### uniCloud 云函数路由研究群:22466457 如有问题或建议可以在群内讨论。
###  更新内容
#### 1、【重要】升级至`uni_modules`版本 [点击查看升级指南](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/1.8%E4%BB%A5%E4%B8%8B%E7%89%88%E6%9C%AC%E5%8D%87%E7%BA%A7%E8%87%B31.8%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97%20%E5%8D%87%E7%BA%A7%E6%88%90%20uni_modules%E7%89%88%E6%9C%AC?sort_id=3541759)
#### 2、【重要】本次更新文件有重大改动，升级成功后将变成`uni_modules`版本，下次更新框架只需要在hbx编译器中一键更新。
#### 3、【新增】【小程序API】`vk.userCenter.loginByWeixinPhoneNumber` 前端可以使用微信小程序一键进行手机号登录
#### 4、【新增】【小程序API】`vk.userCenter.getPhoneNumber` 前端一键获取微信小程序绑定的手机号
#### 5、【新增】【小程序API】`vk.openapi.weixin.decrypt.getPhoneNumber` 云函数解析微信小程序绑定的手机号
#### 6、【新增】【小程序API】`vk.userCenter.getWeixinMPqrcode` 前端一键生成带参数的小程序码
#### 7、【新增】【小程序API】`vk.userCenter.getWeixinMPscheme` 前端一键生成带参数的小程序scheme码（支持从手机短信跳转到小程序）
#### 8、【优化】`middleware/modules/returnUserInfoFilter` 中间件的处理逻辑。
#### 9、【优化】`javascript代码块提示.json` 输入`vk.`可以快速提示代码块 `根目录/使用帮助/代码快捷提示`

#### 如有疑问，请加群：22466457 关于插件的问题包教包会！
### 你也可以在评论区发布留言交流心得。