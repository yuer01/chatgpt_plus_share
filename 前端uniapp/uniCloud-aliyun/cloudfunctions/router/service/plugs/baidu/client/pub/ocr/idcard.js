'use strict';
module.exports = {
  /**
   * 身份证识别
   * @url plugs/baidu/client/pub/ocr/idcard 前端调用的url参数地址
   * data 请求参数 说明
   * @param {String} image 图像数据，base64编码后进行urlencode，要求base64编码和urlencode后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/jpeg/png/bmp格式
   * @param {String} url 图片完整URL，URL长度不超过1024字节，URL对应的图片base64编码后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/jpeg/png/bmp格式，当image字段存在时url字段失效请注意关闭URL防盗链
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		let { image, url } = data;
		res = await vk.openapi.baidu.open.request({
			action:"ocr/v1/idcard",
			actionVersion: "2.0",
			data:{
			 image,
			 url
			}
		});
		return res;
  }
}