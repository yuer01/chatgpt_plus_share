'use strict';
// 注意：此为云函数路由入口文件，请勿修改此文件代码，你自己的云函数逻辑应写在service目录下
const vkCloud = require('vk-unicloud');                    // 引入 vk-unicloud
const vk = vkCloud.createInstance(require('./config.js')); // 通过 vkCloud.createInstance 创建 vk 实例
exports.main = async (event, context) => {
	return await vk.router({ event, context, vk });
};
