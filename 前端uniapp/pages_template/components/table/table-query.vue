<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<!-- 表格搜索组件开始 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			:main-columns="['user_id','_add_time']"
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
			:selection="true"
			:row-no="true"
			:pagination="true"
			@current-change="currentChange"
			@selection-change="selectionChange"
		></vk-data-table>
		<!-- 表格组件结束 -->

		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {};						// 表单初始化数据

	export default {
		data() {
			// 页面数据变量
			return {
				// 页面是否请求中或加载中
				loading:false,
				// init请求返回的数据
				data:{

				},
				// 表格相关开始 -----------------------------------------------------------
				table1:{
					// 表格数据请求地址
					action:"template/db_api/sys/getList",
					// 表格字段显示规则
					columns:[
						{ key:"_id", title:"id", type:"text", width:220 },
            { key:"user_id", title:"用户ID", type:"text", width:80, sortable:"custom" },
						{ key:"money", title:"金额", type:"money", width:80, sortable:"custom" },
						{ key:"remark", title:"备注", type:"text", width:80 },
						{ key:"_add_time", title:"添加时间", type:"time", width:160, sortable:"custom"  },
						{ key:"_add_time", title:"距离现在", type:"dateDiff", width:120 },
					],
					// 多选框选中的值
					multipleSelection:[],
					// 当前高亮的记录
					selectItem:""
				},
				// 表格相关结束 -----------------------------------------------------------
				// 表单相关开始 -----------------------------------------------------------
				// 查询表单请求数据
				queryForm1:{
					// 查询表单数据源，可在此设置默认值
					formData:{

					},
					// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
					columns:[
            {
              key:"user_id", title:"选择用户", type:"remote-select", placeholder:"请输入用户账号/昵称",
              action:"admin/select/kh/user",
            },
						{ key:"money_1", type:"money", title:"最小金额", width:160, placeholder:"请输入最小金额",
							mode:">=", fieldName:"money"
						},
						{ key:"money_2", type:"money", title:"最大金额", width:160, placeholder:"请输入最大金额",
						 mode:"<=" , fieldName:"money"
						},
						{ key:"remark", title:"备注", type:"text", width:160, mode:"%%" },
						{ key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
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
				originalForms["form1"] = vk.pubfn.copyObject(that.form1);
			},
			// 表单重置
			resetForm(){
				vk.pubfn.resetForm(originalForms, that);
			},
			// 搜索
			search(){
				that.$refs.table1.search();
			},
			// 刷新
			refresh(){
				that.$refs.table1.refresh();
			},
			// 获取当前选中的行的数据
			getCurrentRow(){
				return that.$refs.table1.getCurrentRow();
			},
			// 监听 - 行的选中高亮事件
			currentChange(val){
				that.table1.selectItem = val;
			},
			// 当选择项发生变化时会触发该事件
			selectionChange(list) {
				that.table1.multipleSelection = list;
			},
		},
		// 监听属性
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
	.page-body {

	}
</style>
