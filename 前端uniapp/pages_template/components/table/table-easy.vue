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

		<!-- 自定义按钮区域开始 -->
		<view>
			<el-row>
				<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加</el-button>
				<!-- 批量操作 -->
				<el-dropdown v-if="table1.multipleSelection" :split-button="false"	trigger="click" @command="batchBtn">
					<el-button type="danger" size="small" style="margin-left: 20rpx;"
						:disabled="table1.multipleSelection.length === 0"
					>
						批量操作<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="1">批量操作1</el-dropdown-item>
						<el-dropdown-item :command="2">批量操作2</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button type="success" size="small" icon="el-icon-edit-outline" style="margin-left: 20rpx;" @click="exportExcel" > 订单导出xls </el-button>
				<el-button type="success" size="small" icon="el-icon-edit-outline" style="margin-left: 20rpx;" @click="exportExcelAll" > 导出全部 </el-button>
			</el-row>
		</view>
		<!-- 自定义按钮区域结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto','update','delete','more']"
			:right-btns-more="table1.rightBtnsMore"
			:selection="true"
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
			width="500px"
			mode="form"
			:close-on-click-modal="false"
		>
			<vk-data-form
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
						{ key:"money", title:"金额", type:"money", width:80, sortable:"custom" },
						{ key:"remark", title:"备注", type:"text", width:80 },
						{ key:"_add_time", title:"添加时间", type:"time", width:160, sortable:"custom", valueFormat:"yyyy-MM-dd hh:mm:ss" },
						{ key:"_add_time", title:"距离现在", type:"dateDiff", width:120 },
					],
					// 多选框选中的值
					multipleSelection:[],
					// 当前高亮的记录
					selectItem:"",
					rightBtnsMore:[
						{
							title:'按钮1',
							onClick:function(item){
								vk.toast(`${item._id}-按钮1`);
							}
						},
						{
							title:'按钮2',
							onClick:function(item){
								vk.toast(`${item._id}-按钮2`);
							}
						}
					]
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
						{ key:"money_1", type:"money", title:"金额范围", width:160, placeholder:"请输入最小金额",
							mode:">=", fieldName:"money"
						},
						{ key:"money_2", type:"money", title:"-", width:160, placeholder:"请输入最大金额",
						 mode:"<=" , fieldName:"money"
						},
						{ key:"remark", title:"备注", type:"text", width:160, mode:"%%" },
						{ key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
					]
				},
				form1:{
					// 表单请求数据，此处可以设置默认值
					data: {

					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"",
						// 表单字段显示规则
						columns:[
							{
								key: "user_id", title: "选择用户", type: "table-select", placeholder:"选择",
								action:"admin/system/user/sys/getList",
								columns:[
									{ key:"nickname", title:"用户昵称", type:"text", nameKey:true },
									{ key:"_id", title:"用户标识", type:"text", idKey:true },
									{ key:"mobile", title:"手机号", type:"text", defaultValue:"无" },
								]
							},
							{ key:"money", title:"金额", type:"money", placeholder:"请输入金额" },
							{ key:"remark", title:"备注", type:"text", placeholder:"请输入备注" },
						],
						// 表单验证规则
						rules:{
							user_id:[
								{ required:true, message: "请选择用户", trigger:"change" }
							],
							money:[
								{ required:true, message:"金额不能为空", trigger:"blur" },
								{ type:"number", message:"金额必须是数字", trigger:"blur" },
							],
						},
						// add 代表添加 update 代表修改
						formType:"",
						// 是否显示表单的弹窗
						show:false
					}
				},
				formDatas:{}
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
			// 页面返回
			pageBack(path){
				const pages = getCurrentPages();
				if (pages.length>1 && pages[0].route !== that.$page.route) {
					vk.navigateBack();
				} else if(path) {
					vk.navigateTo(path);
				}
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
			// 显示添加页面
			addBtn(){
				that.resetForm();
				that.form1.props.action = 'template/db_api/sys/add';
				that.form1.props.formType = 'add';
				that.form1.props.title = '添加';
				that.form1.props.show = true;
			},
			// 显示修改页面
			updateBtn({ item }){
				that.form1.props.action = 'template/db_api/sys/update';
				that.form1.props.formType = 'update';
				that.form1.props.title = '编辑';
				that.form1.props.show = true;
				that.form1.data = item;
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				deleteFn({
					action: "template/db_api/sys/delete",
					data:{
						_id: item._id
					},
					refresh: true
				});
			},
			// 监听 - 批量操作的按钮点击事件
			batchBtn(index){
				switch(index){
					case 1: vk.toast("批量操作按钮1"); break;
					case 2: vk.toast("批量操作按钮2"); break;
					default : break;
				}
			},
			// 导出xls表格文件（表格当前页数据）
			exportExcel(){
				that.$refs.table1.exportExcel();
			},
			// 导出xls表格文件（全部数据）
			exportExcelAll(){
				that.$refs.table1.exportExcel({
					fileName: "表格全部数据",
					title: "正在导出数据...",
					pageIndex: 1,
					pageSize: -1, // 此值为-1，代表导出所有数据
				});
			}
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
