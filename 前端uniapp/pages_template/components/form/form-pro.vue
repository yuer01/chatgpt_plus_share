<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单"
			subTitle="高级表单"
		></vk-data-page-header>
		<view class="page-body">
			<!-- 页面主体内容开始 -->
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				:loading.sync="form1.props.loading"
				label-width="140px"
				input-width="400px"
				@success="onFormSuccess"
			>
				<!-- v-slot:editor 中的 editor 对应 columns中的 key, form对应 form1.data keyName 对应 columns中的 key -->
				<!-- <template v-slot:editor="{ form, keyName }">
					<vk-data-input-editor v-model="form[keyName]" placeholder="开始输入" width="750px"></vk-data-input-editor>
				</template> -->
			
			</vk-data-form>
			<!-- 页面主体内容结束 -->
		</view>
		
		<view class="page-footer">
			<!-- 页面底部内容开始 -->
			<el-button :loading="form1.props.loading" type="primary" class="footer-update-btn" @click="submitForm">确定</el-button>
			<el-button plain class="footer-back-btn" @click="onCancel" style="margin-left: 30px;">返回</el-button>
			<!-- 页面底部内容开始 -->
		</view>
		
		<view class="tips" style="position: fixed;right: 0px;top:100px;bottom:15px; overflow: auto;max-width: 400px;">
			<view class="json-view" v-if="form1.data">
				<view style="font-size: 14px;">表单数据</view>
				<pre>
					{{ form1.data }}
				</pre>
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
						radio:1,
					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"template/test/sys/test",
						// 表单字段显示规则
						columns:[
							// 基础字段类型
							{ key:"", title:"基础字段", type:"bar-title" },
							{ key:"text", title:"单行文本", type:"text" },
							{
								key:"textarea", title:"多行文本", type:"textarea",
								autosize:{ minRows:4, maxRows:10 },
								maxlength:200,
								showWordLimit:true,
							},
							{ key:"money", title:"money类型", type:"money", tips:"100 = 1元。页面显示的是1，实际的值是100，请看右上角表单数据的值。" },
							{ key:"number", title:"number类型", type:"number", precision:2, tips:"number类型值会转为数字，可以指定小数位数" },
							{ key:"number2", title:"计数器类型", type:"number", controls:true, precision:0, min:5, max:100, placeholder:"请输入数字" },
							{ key:"percentage", title:"百分比类型", type:"percentage", precision:0, tips:"页面显示的是1，实际的值是0.01，请看右上角表单数据的值。" },
							{ key:"discount", title:"折扣类型", type:"discount", tips:"页面显示的是1，实际的值是0.1，请看右上角表单数据的值。" },
							{ key:"text2", title:"文本2", type:"text",prepend:"前置文字",append:"后置文字",prefixIcon:"el-icon-user" },
							// 选择型字段
							{ key:"", title:"选择型字段", type:"bar-title" },
							{
								key:"radio1", title:"radio类型1", type:"radio",
								itemWidth:80,
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"checkbox1", title:"checkbox类型1", type:"checkbox",
								itemWidth:80,
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"radio2", title:"radio类型2", type:"radio",
								border:true,
								itemWidth:80,
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"checkbox2", title:"checkbox类型2", type:"checkbox",
								border:true,
								itemWidth:80,
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"radio3", title:"radio类型3", type:"radio" ,
								optionType:'button',
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"checkbox3", title:"checkbox类型3", type:"checkbox" ,
								optionType:'button',
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"select1", title:"select类型1", type:"select",
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" }
								]
							},
							{
								key:"select2", title:"select类型2", type:"select",
								multiple:true,
								multipleLimit:2,
								data:[
									{ value:1, label:"选项1" },
									{ value:2, label:"选项2" },
									{ value:3, label:"选项3" },
									{ value:4, label:"选项4" }
								]
							},
							{
								key:"select3", title:"select类型3", type:"select",
								group:true,
								data:[
									{
										label: "分组1",
										children:[
											{ value:1, label:"选项1" },
											{ value:2, label:"选项2" }
										]
									},
									{
										label: "分组2",
										children:[
											{ value:3, label:"选项3" },
											{ value:4, label:"选项4" }
										]
									}
								]
							},
							{ key:"province", title:"province类型", type:"province" },
							{ key:"address", title:"address类型", type:"address" },
							{ key:"cascader1", title:"本地数据级联", type:"cascader",
								data:[
									{
										value:1,
										label:"数学",
										children:[
											{
												value:11,
												label:"奥数",
											},
											{
												value:12,
												label:"微积分",
											}
										]
									},
									{
										value:2,
										label:"语文",
										children:[
											{
												value:21,
												label:"文言文",
											},
											{
												value:22,
												label:"古诗",
											}
										]
									},
								]
							},
							{ key:"cascader2", title:"云端数据级联", type:"cascader",
								action:"admin/system/permission/sys/getAll",
								props:{
									list:"rows",
									value:"permission_id",
									label:"label",
									children:"children",
									multiple:true
								}
							},
							{
								key:"cascader3", title:"云端数据级联懒加载", type:"cascader",
								action:"admin/system/menu/sys/getCascader",
								props:{
									list:"rows",
									value:"menu_id",
									label:"label",
									children:"children",
									lazy:true,
								}
							},
							{
								key:"tree1", title:"树形选择(单选)", type:"tree-select", placeholder:"请选择学科",
								data:[
									{
										value:1,
										label:"数学",
										children:[
											{ value:11,label:"奥数" },
											{ value:12,label:"微积分" }
										]
									},
									{
										value:2,
										label:"语文",
										children:[
											{ value:21, label:"文言文" },
											{ value:22, label:"古诗" }
										]
									},
								]
							},
							{
								key:"tree2", title:"树形选择(多选)", type:"tree-select", placeholder:"请选择学科",
								multiple:true, 
								data:[
									{
										value:1,
										label:"数学",
										children:[
											{ value:11,label:"奥数" },
											{ value:12,label:"微积分" }
										]
									},
									{
										value:2,
										label:"语文",
										children:[
											{ value:21, label:"文言文" },
											{ value:22, label:"古诗" }
										]
									},
								]
							},
							{ key:"switch", title:"switch类型", type:"switch" },
							{ key:"rate", title:"评分类型", type:"rate", allowHalf:false },
							{ key:"slider", title:"滑块类型", type:"slider" },
							{ key:"color1", title:"颜色类型1", type:"color" },
							{ key:"color2", title:"颜色类型2", type:"color", showAlpha:true },
							{ key:"icon1", title:"图标1", type:"icon" },
							{ key:"icon2", title:"图标2", type:"icon", filter:"vk-" },
							{ key:"icon3", title:"图标3", type:"icon",
								filter:(name)=>{
									// 不显示vk图标
									return name.indexOf("vk-icon") === 0 ? false : true;
								},
							},
							// 文件上传
							{ key:"", title:"文件上传", type:"bar-title" },
							{
								key:"image1", title:"image类型", type:"image",
								limit:6
							},
							{
								key:"image2", title:"拖拽上传", type:"image",
								limit:6, drag:true,
								fileSize:2,
								sizeUnit:"mb",
								tips:"图片大小限制：小于2M"
							},
							{
								key:"file", title:"文件类型", type:"file",
								limit:6,
								accept:".txt,.xls,.xlsx,.doc,.docx,.ppt,.pptx,.pdf"
							},
							{ key:"image3", title:"从素材库多选图片", type:"file-select", placeholder:"请选择图片", fileType:"image", multiple:true, multipleLimit:5 },
							{ key:"image4", title:"从素材库单选图片", type:"file-select", placeholder:"请选择图片", fileType:"image" },
							{ key:"video1", title:"从素材库单选视频", type:"file-select", placeholder:"请选择视频", fileType:"video" },
							// 日期型字段
							{ key:"", title:"日期型字段", type:"bar-title" },
							{ key:"date", title:"date类型", type:"date", dateType:"date", tips:"可选择年月日" },
							{ key:"dateTime", title:"dataTime类型", type:"date", dateType:"datetime", tips:"可选择年月日时分秒" },
							{ key:"dateArr", title:"date类型范围", type:"date", dateType:"daterange" },
							{ key:"dataTimeArr", title:"dataTime类型范围", type:"date", dateType:"datetimerange" },
							// 时间型字段
							{ key:"", title:"时间型字段", type:"bar-title" },
							{ key:"time1", title:"time类型1", type:"time" },
							{
								key:"time2", title:"time类型2", type:"time",
								valueFormat:"HH:mm",
								pickerOptions:{
									format:"HH:mm"
								}
							},
							{
								key:"time3", title:"time类型3", type:"time", custom:true,
								pickerOptions:{
									start: '08:00',
									step: '01:00',
									end: '24:00'
								}
							},
							{ key:"timeArr1", title:"time类型范围1", type:"time", isRange:true },
							{
								key:"timeArr2", title:"time类型范围2", type:"time", isRange:true,
								valueFormat:"HH:mm",
								pickerOptions:{
									selectableRange: '18:30:00 - 20:30:00',
									format:"HH:mm"
								}
							},
							// 数据库联动字段
							{ key:"", title:"数据库联动字段", type:"bar-title" },
							{
								key:"user_id", title:"用户选择器", type:"remote-select", placeholder:"请输入用户账号/昵称",
								action:"admin/select/kh/user",
							},
							{
								key: "user_id", title: "选择用户", type: "table-select", placeholder:"选择",
								action:"admin/system/user/sys/getList",
								columns:[
									{ key:"nickname", title:"用户昵称", type:"text", nameKey:true },
									{ key:"_id", title:"用户标识", type:"text", idKey:true },
									{ key:"mobile", title:"手机号", type:"text" },
								]
							},
							{
								key: "role1", title: "通过表格选择(单选)", type: "table-select", placeholder:"请选择角色",
								action:"admin/system/role/sys/getList",
								columns:[
									{ key:"role_name", title:"角色昵称", type:"text", nameKey:true },
									{ key:"role_id", title:"角色标识", type:"text", idKey:true }
								],
							},
							{
								key: "role2", title: "通过表格选择(多选)", type: "table-select", placeholder:"请选择角色",
								action:"admin/system/role/sys/getList",
								columns:[
									{ key:"role_name", title:"角色昵称", type:"text", nameKey:true },
									{ key:"role_id", title:"角色标识", type:"text", idKey:true }
								],
								multiple:true
							},
							// 布局
							{ key:"", title:"横向布局", type:"bar-title" },
							{ key:"", title:"", type:"group", justify:"start",
								columns:[
									{ key:"text1", title:"单行文本1", type:"text" },
									{ key:"text2", title:"单行文本2", type:"text" },
									{ key:"text3", title:"单行文本3", type:"text" },
									{ key:"text4", title:"单行文本4", type:"text" },
								]
							},
							{ key:"", title:"", type:"group", justify:"start",
								columns:[
									{ key:"text5", title:"单行文本5", type:"text" },
									{ key:"text6", title:"单行文本6", type:"text" },
									{ key:"text7", title:"单行文本7", type:"text" },
									{ key:"text8", title:"单行文本8", type:"text" },
								]
							},
							// 对象类型
							{ key:"", title:"对象类型", type:"bar-title" },
							{ key:"object1", title:"对象类型1", type:"object",
								columns:[
									{ key:"a", title:"对象内属性a", type:"text" },
									{ key:"b", title:"对象内属性b", type:"text" },
								]
							},
							// 可以通过设置showLabel:false, 隐藏左侧的label
							{ key:"object2", title:"对象类型2", type:"object", showLabel:false,
								columns:[
									{ key:"a", title:"对象内属性a", type:"text" },
									{ key:"b", title:"对象内属性b", type:"text" },
								]
							},
							// 多层嵌套object
							{ key:"object3", title:"对象类型3", type:"object", showLabel:true,
								columns:[
									{ key:"a", title:"对象内属性a", type:"text" },
									{ key:"b", title:"嵌套对象b", type:"object", showLabel:true, 
										columns:[
											{ key:"b1", title:"嵌套对象b内属性b1", type:"text" },
											{ key:"b2", title:"嵌套对象b内属性b2", type:"text" },
										]
									},
								]
							},
							// 特殊类型
							{ key:"", title:"特殊类型", type:"bar-title" },
							{ key:"editor", title:"富文本类型", type:"editor", width:"1000px" },
							{ key:"json", title:"json类型", type:"json" },
							{ key:"position", title:"地图位置", type:"map", width:600, height:300, defaultLocation:{ latitude: 30.224781, longitude: 120.12438 } },
							{ key:"array1", title:"数组字符串类型", type:"array<string>" },
							{ key:"array2", title:"数组数字类型", type:"array<number>" },
							{
								key:"array", title:"数组对象类型", type:"array<object>", itemWidth:260,
								showAdd:true,
								showClear:true,
								showSort:true,
								// 新增一行时,该行的默认值
								defaultValue:{
									select1:1
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
										]
									},
									{ key:"switch", title:"switch类型", type:"switch", width:160 },
								]
							},
							{ key:"goods_tags", title:"商品标签", type:"tag" },
						],
						// 表单验证规则
						rules:{
							text:[
								{ required:true, message:'text不能为空', trigger:'change' }
							],
							money:[
								{ required:true, message:'金额不能为空', trigger:'change' },
								{ type:"number", message:'金额必须是数字', trigger:'change' },
							],
						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show:false,
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
		methods:{
			// 页面数据初始化函数
			init(options){

			},
			// 关闭按钮
			onCancel(){
				console.log("关闭");
				vk.menuTabs.closeCurrent();
			},
			// 表单提交
			submitForm(){
				that.$refs.form1.submitForm();
			},
			// 表单提交成功
			onFormSuccess(){

			}
		},
		// 过滤器
		filters:{

		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>
	.page{

	}
</style>
