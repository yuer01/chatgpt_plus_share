<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
		:destroy-on-close="true"
		mode="form"
		@open="onOpen"
		@closed="onClose"
	>
		<!-- 页面主体内容开始 -->
		<vk-data-form
			ref="form1"
			v-model="form1.data"
			:form-type="value.mode"
			:rules="form1.props.rules"
			:action="form1.props.action"
			:columns="form1.props.columns"
			:loading.sync="form1.props.loading"
			:labelWidth="form1.props.labelWidth"
			:show-cancel="page.showCancel"
			:cancel-text="page.cancelText"
			:submit-text="page.submitText"
			@success="onFormSuccess"
		></vk-data-form>
		<!-- 页面主体内容结束 -->
	</vk-data-dialog>
</template>

<script>
var pageName = "应用";
var vk = uni.vk; // vk实例
var originalForms = {};						// 表单初始化数据
export default {
	props: {
		value: {
			Type: Object,
			default: function() {
				return {
					show: false,
					mode: "",
					item: {},
					options:{}
				};
			}
		}
	},
	data: function() {
		// 组件创建时,进行数据初始化
		return {
			page: {
				title: "标题",
				submitText: "确定",
				cancelText: "关闭",
				showCancel: false,
				top: "1vh",
				width: "1200px"
			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {
					name:"",
					enable_upgrade_center:false,
					app_ios:{
						enable:false
					}
				},
				// 表单属性
				props: {
					// 表单请求地址
					action:"",
					// 表单字段显示规则
					columns:[
						{ key:"", title:"基础信息", type:"bar-title" },
						{ key:"appid", title:"AppID", type:"text" },
						{
							key:"type", title:"应用类型", type:"cascader",
							data:[
								{
									value:"1000",
									label: "用户端",
									children:[
										{
											value:"1001",
											label: "通用",
											children:[
												{ value:"client", label:"用户端" },
											]
										},
										{
											value:"1002",
											label: "商家",
											children:[
												{ value:"rider", label:"骑手端" },
												{ value:"business", label:"商家端" },
											]
										},
										{
											value:"1003",
											label: "教育",
											children:[
												{ value:"student", label:"学生端" },
												{ value:"parent", label:"家长端" },
												{ value:"teacher", label:"教师端" },
											]
										},
										{
											value:"1999",
											label: "其他",
											children:[
												{ value:"other", label:"其他" },
											]
										}
									]
								},
								{
									value:"2000",
									label: "管理端",
									children:[
										{
											value:"2001",
											label: "通用",
											children:[
												{ value:"admin", label:"管理端" },
											]
										},
										{
											value:"2002",
											label: "商家",
											children:[
												{ value:"rider-admin", label:"骑手管理端" },
												{ value:"business-admin", label:"商家管理端" },
											]
										},
										{
											value:"2003",
											label: "教育",
											children:[
												{ value:"student-admin", label:"学生管理端" },
												{ value:"parent-admin", label:"家长管理端" },
												{ value:"teacher-admin", label:"教师管理端" },
											]
										},
										{
											value:"2999",
											label: "其他",
											children:[
												{ value:"other-admin", label:"其他管理端" },
											]
										}
									],
								}
							],
							props:{
								expandTrigger:"hover",
								emitPath:false,
							},
							onChange:(val, formData, column, index, option) => {
								this.form1.data.name = option.label;
							}
						},
						{ key:"name", title:"应用名称", type:"text",
							watch: ({ value, formData, column, index, $set }) => {
								// 此处演示根据选择的值动态改变text1的值
								let arr = [
									"app_ios",
									"app_android",
									"mp_weixin",
									"mp_alipay",
									"mp_baidu",
									"mp_toutiao",
									"mp_qq",
									"mp_kuaishou",
									"mp_lark",
									"mp_jd",
									"mp_dingtalk",
									"quickapp",
								];
								arr.map((item, index) => {
									this.$set(this.form1.data[item],"name", value);
								});
							}
						},
						{ key:"introduction", title:"应用简介", type:"text", tips:"一句话描述您的应用的用途" },
						{
							key:"description", title:"应用描述", type:"textarea", placeholder:"更详细的应用描述",
							autosize:{ minRows:4, maxRows:10 },
							maxlength:200,
							showWordLimit:true,
						},
						{ key:"", title:"App升级中心", type:"bar-title" },
						{ key:"enable_upgrade_center", title:"是否开启", type:"switch", activeValue:true, inactiveValue:false, tips:"下面的信息为制作统一发布页和APP升级中心所需，若你未用到，则只填上面的基础信息即可。" },
						{ key:"", title:"图标素材", type:"bar-title", showRule:"enable_upgrade_center==true" },
						{ key:"icon_url", title:"应用图标", type:"image", limit:1, tips:"建议尺寸：600*600", showRule:"enable_upgrade_center==true" },
						{ key:"screenshot", title:"应用截图", type:"image", limit:9, tips:"最多9张，建议尺寸：800*1380", showRule:"enable_upgrade_center==true" },
						{ key:"", title:"H5信息", type:"bar-title", showRule:"enable_upgrade_center==true" },
						{ key:"h5", title:"链接地址", type:"object", showLabel:false,
							columns:[
								{ key:"url", title:"链接地址", type:"text", tips:"您的h5首页访问地址" },
							],
							showRule:"enable_upgrade_center==true"
						},
						{ key:"", title:"App信息", type:"bar-title",showRule:"enable_upgrade_center==true" },
						{ key:"app_ios", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"IOS", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text", tips:"IOS应用的名称",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"app_ios.enable",false);
									}
								},
								{ key:"url", title:"AppStore", type:"text", tips:"AppStore商店的下载链接地址",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"app_ios.enable",false);
									}
								},
							]
						},
						{ key:"app_android", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"Android", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text", tips:"安卓应用的名称",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"app_android.enable",false);
									}
								},
								{ key:"apk", title:"上传apk包", type:"file", limit:1, accept:".apk",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"app_android.enable",false);
									},
									watch: ({ value, formData, column, index, $set }) => {
										$set("url", value);
									},
									tips:"上传apk到当前服务空间的云存储中，上传成功后，会自动使用云存储地址填充下载链接"
								},
								{ key:"url", title:"下载链接", type:"text", tips:"安卓应用apk的下载地址",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"app_android.enable",false);
									}
								},
							]
						},
						{
							key:"store_list", title:"Android应用市场", type:"array<object>",
							tips:`<a href="https://ask.dcloud.net.cn/article/39960" target="_blank">常见应用商店schema汇总</a>`,
							showRule:(form)=>{
								return vk.pubfn.getData(form,"app_android.enable",false) && form.enable_upgrade_center ? true : false;
							},
							rowKey:"id",
							showAdd:true,
							showClear:false,
							showSort:true,
							// 新增一行时,该行的默认值
							defaultValue:{
								enable:true
							},
							rightBtns:['delete'],
							// 每行每个字段对应的渲染规则
							columns:[
								{
									key:"scheme_select", title:"选择已知商店", type:"select", width:120,
									data:[
										{ value:"tmast://appdetails?r=XXX&pname=xxx", label:"应用宝" },
										{ value:"mimarket://details?id=com.xx.xx", label:"小米" },
										{ value:"samsungapps://ProductDetail/com.xx.xx", label:"三星" },
										{ value:"appmarket://details?id=com.xx.xx", label:"华为" },
										{ value:"oppomarket://details?packagename=com.xx.xx", label:"oppo" },
										{ value:"vivomarket://details?id=com.xx.xx", label:"vivo" },
									],
									watch: ({ value, formData, column, index, $set }) => {
										let item = vk.pubfn.getListItem(column.data, "value", value) || {};
										let { label="" } = item;
										$set("scheme", value);
										$set("name", label);
									}
								},
								{
									key:"name", title:"商店名称", type:"text", minWidth:180,
									isUnique:true,
									rules:[
										{ required:true, message:"该项不能为空", trigger:["change","blur"] }
									]
								},
								{
									key:"scheme", title:"Scheme", type:"text", minWidth:280,
									rules:[
										{ required:true, message:"该项不能为空", trigger:["change","blur"] },
									]
								},
								{ key:"enable", title:"是否启用", type:"switch", width:80 },
							]
						},
						{ key:"", title:"小程序/快应用信息", type:"bar-title", showRule:"enable_upgrade_center==true" },
						{ key:"mp_weixin", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"微信小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_weixin.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_weixin.enable",false);
									}
								},
							]
						},
						{ key:"mp_alipay", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"支付宝小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_alipay.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_alipay.enable",false);
									}
								},
							]
						},
						{ key:"mp_baidu", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"百度小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_baidu.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_baidu.enable",false);
									}
								},
							]
						},
						{ key:"mp_toutiao", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"头条小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_toutiao.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_toutiao.enable",false);
									}
								},
							]
						},
						{ key:"mp_qq", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"QQ小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_qq.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_qq.enable",false);
									}
								},
							]
						},
						{ key:"mp_kuaishou", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"快手小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_kuaishou.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_kuaishou.enable",false);
									}
								},
							]
						},
						{ key:"mp_lark", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"飞书小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_lark.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_lark.enable",false);
									}
								},
							]
						},
						{ key:"mp_jd", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"京东小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_jd.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_jd.enable",false);
									}
								},
							]
						},
						{ key:"mp_dingtalk", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"钉钉小程序", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_dingtalk.enable",false);
									}
								},
								{ key:"qrcode_url", title:"小程序码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"mp_dingtalk.enable",false);
									}
								},
							]
						},
						{ key:"quickapp", title:"", type:"object", showLabel:false, showRule:"enable_upgrade_center==true",
							columns:[
								{ key:"enable", title:"快应用", type:"switch", activeValue:true, inactiveValue:false },
								{ key:"name", title:"名称", type:"text",
									showRule:(form)=>{
										return vk.pubfn.getData(form,"quickapp.enable",false);
									}
								},
								{ key:"qrcode_url", title:"快应用码", type:"image", limit:1,
									showRule:(form)=>{
										return vk.pubfn.getData(form,"quickapp.enable",false);
									}
								},
							]
						},
					],
					// 表单验证规则
					rules:{
						appid: [
							{ required: true, message: '应用的AppID为必填字段', trigger: 'blur' },
						],
						name: [
							{ required: true, message: '应用名称为必填字段', trigger: 'blur' }
						],
						type: [
							{ required: true, message: '应用类型为必填字段', trigger: 'blur' }
						]
					},
					// 左侧label的宽度
					labelWidth: "140px",
				}
			}
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化
		init() {
			let { value } = this;
			this.$emit("input", value);
			originalForms["form1"] = vk.pubfn.copyObject(this.form1);
		},
		// 监听 - 页面打开
		onOpen() {
			let { value={} } = this;
			let { item={} } = value;
			// 每次打开时，重新设置表单的值 = value.item 的值，item通过 vk.pubfn.openForm('表单名',{ item:{ _id:"1" } }) 传递值
			if(value.mode === "update"){
				this.form1.props.action = "admin/system/app/sys/update";
				this.page.title = pageName + "修改";
				this.page.submitText = "修改";
				this.form1.data = vk.pubfn.copyObject(item);
			}else{
				this.form1.props.action = "admin/system/app/sys/add";
				this.page.title = pageName + "添加";
				this.page.submitText = "添加";
			}
		},
		// 监听 - 页面关闭
		onClose() {
			this.resetForm();
		},
		// 监听 - 提交成功后
		onFormSuccess() {
			this.value.show = false; // 关闭页面
			this.$emit("success");
		},
		// 表单重置
		resetForm(){
			vk.pubfn.resetForm(originalForms, this);
		},
	},
	watch: {

	},
	// 计算属性
	computed: {

	}
};
</script>

<style lang="scss" scoped></style>
