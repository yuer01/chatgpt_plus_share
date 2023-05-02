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
		<view class="vk-table-button-box">
			<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加</el-button>
			<el-button type="primary" size="small" icon="el-icon-s-tools" :disabled="!table1.selectItem" @click="bindPermissionBtn">权限赋予</el-button>
			<el-button type="danger" size="small" icon="el-icon-s-tools" :disabled="!table1.selectItem" @click="bindMenu">菜单赋予</el-button>
		</view>
		<!-- 自定义按钮区域结束 -->
		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto','update','delete']"
			:selection="false"
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

		<!-- 角色赋予权限弹窗 -->
		<bindPermission v-model="formDatas.bindPermission"></bindPermission>
		<!-- 角色赋予菜单弹窗 -->
		<bindMenu v-model="formDatas.bindMenu"></bindMenu>

		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {};						// 表单初始化数据

	import bindPermission from './form/bindPermission'
	import bindMenu from './form/bindMenu'
	export default {
		components:{
			bindPermission,
			bindMenu
		},
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
					action:"admin/system/role/sys/getList",
					// 表格字段显示规则
					columns: [
						{ key:"role_id", title:"角色标识", type:"text", width:220 },
						{ key:"role_name", title:"角色名称", type:"text", width:130 },
						{ key:"comment", title:"备注", type:"text", minWidth:180 },
						{ key:"permissionList", title:"拥有的权限", type:"text", minWidth:290, align:"left",
							formatter:(val, row, column, index)=>{
								let str = "";
								if(row.role_id === "admin"){
									str = "系统内置角色 - 拥有所有权限";
								}else if(vk.pubfn.isNull(val)){
									str = "该角色未赋予任何权限";
								}else{
									val.map((item, index) => {
										if(vk.pubfn.isNotNull(item.url)){
											str += item.permission_name;
											if (index !== val.length - 1) {
												str += "、";
											}
										}
									});
								}
								return str;
							}
						},
						{ key:"menuList", title:"拥有的菜单", type:"text", minWidth:290, align:"left",
							formatter:(val, row, column, index)=>{
								let str = "";
								if(row.role_id === "admin"){
									str = "系统内置角色 - 拥有所有菜单";
								}else if(vk.pubfn.isNull(val)){
									str = "该角色未赋予任何菜单";
								}else{
									val.map((item, index) => {
										str += item.name;
										if (index !== val.length - 1) {
											str += "、";
										}
									});
								}
								return str;
							}
						},
						// 系统
						{ key:"stats_count_info", title:"统计信息", type:"html", width:220, align:"left", show: ["detail"],
							formatter:(val, row, column, index)=>{
								console.log(`val`,val);
								let str = ``;
								if(row.role_id === "admin"){
									return "拥有所有权限";
								}
								for (let value in val) {
									switch(value){
										case "curd_category":
											str+= `分类:&nbsp;&nbsp;`;
										break;
										case "level":
											str+= `等级:&nbsp;&nbsp;`;
										break;
										case "match_mode":
											str+= `模式:&nbsp;&nbsp;`;
										break;
										default:
											str+= `菜单和权限:&nbsp;&nbsp;`;
										break;
									};
								  for (let [index, item] of val[value].entries()) {
								    str += `${item.label} : ${item.count}个&nbsp;&nbsp;`;
								  };
									str +=`<br/>`;
								};
								return str;
							}
						},
						// 对应的权限是否启用
						{ key:"enable", title:"是否启用", type:"tag",
							data:[
								{ value:true, label:"启用", tagType:"success" },
								{ value:false, label:"禁用", tagType:"danger" }
							]
						}
					],
					// 多选框选中的值
					multipleSelection:[],
					// 当前高亮的记录
					selectItem:"",
				},
				// 表格相关结束 -----------------------------------------------------------
				// 表单相关开始-----------------------------------------------------------
				// 查询表单请求数据
				queryForm1:{
					// 查询表单数据源，可在此设置默认值
					formData:{

					},
					// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
					columns:[
						{ key:"role_id", title:"角色标识", type:"text", width: 160, mode:"%%" },
						{ key:"role_name", title:"角色名称", type:"text", width: 160, mode:"%%" },
						{ key:"_add_time", title:"添加时间", type:"datetimerange", width:400 },
					]
				},
				form1: {
					// 表单请求数据，此处可以设置默认值
					data: {
						enable:true,
					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"",
						// 表单字段显示规则
						columns:[
							{ key:"role_id", title:"角色标识", type:"text", show:["add"] },
							{ key:"role_name", title:"角色名称", type:"text" },
							{ key:"comment", title:"备注", type:"textarea",
								maxlength:"99", showWordLimit:true, autosize:{ minRows: 2, maxRows: 10 } ,
							},
							{ key:"enable", title:"是否启用", type:"switch" }
						],
						// 表单验证规则
						rules:{
							role_id:[
								{ required:true, message:'角色标识不能为空', trigger:'blur' },
							],
							role_name:[
								{ required:true, message:'角色名称不能为空', trigger:'change' }
							],
						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show:false,
					}
				},
				// 其他表单属性容器(请勿修改)
				formDatas:{},
				// 表单相关结束-----------------------------------------------------------
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
			resetForm(){
				vk.pubfn.resetForm(originalForms, that);
			},
			// 搜索
			search(){
				that.$refs.table1.query();
			},
			// 刷新
			refresh(){
				that.$refs.table1.refresh();
			},
			// 获取当前选中的行的数据
			getCurrentRow(key){
				return that.$refs.table1.getCurrentRow(key);
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
				that.form1.props.action = 'admin/system/role/sys/add';
				that.form1.props.formType = 'add';
				that.form1.props.title = '添加';
				that.form1.props.show = true;
			},
			// 显示修改页面
			updateBtn({ item }){
				that.form1.props.action = 'admin/system/role/sys/update';
				that.form1.props.formType = 'update';
				that.form1.props.title = '编辑';
				that.form1.props.show = true;
				that.form1.data = item;
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				deleteFn({
					action:"admin/system/role/sys/delete",
					data:{
						role_id: item.role_id
					},
				});
			},
			// 权限赋予按钮
			bindPermissionBtn(){
				let item = that.getCurrentRow(true);
				vk.pubfn.openForm('bindPermission',{ item });
			},
		  // 菜单赋予绑定按钮
			bindMenu(){
				let item = that.getCurrentRow(true);
				vk.pubfn.openForm('bindMenu',{ item });
			}
		},
		// 监听属性
		watch: {

		},
		// 计算属性
		computed: {

		}
	};
</script>
<style lang="scss" scoped>
	::v-deep .el-tree-node__content .el-checkbox {
		margin-right: 8px;
	}
</style>
