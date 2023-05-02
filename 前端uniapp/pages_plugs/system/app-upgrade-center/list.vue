<template>
	<view class="page-body" v-loading="loading">
		<!-- 页面内容开始 -->

		<!-- 表格搜索组件开始 -->
		<vk-data-table-query
			v-model="queryForm1.formData"
			:columns="queryForm1.columns"
			:main-columns="['appid','title','type','stable_publish']"
			@search="search"
		></vk-data-table-query>
		<!-- 表格搜索组件结束 -->

		<!-- 自定义按钮区域开始 -->
		<view>
			<el-row>
				<el-dropdown placement="bottom-start" @command="addBtn">
					<el-button type="success" size="small" icon="el-icon-circle-plus-outline" :disabled="!queryForm1.formData.appid">添加</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="native_app">原生App安装包</el-dropdown-item>
						<el-dropdown-item command="wgt">wgt资源包</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>


				<!-- 批量操作 -->
				<!-- <el-dropdown v-if="table1.multipleSelection" :split-button="false"	trigger="click" @command="batchBtn">
					<el-button type="danger" size="small" style="margin-left: 20rpx;"
						:disabled="table1.multipleSelection.length === 0"
					>
						批量操作<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="1">批量操作1</el-dropdown-item>
						<el-dropdown-item :command="2">批量操作2</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> -->
			</el-row>
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
			:auto-action="false"
			@update="updateBtn"
			@delete="deleteBtn"
			@current-change="currentChange"
			@selection-change="selectionChange"
		></vk-data-table>
		<!-- 表格组件结束 -->

		<!-- 添加或编辑 -->
		<addUpdate v-model="formDatas.addUpdate" @success="refresh"></addUpdate>

		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {};						// 表单初始化数据

	import addUpdate from './form/addUpdate.vue'
	export default {
		components:{
			addUpdate,
		},
		data() {
			// 页面数据变量
			return {
				appList:[],
				// 页面是否请求中或加载中
				loading:false,
				// init请求返回的数据
				data:{

				},
				// 表格相关开始 -----------------------------------------------------------
				table1:{
					// 表格数据请求地址
					action:"admin/system/app-upgrade-center/sys/getList",
					// 表格字段显示规则
					columns:[
						{ key:"appid", title:"AppID", type:"text", width:120 },
						{ key:"title", title:"更新标题", type:"text", width:120 },
						{
							key: "type", title: "安装包类型", type: "tag", width: 140, size: "small",
							data:[
								{ value:"native_app", label:"原生App安装包", tagType:"primary", effect:"light" },
								{ value:"wgt", label:"Wgt资源包", tagType:"success", effect:"light" }
							]
						},
						{
							key:"platform", title:"平台", type:"checkbox", width:100, align:"left",
							itemWidth:80,
							data:[
								{ value:"Android", label:"安卓" },
								{ value:"iOS", label:"苹果" }
							],
						},
						{ key:"store_list", title:"已上架应用市场", type:"text", width:120, align:"left",
							formatter: (val=[], row, column, index) => {
								let str = "";
								val.map((item, index) => {
									str += item.name;
									if (index !== val.length - 1) {
										str += "、";
									}
								});
								if (!str) str = "-";
								return str;
							}
						},
						{ key:"version", title:"版本号", type:"text", width:100 },
						{
							key: "stable_publish", title: "安装包状态", type: "tag", width: 120, size: "small",
							data:[
								{ value:true, label:"已上线", tagType:"success", effect:"light" },
								{ value:false, label:"已下线", tagType:"info", effect:"light" }
							]
						},
						{ key:"create_date", title:"上传时间", type:"time", width:160, sortable:"custom"  },
						{ key:"create_date", title:"距离现在", type:"dateDiff", width:120 },
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
						appid:""
					},
					// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
					columns:[
						{
							key:"appid", title:"所属应用", type:"select", placeholder:"请选择应用", width:140, mode:"=",
							props:{ value:'appid', label:'name' },
							data:()=>{
								return this.appList;
							}
						},
						{ key:"title", title:"标题", type:"text", width:140, mode:"%%" },
						{
							key: "type", title: "安装包类型", type: "select", width: 140, placeholder:"请选择类型",
							data:[
								{ value:"native_app", label:"原生App安装包" },
								{ value:"wgt", label:"Wgt资源包" }
							]
						},
						{
							key: "stable_publish", title: "安装包状态", type: "select", width: 140, placeholder:"请选择状态",
							data:[
								{ value:true, label:"已上线" },
								{ value:false, label:"已下线" }
							]
						},
						{ key:"create_date", title:"上传时间", type:"datetimerange", width:360, mode:"[]" },
					]
				},
				// 其他弹窗表单
				formDatas:{},
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
				vk.callFunction({
					url: 'admin/system/app/sys/getList',
					loading:true,
					data: {
						pageSize:500,
						formData:{
							enable_upgrade_center: true
						},
						columns:[
							{ key:"enable_upgrade_center", type:"select", mode:"=" },
						]
					},
					success: (data) => {
						that.appList = data.rows;
						if (options.appid) {
							that.queryForm1.formData.appid = options.appid;
							that.search();
						} else if (data.rows.length > 0) {
							that.queryForm1.formData.appid = data.rows[0].appid;
							that.search();
						}
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
			addBtn(type){
				let appid = that.queryForm1.formData.appid;
				let appInfo = vk.pubfn.getListItem(that.appList, "appid", appid);
				let item = {
					appid,
					type,
					name: appInfo.name,
					store_list: appInfo.store_list
				};
				vk.pubfn.openForm('addUpdate',{ mode:"add", item });
			},
			// 显示修改页面
			updateBtn({ item }){
				vk.pubfn.openForm('addUpdate',{ mode:"update", item });
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				if (item.stable_publish) {
					this.$message({
						showClose: true,
						message: '不可删除已上线的版本',
						type: 'error'
					});
					return false;
				}
				deleteFn({
					action:"admin/system/app-upgrade-center/sys/delete",
					data:{
						_id: item._id
					},
				});
			},
			// 监听 - 批量操作的按钮点击事件
			batchBtn(index){
				switch(index){
					case 1: vk.toast("批量操作按钮1"); break;
					case 2: vk.toast("批量操作按钮2"); break;
					default : break;
				}
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
	.page-body {

	}
</style>
