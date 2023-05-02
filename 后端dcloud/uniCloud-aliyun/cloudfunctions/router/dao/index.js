// 加载模块 - 数据库dao层 API 请勿改动此文件-----------------------------------
const modulesPath = __dirname + "/modules";
const fs = require('fs');
const fileList = fs.readdirSync(modulesPath);
const moduleObj = {};
const modulesNames = [];
fileList.map((file, index) => {
	if (file.indexOf("Dao.js") > -1) {
		modulesNames.push(file.substring(0, file.length - 3));
	}
});
modulesNames.map((modulesName, index) => {
	try {
		moduleObj[modulesName] = require(modulesPath + "/" + modulesName);
	} catch (err) {
		console.error(`【异常】加载【${modulesName}】异常，请检查！↓↓↓请查看下方的错误提示↓↓↓`);
		console.error(err);
		console.error(`【异常】加载【${modulesName}】异常，请检查！↑↑↑请查看上方的错误提示↑↑↑`);
	}
});
moduleObj.init = function(obj) {
	modulesNames.map((modulesName, index) => {
		if (typeof moduleObj[modulesName] === "object" && typeof moduleObj[modulesName].init === "function") {
			moduleObj[modulesName].init(obj);
		}
	});
}
module.exports = moduleObj;
// 加载模块 - 数据库dao层 API 请勿改动此文件-----------------------------------
