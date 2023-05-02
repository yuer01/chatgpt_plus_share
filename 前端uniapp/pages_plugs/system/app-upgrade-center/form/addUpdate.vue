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
var pageName = "";
var vk = uni.vk; // vk实例
var originalForms = {};						// 表单初始化数据
var defaultFormData = {
	appid:"",
	name:"",
	title:"",
	contents:"",
	platform:[],
	platformRadio:"",
	type:"",
	version:"",
	min_uni_version:"",
	url:"",
	stable_publish:false,
	is_silently:false,
	is_mandatory:false,
	create_env:"upgrade-center",
	store_list:[],
};
export default {
	props: {
		value: {
			Type: Object,
			default: function() {
				return {
					show: false,
					mode: "",
					item: {
						stable_publish:""
					},
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
				showCancel: true,
				top: "2vh",
				width: "900px"
			},
			form1:{
				// 表单请求数据，此处可以设置默认值
				data: defaultFormData,
				// 表单属性
				props: {
					// 表单请求地址
					action:"",
					// 表单字段显示规则
					columns:[
						{ key: "appid", title: "AppID", type: "text", disabled:true },
						{ key: "name", title: "应用名称", type: "text", disabled:true },
						{ key: "title", title: "更新标题", type: "text" },
						{
							key:"contents", title:"更新内容", type:"textarea",
							autosize:{ minRows:4, maxRows:10 },
							maxlength:2000,
							showWordLimit:true,
						},
						{
							key:"platformRadio", title:"平台", type:"radio",
							itemWidth:80,
							data:[
								{ value:"Android", label:"安卓" },
								{ value:"iOS", label:"苹果" }
							],
							showRule:"type==native_app",
							disabled:["update"]
						},
						{
							key:"platform", title:"平台", type:"checkbox",
							itemWidth:80,
							data:[
								{ value:"Android", label:"安卓" },
								{ value:"iOS", label:"苹果" }
							],
							showRule:"type==wgt",
							disabled:["update"]
						},
						{ key: "version", title: "版本号", type: "text", tips:"必须大于当前线上发行的版本号", disabled:["update"] },
						{ key: "min_uni_version", title: "原生App最低版本", type: "text", showRule:"type==wgt" },
						{ key: "url", title: "AppStore", type: "text",
							showRule:(formData)=>{
								return formData.platformRadio === "iOS" && formData.type === "native_app";
							}
						},
						{ key:"apk", title:"上传apk包", type:"file", limit:1, accept:".apk",
							showRule:(formData)=>{
								return formData.platformRadio === "Android" && formData.type === "native_app";
							},
							watch: ({ value, formData, column, index, $set }) => {
								$set("url", value);
							},
							tips:"上传apk包到当前服务空间的云存储中，上传成功后，会自动使用云存储地址填充下载链接"
						},
						{ key:"wgt", title:"上传wgt包", type:"file", limit:1, accept:".wgt",
							showRule:(formData)=>{
								return formData.type === "wgt";
							},
							watch: ({ value, formData, column, index, $set }) => {
								$set("url", value);
							},
							tips:"上传wgt包到当前服务空间的云存储中，上传成功后，会自动使用云存储地址填充下载链接"
						},
						{ key: "url", title: "下载链接", type: "text",
							showRule:(formData)=>{
								return formData.platformRadio === "Android" || formData.type === "wgt";
							}
						},
						{
							key:"store_list", title:"Android应用市场", type:"array<object>",
							showRule:(formData)=>{
								return formData.platformRadio === "Android" && formData.type === "native_app" && formData.store_list && formData.store_list.length>0 ? true : false;
							},
							rowKey:"id",
							showAdd:false,
							showClear:false,
							showSort:true,
							// 新增一行时,该行的默认值
							defaultValue:{

							},
							rightBtns:['delete'],
							// 每行每个字段对应的渲染规则
							columns:[
								{ key:"enable", title:"是否启用", type:"switch", width:80 },
								{
									key:"name", title:"商店名称", type:"text", minWidth:180,
									disabled: true
								},
								{
									key:"scheme", title:"Scheme", type:"text", minWidth:280,
									disabled: true
								},
							]
						},
						{ key:"is_silently", title:"静默更新", type:"switch", activeValue:true, inactiveValue:false, showRule:"type==wgt" },
						{ key:"is_mandatory", title:"强制更新", type:"switch", activeValue:true, inactiveValue:false },
						{ key:"stable_publish", title:"上线发行", type:"switch", activeValue:true, inactiveValue:false,
							disabled: (formData)=>{
								return this.value.item.stable_publish && this.value.mode === "update";
							}
						}
					],
					// 表单验证规则
					rules:{
						appid: [
							// 必填
							{ required: true, message: "appid不能为空", trigger: ['blur','change'] }
						],
						contents: [
							// 必填
							{ required: true, message: "更新内容不能为空", trigger: ['blur','change'] }
						],
						platform: [
							// 必填
							{ required: true, message: "平台不能为空", trigger: ['blur','change'] }
						],
						platformRadio: [
							// 必填
							{ required: true, message: "平台不能为空", trigger: ['blur','change'] }
						],
						version: [
							// 必填
							{ required: true, message: "版本号不能为空", trigger: ['blur','change'] },
							{ validator: vk.pubfn.validator("version"),  message: '版本号格式必须为：xx.xx.xx（3个数字组成，数字范围1-99,0-99,0-99） 如1.0.1 不可以是1.0.01', trigger: 'blur' }
						],
						min_uni_version: [
							// 必填
							{ required: true, message: "最低版本号不能为空", trigger: ['blur','change'] },
							{ validator: vk.pubfn.validator("version"),  message: '版本号格式必须为：xx.xx.xx（3个数字组成，数字范围1-99,0-99,0-99） 如1.0.1 不可以是1.0.01', trigger: 'blur' }
						],
						url: [
							// 必填
							{ required: true, message: "链接不能为空", trigger: ['blur','change'] }
						],
					},
					// add 代表添加 update 代表修改
					formType:"",
					// 左侧label的宽度
					labelWidth: "140px",
				}
			},
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
				this.form1.props.action = "admin/system/app-upgrade-center/sys/addUpdate";
				this.page.title = pageName + "修改";
				this.page.submitText = "修改";
				if (item.type === "native_app") {
					item.platformRadio = item.platform[0];
				}
				this.form1.data = vk.pubfn.objectAssign(vk.pubfn.copyObject(defaultFormData), vk.pubfn.copyObject(item));
			}else{
				this.form1.props.action = "admin/system/app-upgrade-center/sys/addUpdate";
				this.page.title = pageName + "添加";
				this.page.submitText = "添加";
				this.form1.data = vk.pubfn.objectAssign(vk.pubfn.copyObject(defaultFormData), vk.pubfn.copyObject(item));
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
