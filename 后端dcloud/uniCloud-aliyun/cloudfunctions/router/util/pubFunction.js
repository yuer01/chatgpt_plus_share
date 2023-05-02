/**
 * 自定义公共函数包
 * 这里可以写你自己的公共函数
 */
var pubFun = {};
/**
 * 公共函数写法示例
 * 调用示例：
 * pubFun.test();
 * 或
 * vk.myfn.test();
 */
pubFun.test = function(path) {
	 // 可通过 uniCloud.vk 来获取vk实例
	let vk = uniCloud.vk;
	// 逻辑
	// ...
	// 逻辑	
	return "这是公共函数test的返回";
}


module.exports = pubFun;
