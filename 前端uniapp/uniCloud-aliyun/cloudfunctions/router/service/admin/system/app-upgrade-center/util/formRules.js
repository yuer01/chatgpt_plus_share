'use strict';
/**
 * 表单验证
 */
class Util {
	constructor() {

	}
	/**
	 * 添加
	 */
	async add(event) {
		let { data = {}, userInfo, util } = event;
		let { vk } = util;
		let res = { code: 0, msg: '' };
		// 验证规则开始 -----------------------------------------------------------
		let rules = {
			appid: [
				// 必填
				{ required: true, message: "appid不能为空", trigger: ['blur','change'] }
			],
			contents: [
				// 必填
				{ required: true, message: "更新内容不能为空", trigger: ['blur','change'] }
			],
			platform: [
				// 必填
				{ required: true, message: "平台不能为空", trigger: ['blur','change'] }
			],
			version: [
				// 必填
				{ required: true, message: "版本号不能为空", trigger: ['blur','change'] },
				{ validator: vk.pubfn.validator("version"),  message: '版本号格式必须为：xx.xx.xx（3个数字组成，数字范围1-99,0-99,0-99） 如1.0.1 不可以是1.0.01', trigger: 'blur' }
			],
			url: [
				// 必填
				{ required: true, message: "链接不能为空", trigger: ['blur','change'] }
			],
		};
		// 验证规则结束 -----------------------------------------------------------

		// 开始进行验证
		res = vk.pubfn.formValidate({
			data: data,
			rules: rules
		});
		// 返回验证结果
		return res;
	}
	/**
	 * 修改
	 */
	async update(event) {
		let { data = {}, userInfo, util } = event;
		let { vk } = util;
		let res = { code: 0, msg: '' };

		// 验证规则开始 -----------------------------------------------------------
		let rules = {
			_id: [
				{ required: true, message: 'id不能为空', trigger: 'blur' },
			],
			contents: [
				// 必填
				{ required: true, message: "更新内容不能为空", trigger: ['blur','change'] }
			],
			url: [
				// 必填
				{ required: true, message: "链接不能为空", trigger: ['blur','change'] }
			],
		};
		// 验证规则结束 -----------------------------------------------------------

		// 开始进行验证
		res = vk.pubfn.formValidate({
			data: data,
			rules: rules
		});
		// 返回验证结果
		return res;
	}
}
module.exports = new Util
