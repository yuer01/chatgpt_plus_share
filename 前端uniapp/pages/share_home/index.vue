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

		
		<!-- 自定义按钮区域结束 -->

		<!-- 表格组件开始 -->
		<vk-data-table
			ref="table1"
			:action="table1.action"
			:columns="table1.columns"
			:query-form-param="queryForm1"
			:right-btns="['detail_auto']"
			:pagination="true"
			:custom-right-btns="table1.rightBtnsMore"
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
		
		<!-- 统一支付组件 -->
		<uni-pay ref="uniPay" :adpid="adpid" height="70vh" return-url="/pages/order-detail/order-detail" logo="/static/logo.png" @success="onSuccess" @create=""></uni-pay>
		
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
					action:"admin/share_home/sys/getList",
					// 表格字段显示规则
					columns:[
						{ key:"type", title:"类型", type:"text", width:80, sortable:"custom" },
						{ key:"title", title:"标题", type:"text",align:"left",width:280},
						{ key:"username", title:"账号", type:"text", width:120, sortable:"custom" },
						{ key:"end_time", title:"结束日期", type:"time", width:120, sortable:"custom", valueFormat:"yyyy-MM-dd"  },
						{ key:"price", title:"价格(元)", type:"money", width:80, sortable:"custom" },
						{ key:"zudui", title:"组队群", type:"image", width:80 },
						{ key:"xiaoguo", title:"效果", type:"image", show:["detail"]},
						{ key:"create_user_name", title:"创建人", type:"text", width:100, sortable:"custom" },
						
					],
					// 多选框选中的值
					multipleSelection:[],
					// 当前高亮的记录
					selectItem:"",
					rightBtnsMore:[
						{
						  title: '购买',
						  type:"primary",
						  disabled: (item)=>{
							// return item._id == '002'
						  },
						  onClick: (item)=>{
							  this.testPay(item)
							// vk.toast(`${item._id}-按钮1`);
						  }
						}]
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
						{ key:"type", title:"类型", type:"select", width:160, mode:"%%",data:[{
									"label": "ChatGptPlus",
									"value": "ChatGptPlus",
								}, {
									"label": "GPT4",
									"value": "GPT4",
								}, {
									"label": "newBing",
									"value": "newBing",
								}, {
									"label": "文心一言",
									"value": "文心一言",
								}, {
									"label": "科学工具",
									"value": "科学工具",
								}, {
									"label": "其他",
									"value": "其他",
								}] },
						{ key:"title", title:"标题", type:"text", width:160, mode:"%%" },
						{ key:"username", title:"账号", type:"text", width:160, mode:"%%" }
						
						
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
							
							
							{ key:"contact", title:"联系方式", type:"text", placeholder:"请输入手机或者邮箱"},
							
							
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
				
				
				// 下面是支付的参数
				total_fee: 1, // 支付金额，单位分 100 = 1元
				order_no: "", // 业务系统订单号（即你自己业务系统的订单表的订单号）
				out_trade_no: "", // 插件支付单号
				description: "测试订单", // 支付描述
				// type: "test", // 支付回调类型 如 recharge 代表余额充值 goods 代表商品订单（可自定义，任意英文单词都可以，只要你在 uni-pay-co/notify/目录下创建对应的 xxx.js文件进行编写对应的回调逻辑即可）
				//qr_code: true, // 是否强制使用扫码支付
				openid:"", // 微信公众号需要
				custom:{
					a: "a",
					b: 1
				},
				adpid: "1000000001", // uni-ad的广告位id
				
				transaction_id:"", // 查询订单接口的查询条件
				getOrderRes:{}, // 查询订单支付成功后的返回值
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
			
			// 监听 - 批量操作的按钮点击事件
			batchBtn(index){
				switch(index){
					case 1: vk.toast("批量操作按钮1"); break;
					case 2: vk.toast("批量操作按钮2"); break;
					default : break;
				}
			},
			onSuccess(raw){
				console.log('onSuccess',raw)
				// 调用
				vk.navigateTo('/pages/my_order/index');
			},
			testPay(item){
				// 创建订单
				vk.callFunction({
				  url: 'admin/my_order/sys/add',
				  title: '请求中...',
				  data: {
				    acc_id:item._id,
				    from_uid:item.create_user_id,
					_add_time:item._add_time,
				    price:item.price
				  },
				  success: (data) => {
					  console.log('创建订单 ',data)
					  if(data.code !== 0){
						  vk.toast("订单创建失败");
						  return
					  }
					  
				    this.order_no = data.id // 编号就是订单号
				    this.out_trade_no = `${this.order_no}`;
				    // 发起支付
				    this.$refs.uniPay.createOrder({
				    	provider: 'wxpay', // 支付供应商
				    	total_fee: item.price, // 支付金额，单位分 100 = 1元
				    	order_no: this.order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
				    	out_trade_no: this.out_trade_no, // 插件支付单号
				    	description: "大模型试用:"+item.title, // 支付描述
				    	type: "goods", // 支付回调类型
				    	qr_code: true, // 是否强制使用扫码支付
				    	// openid: this.openid, // 微信公众号需要
				    	// custom: this.custom, // 自定义数据
				    });
				  }
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
	.vk-data-table__actions{
	  width: 80px;
	}
</style>
