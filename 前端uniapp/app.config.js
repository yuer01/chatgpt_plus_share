// 引入自定义公共函数
import myPubFunction from '@/common/function/myPubFunction.js'
// 引入静态菜单
import staticMenu from '@/app.config.menu.js'
// 引入主题配置文件
import themeConfig from '@/common/theme/index.js'
export default {
	// 开发模式启用调式模式(请求时会打印日志)
	debug: process.env.NODE_ENV !== "production",
	// 主云函数名称
	functionName: "router",
	// 登录页面路径
	login: {
		url: "/pages/login/index"
	},
	// 首页页面路径
	index: {
		url: '/pages/index/index'
	},
	// 404 Not Found 错误页面路径
	error: {
		url: "/pages_plugs/error/404"
	},
	// 前端默认时区（中国为8）
	targetTimezone:8, 
	globalError: true, // 是否开启全局错误提示
	// 需要检查是否登录的页面列表
	// let { mode, list } = config.checkTokenPages
	checkTokenPages: {
		/**
		 * 如果 mode = 0 则代表自动检测
		 * 如果 mode = 1 则代表list内的页面需要登录，不在list内的页面不需要登录
		 * 如果 mode = 2 则代表list内的页面不需要登录，不在list内的页面需要登录
		 * 注意1: list内是通配符表达式，非正则表达式
		 * 在无需登录的页面上执行kh或sys函数，也会自动判断是否登录，未登录会自动跳登录页面，登录成功后会自动返回本来要跳转的页面。
		 */
		mode: 2,
		list: [
			"/pages/h5/*",
			"/pages/login/*",
			"/pages_template/*",
		]
	},
	// 静态文件的资源URL地址
	staticUrl: {
		// 顶部导航
		navBar: {
			// 正方形 Logo 160*160
			logo: "/static/logo.png",
			// 长方形 Logo 224*160
			logo1: "/static/logo1.png",
			// 横幅 Logo 480*100
			logo2: "/static/logo2.png"
		},
	},
	// 自定义公共函数，myPubFunction内的函数可通过vk.myfn.xxx() 调用
	myfn: myPubFunction,
	// 第三方服务配置
	service: {
		// 阿里云oss配置
		aliyunOSS: {
			// 密钥和签名信息 (由于签名的获取比较麻烦,建议初学者使用上传到unicloud的方案,上传到阿里云OSS是给有特殊需求的用户使用)
			// 相关文档 : https://help.aliyun.com/document_detail/31925.html?spm=a2c4g.11186623.6.1757.b7987d9czoFCVu
			uploadData: {
				OSSAccessKeyId: "",
				policy: "",
				signature: "",
			},
			// oss上传地址
			action: "",
			// 根目录名称
			dirname: "",
			// oss外网访问地址，也可以是阿里云cdn地址
			host: "",
			// 上传时,是否按用户id进行分组储存
			groupUserId: true,
			// vk.callFunctionUtil.uploadFile 是否默认上传到阿里云OSS
			isDefault: false
		}
	},
	// 全局异常码，可以自定义提示结果
	globalErrorCode: {
	  // 阿里云10秒非正常超时，其实请求还在执行（且一般已经成功了，但前端接受不到成功结果）
	  "cloudfunction-unusual-timeout": "请求超时，但请求还在执行，请重新进入页面。",
	  // 请求超时（真正的请求超时）
	  "cloudfunction-timeout": "请求超时，请重试！",
	  // 不在预期内的异常（如数据库异常、云函数编译异常等）
	  "cloudfunction-system-error": "网络开小差了！"
	},
	// 页面风格
	pageStyle: {
		// 表单组件和表格组件的size
		size: "auto", // medium / small / mini / auto
	},
	// 左侧菜单
	sideBar: {
		// 配置静态菜单列表
		"staticMenu": staticMenu
	},
	// 主题配置
	theme: {
		// 当前使用哪个主题
		use: "blackWhite", // white blackWhite black custom
		...themeConfig,
		// 自定义主题
		custom: {
			// 左侧菜单样式
			leftMenu: {
				backgroundColor: "",
				subBackgroundColor: "",
				textColor: "",
				activeTextColor: "",
				activeBackgroundColor: "",
				collapseActiveTextColor:"", 
				collapseActiveBackgroundColor: "",
				hoverTextColor: "",
				hoverBackgroundColor: "",
				boxShadow: "",
				borderTop: ""
			},
			// 顶部菜单样式
			topMenu: {
				backgroundColor: "",
				textColor: "",
			}
		}
	}
}
