<template>
	<view class="page-body">
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->
		<!-- 请不要修改此页面的代码，因为更新后会覆盖，你自己系统的用户管理不应该在这个页面上开发，你应该复制整个页面，在别的目录创建用户管理。 -->

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
			<!-- 批量操作 -->
			<el-dropdown v-if="table1.multipleSelection" :split-button="false"	trigger="click" @command="batchBtn">
				<el-button type="danger" size="small"
					:disabled="table1.multipleSelection.length === 0"
				>
					批量操作<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :command="1">账号批量解冻</el-dropdown-item>
					<el-dropdown-item :command="2">账号批量冻结</el-dropdown-item>
					<el-dropdown-item :command="3">批量设置可登录的应用</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<el-button type="primary" size="small" icon="el-icon-s-tools" :disabled="!table1.selectItem" @click="bindRoleBtn">角色绑定</el-button>
			<el-button type="primary" size="small" icon="el-icon-warning-outline" :disabled="!table1.selectItem" @click="resetPasswordBtn">重置密码</el-button>
		</view>
		<!-- 自定义按钮区域结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto','update','delete']"
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
			width="580px"
			top="4vh"
			mode="form"
		>
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				label-width="120px"
				max-height="700px"
				@success="form1.props.show = false;refresh();"
			></vk-data-form>
		</vk-data-dialog>
		<!-- 添加或编辑的弹窗结束 -->

		<!-- 用户角色授权弹窗 -->
		<bindRole v-model="formDatas.bindRole"></bindRole>
		<!-- 重置密码弹窗 -->
		<resetPassword v-model="formDatas.resetPassword"></resetPassword>
		<!-- 批量设置用户允许登录的客户端 -->
		<setAuthorizedAppLogin v-model="formDatas.setAuthorizedAppLogin" @success="refresh"></setAuthorizedAppLogin>

		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {};						// 表单初始化数据
	var genderData = [
		{ value:1, label:"男"},
		{ value:2, label:"女"},
		{ value:0, label:"保密"}
	];
	var dcloudAppidData = [];

	import bindRole from './form/bindRole'
	import resetPassword from './form/resetPassword'
	import setAuthorizedAppLogin from './form/setAuthorizedAppLogin'

	export default {
		components:{
			bindRole,
			resetPassword,
			setAuthorizedAppLogin
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
					action:"admin/system/user/sys/getList",
					// 表格字段显示规则
					columns: [
						{ key:"avatar", title:"头像", type:"avatar", width:80 },
						{ key:"username", title:"用户名", type:"text", width:180, defaultValue:'未设置' },
						{ key:"nickname", title:"昵称", type:"text", width:180, defaultValue:'未设置' },
						{ key:"mobile", title:"手机号", type:"text", width:120, defaultValue:"未绑定" },
						{ key:"appList", title:"可登录的应用", type:"html", width:220,
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
						{ key:"role", title:"角色", type:"text", width:120, defaultValue:'无' },
						{ key:"comment", title:"备注", type:"text", width:160 },
						{ key:"allow_login_background", title:"允许登录后台", type:"tag", width: 140, defaultValue:false, sortable:"custom",
							data:[
								{ value:true, label:"允许", tagType:"success" },
								{ value:false, label:"禁止", tagType:"danger" }
							]
						},
						{ key:"status", title:"账户状态", type:"tag", width:120, defaultValue:0, sortable:"custom",
							data:[
								{ value:0, label:"正常", tagType:"success" },
								{ value:1, label:"冻结", tagType:"danger" },
								{ value:2, label:"审核中", tagType:"primary" },
								{ value:3, label:"审核拒绝", tagType:"info" }
							]
						},
						{ key:"gender", title:"性别", type:"radio", width:80, defaultValue:0, sortable:"custom",
							data:genderData
						},
						{ key:"register_date", title:"注册时间", type:"time", width:160, sortable:"custom" },
						{ key:"last_login_date", title:"最后登录时间", type:"dateDiff", width:130, defaultValue:'从未登录过', sortable:"custom" },
						{ key:"last_login_ip", title:"最后登录ip", type:"text", width:120, defaultValue:'从未登录过' },
						{ key:"_id", title:"id", type:"text", width:280 },
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
						dcloud_appid:""
						//allow_login_background : true,
					},
					// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
					columns:[
						{ key:"dcloud_appid", title:"所属应用", type:"select", width:160, mode:"custom",
							data:[],
							props:{ value:"appid", label:"name" }
						},
						{ key:"username", title:"用户名", type:"text", width:160, mode:"%%" },
						{ key:"nickname", title:"昵称", type:"text", width:140, mode:"%%" },
						{ key:"mobile", title:"手机号", type:"text", width:140, mode:"%%" },
						{ key:"_id", title:"ID", type:"text", width:140, mode:"=" },
						{ key:"register_date", title:"注册时间", type:"datetimerange", width:380, mode:"[]" },
						{ key:"allow_login_background", hidden:true, mode:"=" },
					]
				},
				form1: {
					// 表单请求数据，此处可以设置默认值
					data: {
						gender:0,
						login_appid_type:1,
						allow_login_background:false
					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"",
						// 表单字段显示规则
						columns:[
							{ key:"username", title:"用户名", type:"text", show:["add"] },
							{ key:"nickname", title:"昵称", type:"text" },
							{ key:"gender", title:"性别", type:"radio",
								data: genderData
							},
							{ key:"password", title:"密码", type:"text", tips:"若密码为空，则默认为234567", show:["add"] },
							{ key:"mobile", title:"手机号", type:"text" },
							{
							  key:"login_appid_type", title:"登录权限", type:"radio",
							  optionType:"button",
								data:[
									{ value:1, label:"部分应用" },
									{ value:0, label:"全部应用" }
							  ],
								onChange:function(val, formData, column, index, option){
									if(val === 1){
										that.form1.data.allow_login_background = false
									}else{
										that.form1.data.allow_login_background = true;
									}
								}
							},
							{
							  key:"dcloud_appid", title:"可登录的应用", type:"checkbox",
							  border:true,
							  itemWidth:100,
								data:[],
							  props:{ value:"appid", label:"name" },
								showRule:"login_appid_type=1",
								onChange:function(val, formData, column, index, option=[]){
									let allow_login_background = false;
									option.map((item={}, index) => {
										if(item.type && item.type.indexOf("admin") > -1){
											allow_login_background = true;
										}
									});
									if(that.form1.data.login_appid_type === 1){
										that.form1.data.allow_login_background = allow_login_background;
									}else{
										that.form1.data.allow_login_background = true;
									}
								}
							},
							// {
							// 	key:"allow_login_background", title:"允许登录后台?", type:"switch",
							// 	tips:"只有同时设置可登录的应用有管理端以及允许登后台，该用户才能登录管理端"
							// },
							{ key:"comment", title:"备注", type:"textarea",
								maxlength:"99", showWordLimit:true, autosize:{ minRows: 2, maxRows: 10 } ,
							},
						],
						// 表单对应的验证规则
						rules:{
							username:[
								{
									required: true,
									validator:vk.pubfn.validator("username"),
									message: '用户名以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
									trigger: 'blur'
								}
							],
							nickname: [
								{ required:true, message:'昵称为必填字段', trigger:'blur' },
								{ min:2, max:20, message:'昵称长度在 2 到 20 个字符', trigger:'blur' }
							],
							password: [
								{ validator:vk.pubfn.validator("password"), message: '密码长度在6~18之间，只能包含字母、数字和下划线', trigger: 'blur' }
							],
							mobile:[
							  { validator:vk.pubfn.validator("mobile"), message: '手机号格式错误', trigger: 'blur' }
							]
						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show: false,
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
						let dcloudAppidData1 = vk.pubfn.copyObject(data.rows);
						let dcloudAppidData2 = vk.pubfn.copyObject(data.rows);
						let index1 = vk.pubfn.getListIndex(that.form1.props.columns, "key", "dcloud_appid");
						that.form1.props.columns[index1].data = dcloudAppidData1;
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
				that.form1.props.action = 'admin/system/user/sys/add';
				that.form1.props.formType = 'add';
				that.form1.props.title = '添加';
				that.form1.props.show = true;
			},
			// 显示修改页面
			updateBtn({ item }){
				that.form1.props.action = 'admin/system/user/sys/update';
				that.form1.props.formType = 'update';
				that.form1.props.title = '编辑';
				that.form1.props.show = true;
				item.login_appid_type = typeof item.dcloud_appid === "undefined" ? 0 :1;
				that.form1.data = item;
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				deleteFn({
					action:"admin/system/user/sys/delete",
					data:{
						_id: item._id
					}
				});
			},
			// 监听 - 批量操作的按钮点击事件
			batchBtn(index){
				switch(index){
					case 1: that.frozen(0); break;
					case 2: that.frozen(1); break;
					case 3: that.setAuthorizedAppLogin(); break;
					default: break;
				}
			},
			// 角色绑定按钮
			bindRoleBtn(){
				let item = that.getCurrentRow(true);
				vk.pubfn.openForm('bindRole',{ item });
			},
			// 重置密码按钮
			resetPasswordBtn(){
				let item = that.getCurrentRow(true);
				vk.pubfn.openForm('resetPassword',{ item });
			},
			//账户批量冻结/解冻
			frozen(status){
				let user_ids = [];
				that.table1.multipleSelection.map((item,index)=>{
					user_ids.push(item._id);
				});
				vk.callFunction({
					url: 'admin/system/user/sys/batchUpdateStatus',
					title:'请求中...',
					data:{
						user_ids,
						status
					},
					success:function(data) {
						that.$notify({
							message:'批量操作成功!',
							type:'success'
						});
						that.refresh();
					}
				});
			},
			// 批量设置允许登录的客户端
			setAuthorizedAppLogin(){
				let user_ids = [];
				that.table1.multipleSelection.map((item,index)=>{
					user_ids.push(item._id);
				});
				that.formDatas.setAuthorizedAppLogin = {
					show:true,
					item:{
						user_ids,
						dcloudAppidData
					}
				};
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

</style>
