<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单"
			subTitle="子表单"
		></vk-data-page-header>
		<view class="page-body" style="max-width: 1600px;margin: 0 auto;">
			<vk-data-form
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				:loading.sync="form1.props.loading"
				label-width="140px"
				@cancel="onCancel"
				@success="onFormSuccess"
			></vk-data-form>

			<view class="tips mt15">
				<view class="mt15 json-view" v-if="form1.data">
					<view style="font-size: 14px;">表单数据</view>
					<pre>
						{{ form1.data }}
					</pre>
				</view>
			</view>

		</view>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	export default {
		data() {
			// 页面数据变量
			return {
				// 表单相关开始-----------------------------------------------------------
				form1: {
					// 表单请求数据，此处可以设置默认值
					data: {

					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"template/test/sys/test",
						// 表单字段显示规则
						columns:[
							{ key:"", title:"数组对象", type:"bar-title" },
							{
								key:"array1", title:"数组<对象>类型", type:"array<object>", itemWidth:260,
								showAdd:true,
								showClear:true,
								showSort:true,
								// 新增一行时,该行的默认值
								defaultValue:{
									switch:true,
									text1:""
								},
								rightBtns:['copy','delete'],
								// 每行每个字段对应的渲染规则
								columns:[
									{
										key:"text1", title:"昵称", type:"text",
										isUnique:true,
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
											{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ["change","blur"] }
										]
									},
									{
										key:"number1", title:"数字", type:"number",
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{
										key:"select1", title:"select类型", type:"select",
										data:[
											{ value:1, label:"选项1" },
											{ value:2, label:"选项2" }
										],
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										],
										onChange:function(val, row, column, index){
											// 此处演示根据选择的值动态改变text1的值,注意,此处text1必须要有默认值,即使是空字符串也行.
											row.text1 = "昵称" + val;
										}
									},
									{ key:"switch", title:"switch类型", type:"switch", width:160 },
								]
							},
							{ key:"", title:"递增递减", type:"bar-title" },
							{
								key:"array2", title:"数组<对象>类型", type:"array<object>", itemWidth:260,
								showAdd:true,
								showClear:true,
								showSort:true,
								// 新增一行时,该行的默认值
								defaultValue:{
									switch:true,
									text1:""
								},
								rightBtns:['copy','delete'],
								// 每行每个字段对应的渲染规则
								columns:[
									{
										key:"number1", title:"递增[>]", type:"number", placeholder:"输入数字",
										incMode: 1, // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{
										key:"number2", title:"递增[>=]", type:"number", placeholder:"输入数字",
										incMode: 2, // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{
										key:"number3", title:"递减[<]", type:"number", placeholder:"输入数字",
										incMode: -1, // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{
										key:"number4", title:"递减[<=]", type:"number", placeholder:"输入数字",
										incMode: -2, // 1必须递增[>] 2 必须递增[>=] -1 必须递减[<]  -2 必须递减[<=]
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
								]
							},
							{ key:"", title:"数组嵌套数组", type:"bar-title" },
							{
								key:"array3", title:"数组<对象>类型", type:"array<object>", itemWidth:260,
								showAdd:true,
								showClear:true,
								showSort:true,
								// 新增一行时,该行的默认值
								defaultValue:{
									switch:true,
									array:[]
								},
								rightBtns:['copy','delete'],
								// 每行每个字段对应的渲染规则
								columns:[
									{
										key:"text1", title:"昵称", type:"text",
										isUnique:true,
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{
										key:"number1", title:"数字", type:"number",
										rules:[
											{ required:true, message:"该项不能为空", trigger:["change","blur"] },
										]
									},
									{ key:"switch", title:"switch类型", type:"switch", width:160 },
									{
										key:"array", title:"数组<对象>类型", type:"array<object>", buttonText: "设置", dialog:true, width:140, dialogWidth:1000,
										showAdd:true,
										showClear:true,
										showSort:true,
										// 新增一行时,该行的默认值
										defaultValue:{
							
										},
										rightBtns:['delete'],
										// 每行每个字段对应的渲染规则
										columns:[
											{
												key:"text1", title:"昵称", type:"text", minWidth:160,
												isUnique:true,
												rules:[
													{ required:true, message:"该项不能为空", trigger:["change","blur"] },
												]
											},
											{
												key:"number1", title:"数字", type:"number", minWidth:160,
												rules:[
													{ required:true, message:"该项不能为空", trigger:["change","blur"] },
												]
											}
										]
									},
								]
							},
							
							{ key:"", title:"下方为纯字符串或纯数字类型数组", type:"bar-title" },
							{ key:"stringArray", title:"数组<字符串>类型", type:"array<string>", placeholder:"请输入字符串", width:400,
								isUnique:true,
								rules:[
									{ required:true, message:"该项不能为空", trigger:["change","blur"] },
								]
							},
							{
								key:"numberArray", title:"数组<数字>类型", type:"array<number>", placeholder:"请输入数字", width:400,
								rules:[
									{ required:true, message:"该项不能为空", trigger:["change","blur"] },
								]
							},
						],
						// 表单验证规则
						rules: {

						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show: false,
						// 表单是否在请求中
						loading:false
					}
				},
				// 表单相关结束-----------------------------------------------------------

			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady(){

		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {


		},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {


		},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options){

			},
			onCancel(){
				console.log("关闭");
				vk.menuTabs.closeCurrent();
			},
			onFormSuccess(){
				console.log("表单提交成功");
			}
		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>

</style>
