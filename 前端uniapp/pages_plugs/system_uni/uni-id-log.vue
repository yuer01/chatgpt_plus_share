<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<!-- 表格搜索组件开始 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			@search="search"
		></vk-data-table-query>
		<!-- 表格搜索组件结束 -->
		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto']"
			:row-no="true"
			:pagination="true"
		></vk-data-table>
		<!-- 表格组件结束 -->
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
var that; // 当前页面对象
var vk = uni.vk; // vk实例
var dcloudAppidData = [];

export default {
	data() {
		// 页面数据变量
		return {
			// 页面是否请求中或加载中
			loading: false,
			// init请求返回的数据
			data: {},
			// 表格相关开始 -----------------------------------------------------------
			table1: {
				// 表格数据请求地址
				action: "admin/system_uni/uni-id-log/sys/getList",
				// 表格字段显示规则
				columns: [
					{ key:"appList", title:"登录的应用", type:"html", width:220,
						formatter: function(val, row, column, index) {
							if(typeof row.dcloud_appid === "undefined") return "全部应用";
							if(row.dcloud_appid.length === 0) return "未绑定任何应用";
							if(val.length === 0 && row.dcloud_appid.length > 0) return row.dcloud_appid;
							let str = "";
							val.map((item, index) => {
								str += `、${item.name}`;
							});
							if(str) str = str.substring(1);
							return str;
						}
					},
					{ key: "userInfo", title: "用户信息", type: "userInfo", width: 150 },
					{ key: "ip", title: "ip地址", type: "text", width: 150 },
					{ key: "type", title: "日志类型", type: "text", width: 120 },
					{ key: "login_type", title: "登录类型", type: "select", width: 120,
						data:[
							{ value: "phone", label:"手机短信" },
							{ value: "password", label:"账号密码" },
							{ value: "weixin", label:"微信登录" },
							{ value: "alipay", label:"支付宝登录" },
							{ value: "weixinPhoneNumber", label:"微信手机号" },
							{ value: "token", label:"token" }
						]
					},
					{ key: "os", title: "操作系统", type: "text", width: 120 },
					{ key: "platform", title: "平台信息", type: "text", width: 120 },
					{ key: "device_id", title: "设备唯一标识", type: "text", width: 120 },
					{ key: "_add_time", title: "添加时间", type: "time", width: 160 },
					{ key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
					{ key: "ua", title: "userAgent", type: "text", width: 400 },
					{ key: "user_id", title: "用户ID", type: "text", width: 220 },
				],
				// 多选框选中的值
				multipleSelection: [],
				// 当前高亮的记录
				selectItem: ""
			},
			// 表格相关结束 -----------------------------------------------------------
			// 表单相关开始 -----------------------------------------------------------
			// 查询表单请求数据
			queryForm1: {
				// 查询表单数据源，可在此设置默认值
				formData: {
					dcloud_appid:""
				},
				// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
				columns: [
					{ key:"dcloud_appid", title:"所属应用", type:"select", width:160, mode:"custom",
						data:[],
						props:{ value:"appid", label:"name" }
					},
					{ key: "user_id", title: "用户ID", type: "text", width:140, mode: "=" },
					{ key: "ip", title: "ip地址", type: "text", width:140,  mode: "%%" },
					{ key: "device_id", title: "设备唯一标识", type: "text", width:180, mode: "%%" },
					{ key: "_add_time", title: "添加时间", type: "datetimerange", width: 380, mode: "[]" }
				]
			},
			// 表单相关结束 -----------------------------------------------------------
		};
	},
	// 监听 - 页面每次【加载时】执行(如：前进)
	onLoad(options = {}) {
		that = this;
		vk = that.vk;
		that.options = options;
		that.init(options);
	},
	// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
	onReady() {},
	// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
	onShow() {},
	// 监听 - 页面每次【隐藏时】执行(如：返回)
	onHide() {},
	// 函数
	methods: {
		// 页面数据初始化函数
		init(options) {
			that.getAppList();
		},
		// 获取应用列表
		getAppList(obj){
			// 请在store/modules/$app.js文件里增加代码 appList: lifeData.$app.appList || []
			vk.callFunction({
				url: 'admin/system/app/sys/getList',
				data:{},
				success:function(data){
					dcloudAppidData = data.rows;
					let dcloudAppidData2 = vk.pubfn.copyObject(data.rows);
					dcloudAppidData2.unshift({
						appid:"___error___",
						name:"不存在的应用"
					});
					dcloudAppidData2.unshift({
						appid:"___empty-array___",
						name:"未绑定应用"
					});
					dcloudAppidData2.unshift({
						appid:"___non-existent___",
						name:"全部应用"
					});
					let index2 = vk.pubfn.getListIndex(that.queryForm1.columns, "key", "dcloud_appid");
					that.queryForm1.columns[index2].data = dcloudAppidData2;
					let appids = [];
					dcloudAppidData.map((item, index) => {
						appids.push(item.appid);
					});
					that.queryForm1.formData.appids = appids;
				}
			});
		},
		// 搜索
		search(obj) {
			that.$refs.table1.query(obj);
		},
		// 刷新
		refresh() {
			that.$refs.table1.refresh();
		}
	},
	watch: {

	},
	// 过滤器
	filters: {

	},
	// 计算属性
	computed: {

	}
};
</script>
<style lang="scss" scoped>

</style>
