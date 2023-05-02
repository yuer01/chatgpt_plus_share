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
				账户余额: <span style="color: red;font-weight: bold;margin-right: 20px;"> {{userMoney}} </span> (满50可提现)
				
				<el-button style="margin-left: 20px;" type="success" size="small" icon="el-icon-circle-plus-outline" @click="addBtn">我要提现</el-button>
				
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
				userMoney:0.00,//用户金额
				// init请求返回的数据
				data:{

				},
				// 表格相关开始 -----------------------------------------------------------
				table1:{
					// 表格数据请求地址
					action:"admin/my_tixian/sys/getList",
					// 表格字段显示规则
					columns:[
						
						// { key:"money", title:"提现金额", type:"money", placeholder:"请输入提现金额，单次最少50，最多200" ,rightText:"元",max:200,min:50},
						// { key:"to_weixin", title:"收款微信", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						// { key:"to_alipay", title:"收款支付宝", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						// { key:"to_cardno", title:"收款银行卡号", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						// { key:"mobile", title:"手机号", type:"text" },
						// { key:"memo", title:"备注", type:"textarea",
						// 							maxlength:"99", showWordLimit:true, autosize:{ minRows: 2, maxRows: 10 } ,
						// },
						
						// { key:"_id", title:"id", type:"text", width:200 },
						{ key:"money", title:"提现金额", type:"money", width:80 },
						{ key:"to_weixin", title:"收款微信", type:"text", defaultValue:'未设置'},
						{ key:"to_alipay", title:"收款支付宝", type:"text", defaultValue:'未设置' },
						{ key:"to_cardno", title:"收款银行卡号", type:"text" , defaultValue:'未设置'},
						{ key:"mobile", title:"手机号", type:"text", width:120, defaultValue:"--" },
						{ key:"memo", title:"memo", type:"text", defaultValue:"--"
						},
						{ key:"state", title:"提现状态", type:"text", defaultValue:"--"
						},
						{ key:"_add_time_str", title:"操作时间", type:"time", width:160, sortable:"custom" , valueFormat:"yyyy-MM-dd hh:mm:ss"  },
						
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
						// 表单字段显示规则
						columns:[
						  { key:"to_weixin", title:"收款微信", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						  { key:"to_alipay", title:"收款支付宝", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						  { key:"to_cardno", title:"收款银行卡号", type:"text", placeholder:"请输入，微信、支付宝、银行卡 任选一个"},
						  { key:"money", title:"提现金额", type:"money", placeholder:"请输入提现金额，单次最少50，最多200" ,rightText:"元",max:200,min:50},
						  { key:"mobile", title:"手机号", type:"text" },
						  { key:"memo", title:"备注", type:"textarea",
							maxlength:"99", showWordLimit:true, autosize:{ minRows: 2, maxRows: 10 } ,
						  },
						],
						// 表单对应的验证规则
						rules:{
						  mobile:[
							{ validator:vk.pubfn.validator("mobile"), message: '手机号格式错误', trigger: 'blur' }
						  ]
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
			
			
			vk.callFunction({
				url: 'admin/my_tixian/sys/getmoney',
				title: '请求中...',
				data: {
					
				},
				success: (data) => {
					console.log('获取用户信息22 ' , JSON.stringify( data ) )
					if(data.rows && data.rows.length>0){
						let moneyTemp = data.rows[0].money || 0
						this.userMoney = vk.pubfn.priceFilter(moneyTemp)
					}
					
				}
			});
			
			
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
				that.resetForm();
				that.form1.props.action = 'admin/my_tixian/sys/add';
				that.form1.props.formType = 'add';
				that.form1.props.title = '添加';
				that.form1.props.show = true;
			},
			// 显示修改页面
			updateBtn({ item }){
				that.form1.props.action = 'admin/my_tixian/sys/update';
				that.form1.props.formType = 'update';
				that.form1.props.title = '编辑';
				that.form1.props.show = true;
				that.form1.data = item;
			},
			// 删除按钮
			deleteBtn({ item, deleteFn }){
				deleteFn({
					action:"admin/my_tixian/sys/delete",
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
