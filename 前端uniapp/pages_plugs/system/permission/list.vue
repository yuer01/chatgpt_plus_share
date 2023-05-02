<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<!-- 自定义按钮区域开始 -->
		<view class="vk-table-button-box">
			<el-button type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">添加</el-button>
		</view>
		<!-- 自定义按钮区域结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto','update','delete']"
			:default-expand-all="false"
			@update="updateBtn"
			@delete="deleteBtn"
			@current-change="currentChange"
			@selection-change="selectionChange"
			@cell-click="cellClick"
		></vk-data-table>
		<!-- 表格组件结束 -->

		<!-- 添加或编辑的弹窗开始 -->
		<vk-data-dialog
			v-model="form1.props.show"
			:title="form1.props.title"
			width="700px"
			mode="form"
		>
			<vk-data-form
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				label-width="80px"
				@success="formSuccess"
			></vk-data-form>
		</vk-data-dialog>
		<!-- 添加或编辑的弹窗结束 -->
		<!-- 修改分类 -->
		<updateCategory v-model="formDatas.updateCategory"></updateCategory>
		<!-- 修改等级 -->
		<updateLevel v-model="formDatas.updateLevel"></updateLevel>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {};						// 表单初始化数据

	const matchModeData = [
		{ value:0, label:"完整路径" },
		{ value:1, label:"通配符" },
		{ value:2, label:"正则表达式" }
	];

	import updateCategory from './form/updateCategory'
	import updateLevel from './form/updateLevel'

	export default {
		components:{
			updateCategory,
			updateLevel
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
					action:"admin/system/permission/sys/getAll",
					// 表格字段显示规则
					columns: [
						{ key:"permission_id", title:"权限标识", type:"text", width:310, align:"left",
							treeNode:true
						},
						{ key:"permission_name", title:"权限名称", type:"text", width:120, align:"left" },
						{ key:"comment", title:"备注", type:"text", width:180, align:"left" },
						{ key:"url", title:"URL", type:"text", width:250, align:"left" },
						{ key:"match_mode", title:"匹配模式", type:"text", width:100,
							formatter:function(val, row, column, index){
								if(typeof val === "undefined" || row.type == 0 || !row.url || row.url.length == 0) return "";
								return matchModeData[val].label;
							}
						},
						{ key:"curd_category", title:"权限分类", type:"tag", width:100,
							data: [
								{ value:1, label:"增", tagType:"success" },
								{ value:2, label:"删", tagType:"danger" },
								{ value:3, label:"改", tagType:"" },
								{ value:4, label:"查", tagType:"info" },
								{ value:5, label:"特", tagType:"warning" },
								//{ value:0, label:"其他", tagType:"warning" },
							]
						},
						{ key:"level", title:"权限级别", type:"tag", width:100,
							data: [
								{ value:1, label:"子弹级", tagType:"success" },
								{ value:2, label:"炸弹级", tagType:"" },
								{ value:3, label:"榴弹级", tagType:"warning" },
								{ value:4, label:"核弹级", tagType:"danger" },
							]
						},
						{ key:"sort", title:"排序值", type:"number", width:80 },
						// 对应的权限是否启用
						{ key:"enable", title:"是否启用", type:"tag",
							data:[
								{ value:true, label:"启用", tagType:"success" },
								{ value:false, label:"禁用", tagType:"danger" },
							]
						},
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

					]
				},
				form1: {
					// 表单请求数据，此处可以设置默认值
					data: {
						sort:0,
						enable:true,
						match_mode:0,
						url:[""]
					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"",
						// 表单字段显示规则
						columns:[
							{ key:"", title:"基础属性", type:"bar-title" },
							{ key:"permission_id", title:"标识", type:"text", disabled:["update"],
								tips:"全局唯一，添加后不可修改，请尽量语义化。如：user-manage、user-add"
							},
							{ key:"permission_name", title:"名称", type:"text",
								tips:"起一个容易表达权限含义的名称"
							},
							{
								key:"url", title:"URL", type:"array<string>", tips:"云函数路径，若该权限只是父权限分组用，点击清空即可。",
								isUnique:true,
								rules:[
									{ required:true, message:"该项不能为空", trigger:["change","blur"] },
								]
							},
							{ key:"match_mode", title:"匹配模式", type:"radio", width:100,
								data:matchModeData,
								tips:"选择合适的匹配模式"
							},
							{ key:"parent_id", title:"父级权限", type:"tree-select", tips:"父级的permission_id" ,
								action:"admin/system/permission/sys/getAll",
								props: { list:"rows", value:"permission_id", label:"label", children:"children" },
							},
							{ key:"sort", title:"排序值", type:"number", tips:"越小越显示在前面" },
							{ key:"comment", title:"备注", type:"textarea",maxlength:"99",showWordLimit:true,autosize:{ minRows: 2, maxRows: 10 },
								tips:"设置一个备注来更详细的描述此权限的含义"
							},
							{ key:"enable", title:"是否启用", type:"switch",
								tips:"当关闭时，权限将失效，再次启用时，权限会恢复。"
							},
							{ key:"", title:"高级属性", type:"bar-title" },
							{ key:"curd_category", title:"权限分类", type:"radio", width:100,
								data:[
									{ value:1, label:"增", tagType:"success" },
									{ value:2, label:"删", tagType:"danger" },
									{ value:3, label:"改", tagType:"" },
									{ value:4, label:"查", tagType:"info" },
									{ value:5, label:"特", tagType:"warning" },
									{ value:0, label:"其他", tagType:"warning" },
								],
								tips:"给权限分一个类，方便查询和表达含义"
							},
							{ key:"level", title:"权限级别", type:"radio", width:100,
								data:[
									{ value:1, label:"子弹级", tagType:"success" },
									{ value:2, label:"炸弹级", tagType:"" },
									{ value:3, label:"榴弹级", tagType:"warning" },
									{ value:4, label:"核弹级", tagType:"danger" },
									{ value:0, label:"其他", tagType:"info" },
								],
								tips:"给权限（菜单）一个级别，方便查询和表达重要程度"
							},
						],
						// 表单对应的验证规则
						rules: {
							permission_id:[
								{ required:true, message:'权限标识不能为空', trigger:'blur' },
							],
							permission_name:[
								{ required:true, message:'权限名称不能为空', trigger:'blur' },
							],
							sort:[
								{ type:'number', message:'排序值必须为数字'}
							]
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
				that.form1.props.action = 'admin/system/permission/sys/add';
				that.form1.props.formType = 'add';
				that.form1.props.title = '添加';
				that.form1.props.show = true;
				let currentRow = that.getCurrentRow();
				if(currentRow && currentRow.permission_id){
					// 设置的方法
					that.$set(that.form1.data,"parent_id", currentRow.permission_id);
					that.$set(that.form1.data,"permission_id", currentRow.permission_id+"-");
				}
			},
			// 显示修改页面
			updateBtn({ item }){
				that.form1.props.action = 'admin/system/permission/sys/update';
				that.form1.props.formType = 'update';
				that.form1.props.title = '编辑';
				that.form1.props.show = true;
				that.form1.data = item;
			},
			formSuccess(){
				that.form1.props.show = false;
				// 下面的写法是为了部分修改完成后，减少一次再次请求数据库的查询
				if(that.form1.props.formType === "update"){
					let item = that.getCurrentRow(true);
					if(item.parent_id !== that.form1.data.parent_id){
						that.refresh();
					}else{
						vk.pubfn.objectAssign(item, that.form1.data);
					}
				}else{
					that.refresh();
				}
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				deleteFn({
					action:"admin/system/permission/sys/delete",
					data:{
						permission_id: item.permission_id
					},
				});
			},
			cellClick(row, column, cell, event){
				let key = column.property;
				if(key === "curd_category"){
					// 修改分类
					let item = that.getCurrentRow(true);
					vk.pubfn.openForm('updateCategory', { item });
				}else if(key === "level"){
					// 修改等级
					let item = that.getCurrentRow(true);
					vk.pubfn.openForm('updateLevel', { item });
				}
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
