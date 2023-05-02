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
				
			</el-row>
		</view>
		<!-- 自定义按钮区域结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto']"
			:pagination="true"
			@update="updateBtn"
			@delete="deleteBtn"
			@current-change="currentChange"
			@selection-change="selectionChange"
			:custom-right-btns="table1.rightBtnsMore"
		></vk-data-table>
		<!-- 表格组件结束 -->

		<!-- 评价的弹窗开始 -->
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
		
		<!-- 评价的弹窗开始 -->
		<vk-data-dialog
			v-model="PwdKeyIsShow"
			:title="'查看密码或key（请注意保密)'"
			width="500px"
			
			:close-on-click-modal="false"
		>
			{{PwdKeyContent}}
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
				// ifShowPingjia : true
				// formDataPingjia : {},
				loading:false,
				PwdKeyIsShow : false,
				PwdKeyContent : "",
				// init请求返回的数据
				data:{

				},
				// 表格相关开始 -----------------------------------------------------------
				table1:{
					// 表格数据请求地址
					action:"admin/my_order/sys/getList",
					// 表格字段显示规则
					columns:[
						{ key:"_id", title:"订单编号", type:"text" },
						{ key:"acc.type", title:"类型", type:"text", width:80, sortable:"custom" },
						{ key:"acc.title", title:"标题", type:"text", sortable:"custom" },
						{ key:"price", title:"价格", type:"money", width:80, sortable:"custom" },
						{ key:"order_state", title:"状态", type:"text", width:80, sortable:"custom" },
						{ key:"user.username", title:"购买用户名", type:"text", width:120, sortable:"custom" },
						{ key:"_add_time_str", title:"添加时间", type:"time", width:160, sortable:"custom" , valueFormat:"yyyy-MM-dd hh:mm:ss"  },
						
					],
					// 多选框选中的值
					multipleSelection:[],
					// 当前高亮的记录
					selectItem:"",
					rightBtnsMore:[
						{
						  title: '评价',
						  type:'primary',
						  disabled: (item)=>{
							 return item.order_state !== '已支付' && item.order_state !== '已评价'
						  },
						  onClick: (item)=>{
							  this.ifShowPingjia = true
							  this.form1.data = item
							  
							  this.form1.props.show = true
							  // this.pingjia(item)
							// vk.toast(`${item._id}-按钮1`);
						  }
						},
						{
						  title: '查看Plus账号密码',
						  type:'success',//primary / success / warning / danger / info / text
						  disabled: (item)=>{
						  							 return item.order_state !== '已支付' && item.order_state !== '已评价'
						  },
						  onClick: (item)=>{
							  this.lookPwdKey(item)
							  // this.pingjia(item)
							// vk.toast(`${item._id}-按钮1`);
						  }
						},
						
						]
				},
				// 表格相关结束 -----------------------------------------------------------
				// 表单相关开始 -----------------------------------------------------------
				// 查询表单请求数据
				queryForm1:{
					// 查询表单数据源，可在此设置默认值
					formData:{
						search_type:'1'
					},
					// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
					columns:[
						
						{ key:"search_type", title:"类型", type:"select", width:180, sortable:"custom",data:[{
							"label": "我买的",
							"value": "1"
						}, {
							"label": "我卖的",
							"value": "2",
						}] },
						{ key:"order_state", title:"状态", type:"select", width:180, sortable:"custom" ,data:[{
							"label": "待支付",
							"value": "待支付",
						}, {
							"label": "已支付",
							"value": "已支付",
						},{
							"label": "已评价",
							"value": "已评价",
						}] },
						
						
						
					]
				},
				form1:{
					// 表单请求数据，此处可以设置默认值
					data: {

					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"admin/my_order/sys/update_pinglun",
						// 表单字段显示规则
						columns:[
							
							{ key:"type", title:"类型", type:"text", disabled:true },
							{ key:"title", title:"标题", type:"text", disabled:true },
							{ key:"username", title:"账号", type:"text",  disabled:true },
							{ key:"password_key", title:"密码或key", type:"textarea",  disabled:true },
							{ key:"end_time", title:"结束日期", type:"date", disabled:true  },
							{ key:"price", title:"价格", type:"money", disabled:true , rightText:"元",max:200},
							{ key:"to_pjx", title:"评价星级", type:"rate",    },
							{ key:"to_pjmemo", title:"评价描述", type:"textarea",    }
							
						],
						// 表单验证规则
						rules:{
							
						},
						// add 代表添加 update 代表修改
						formType:"",
						// 是否显示表单的弹窗
						show:false
					}
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
			addBtn(){
				
			},
			// 显示修改页面
			updateBtn({ item }){
				
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				
			},
			// 监听 - 批量操作的按钮点击事件
			batchBtn(index){
				
			},
			pingjia(item){
				
			},
			lookPwdKey(item){ // 查看密码或key
				vk.callFunction({
					url: 'admin/my_order/sys/getPwdKey',
					title: '请求中...',
					data: {order_no:item._id},
					success: (data) => {
						if(data.code === 0){
							this.PwdKeyIsShow = true;
							this.PwdKeyContent = data.msg
						}
						
							console.log('测试支付结果 ',data)
					}
				});
			},
			testPay22(item){
				// vk.callFunction({
				// 	url: 'admin/my_order/sys/update_pay',
				// 	title: '请求中...',
				// 	data: item,
				// 	success: (data) => {
				// 			console.log('测试支付结果 ',data)
				// 	}
				// });
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
