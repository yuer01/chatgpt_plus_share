const debug =  process.env.NODE_ENV !== 'production';
var devPages;
try {
	// 只在开发环境中才会被HBX打包的页面
	devPages = require('./pages-dev.json');
} catch (err) {}
module.exports = function(pagesJson){
	try {
		let newDevPages = JSON.parse(JSON.stringify(devPages));
		if(debug && newDevPages){
			for(let keyName in newDevPages){
				let item = newDevPages[keyName]
				if (Object.prototype.toString.call(item) === "[object Array]") {
					pagesJson[keyName].push(...item);
				}else if(Object.prototype.toString.call(item)==='[object Object]'){
					pagesJson[keyName] = Object.assign(pagesJson[keyName], item);
				}
			}
		}
	} catch (err) {
		console.log(err);
	}
	return pagesJson;
}
