// #ifdef H5
/**
 * H5专用的一些函数，会涉及到window等H5专用的内置对象。
 */
var h5 = {};

// 引入 微信公众号 js_sdk 包
import wx from './weixin-js-sdk'
h5.wx = wx;

/**
 * 获取当前H5所在的环境
 * let env = vk.h5.getEnv();
 */
h5.getEnv = function() {
	let ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger' && (ua.match(/miniprogram/i) == 'miniprogram')) {
		// 微信小程序
		return "mp-weixin";
	}
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		// 微信公众号
		return "h5-weixin";
	}
	if (ua.match(/alipay/i) == 'alipay' && ua.match(/miniprogram/i) == 'miniprogram') {
		return "mp-alipay";
	}
	if (ua.match(/alipay/i) == 'alipay') {
		return "h5-alipay";
	}
	// 外部 H5
	return "h5";
};

/**
 * 获取当前项目根目录访问地址
 * https://www.aaa.com/pages/index/index?a=1&b=1
 * http://192.168.66.66:8080/pages/index/index?a=1&b=1
 * 获取当前H5的url地址的https://www.aaa.com 部分
 * let getRootPath = vk.h5.getRootPath();
 * let getRootPath = vk.h5.getRootPath({ projectName:true });
 */
h5.getRootPath = function(obj={}) {
	let {
		projectName: _projectName = false
	} = obj;
	let wwwPath = window.location.href;
	let pathName = window.location.pathname;
	let pos = wwwPath.indexOf(pathName);
	let localhostPaht = wwwPath.substring(0, pos);
	let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	let rootPath = localhostPaht;
	if (_projectName) {
		rootPath = localhostPaht + projectName;
	}
	return rootPath;
};

export default h5;
// #endif
