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
				action: "admin/system_uni/admin-log/sys/getList",
				// 表格字段显示规则
				columns: [
					{ key: "user_id", title: "操作者用户ID", type: "text", width: 120 },
					{ key: "user_name", title: "操作者用户昵称", type: "text", width: 120 },
					{ key: "title", title: "标题", type: "text", width: 140 },
					{ key: "url", title: "url", type: "text", width: 280 },
					{ key: "_add_time", title: "添加时间", type: "time", width: 140 },
					{ key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
					{ key: "request_param", title: "请求参数", type: "json", width: 300 },
					{ key: "response", title: "返回参数", type: "json", width: 300 },
					{ key: "ip", title: "ip地址", type: "text", width: 140 },
					{ key: "request_id", title: "请求id", type: "text", width: 280 }
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
				formData: {},
				// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
				columns: [
					{ key: "user_id", title: "用户ID", type: "text", mode: "=" },
					{ key: "title", title: "标题", type: "text", mode: "%%" },
					{ key: "ip", title: "ip地址", type: "text", mode: "%%" },
					{ key: "_add_time", title: "添加时间", type: "datetimerange", width: 400, mode: "[]" }
				]
			}
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
		init(options) {},
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
