<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<!-- 表格搜索组件开始 -->

		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			@search="search"
		>
			<template slot="right-btns">
				<el-button type="success" icon="el-icon-circle-plus-outline" @click="addBtn">
					添加
				</el-button>
			</template>
		</vk-data-table-query>
		<!-- 表格搜索组件结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto', 'update', 'delete']"
			:row-no="true"
			:pagination="true"
			@update="updateBtn"
			@delete="deleteBtn"
			@current-change="currentChange"
			@selection-change="selectionChange"
		></vk-data-table>
		<!-- 表格组件结束 -->

		<!-- 添加或编辑的弹窗开始 -->
		<vk-data-dialog
			v-model="form1.props.show"
			:title="form1.props.title"
			width="800px"
			mode="form"
		>
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				label-width="80px"
				@success="form1.props.show = false;refresh();"
			></vk-data-form>
		</vk-data-dialog>
		<!-- 添加或编辑的弹窗结束 -->
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
var that;													// 当前页面对象
var vk = uni.vk;									// vk实例
var originalForms = {}; 					// 表单初始化数据

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
				action: "admin/system_uni/global-data/sys/getList",
				// 表格字段显示规则
				columns: [
					{ key: "key", title: "键名", type: "text", width: 200 },
					{ key: "value", title: "键值", type: "json", width: 200 },
					{ key: "_add_time", title: "添加时间", type: "time", width: 160 },
					{ key: "_add_time", title: "距离现在", type: "dateDiff", width: 120 },
					{ key: "expired_at", title: "过期时间", type: "time", width: 160, defaultValue: "无" },
					{ key: "comment", title: "备注", type: "text", width: 300 }
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
					{ key: "key", type: "text", title: "键名搜索", mode: "%%" },
					{ key: "value", type: "text", title: "键值搜索", mode: "%%" },
					{ key: "_add_time", type: "datetimerange", title: "添加时间", width: 400, mode: "[]" }
				]
			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {

				},
				// 表单属性
				props: {
					// 表单请求地址
					action: "",
					// 表单字段显示规则
					columns: [
						{ key: "key", title: "健名", type: "text", placeholder: "请输入健名" },
						{ key: "value", title: "健值", type: "json", placeholder: "请输入健值" },
						{ key: "comment", title: "备注", type: "textarea", placeholder: "请输入备注" }
					],
					// 表单验证规则
					rules: {
						key: [{ required: true, message: "健名不能为空", trigger: "blur" }],
						value: [{ required: true, message: "健值不能为空", trigger: "change" }]
					},
					// add 代表添加 update 代表修改
					formType: "",
					// 是否显示表单的弹窗
					show: false
				}
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
			originalForms["form1"] = vk.pubfn.copyObject(that.form1);
		},
		// 页面跳转
		pageTo(path) {
			vk.navigateTo(path);
		},
		// 表单重置
		resetForm() {
			vk.pubfn.resetForm(originalForms, that);
		},
		// 搜索
		search(obj) {
			that.$refs.table1.query(obj);
		},
		// 刷新
		refresh() {
			that.$refs.table1.refresh();
		},
		// 获取当前选中的行的数据
		getCurrentRow() {
			return that.$refs.table1.getCurrentRow();
		},
		// 监听 - 行的选中高亮事件
		currentChange(val) {
			that.table1.selectItem = val;
		},
		// 当选择项发生变化时会触发该事件
		selectionChange(list) {
			that.table1.multipleSelection = list;
		},
		// 显示添加页面
		addBtn() {
			that.resetForm();
			that.form1.props.action = "admin/system_uni/global-data/sys/add";
			that.form1.props.formType = "add";
			that.form1.props.title = "添加";
			that.form1.props.show = true;
		},
		// 显示修改页面
		updateBtn({ item }) {
			that.form1.props.action = "admin/system_uni/global-data/sys/update";
			that.form1.props.formType = "update";
			that.form1.props.title = "编辑";
			that.form1.props.show = true;
			that.form1.data = item;
		},
		// 删除按钮
		deleteBtn({ item, deleteFn }) {
			deleteFn({
				action: "admin/system_uni/global-data/sys/delete",
				data: {
					_id: item._id
				}
			});
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
