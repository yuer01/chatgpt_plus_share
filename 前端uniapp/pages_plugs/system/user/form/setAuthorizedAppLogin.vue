<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
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
			:before-action="form1.props.beforeAction"
			:show-cancel="page.showCancel"
			:cancel-text="page.cancelText"
			:submit-text="page.submitText"
			@success="onFormSuccess"
		></vk-data-form>
		<!-- 页面主体内容结束 -->
	</vk-data-dialog>
</template>

<script>
var that; // 当前页面对象
var vk = uni.vk; // vk实例
export default {
	props: {
		value: {
			Type: Object,
			default: function() {
				return {
					show: false,
					mode: "",
					item: {}
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
				top: "7vh",
				width: "800px"
			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {
					login_appid_type:1,
					mode:1
				},
				// 表单属性
				props: {
					// 表单请求地址
					action: "admin/system/user/sys/batchUpdateAppLogin",
					// 表单字段显示规则
					columns: [
						{
						  key:"login_appid_type", title:"登录权限", type:"radio",
						  optionType:"button",
							data:[
								{ value:1, label:"部分应用" },
								{ value:0, label:"全部应用" }
						  ]
						},
						{
						  key:"mode", title:"模式", type:"radio",
						  optionType:"button",
							data:[
								{ value:1, label:"覆盖" },
								{ value:2, label:"新增" },
								{ value:3, label:"移除" }
						  ],
							showRule:"login_appid_type=1",
						},
						{
						  key:"dcloud_appid", title:"可登录的应用", type:"checkbox",
						  border:true,
						  itemWidth:100,
							data:[],
						  props:{ value:"appid", label:"name" },
							showRule:"login_appid_type=1&&mode=1"
						},
						{
						  key:"dcloud_appid", title:"可登录的应用", type:"radio",
						  border:true,
						  itemWidth:100,
							data:[],
						  props:{ value:"appid", label:"name" },
							showRule:"login_appid_type=1&&mode!=1"
						},
					],
					// 表单验证规则
					rules: {

					},
					// 左侧label的宽度
					labelWidth: "100px",
					// 提交前执行
					beforeAction:function(formData){
						let allow_login_background = false;
						if(!formData.login_appid_type){
							allow_login_background = true;
						}else{
							if(typeof formData.dcloud_appid === "object"){
								formData.dcloud_appid.map((appid, index) => {
									let item = vk.pubfn.getListItem(that.value.item.dcloudAppidData, "appid", appid);
									if(item.type === "admin"){
										allow_login_background = true;
									}
								});
							}else{
								let item = vk.pubfn.getListItem(that.value.item.dcloudAppidData, "appid", formData.dcloud_appid);
								if(item.type === "admin"){
									allow_login_background = true;
								}
							}

						}
						formData.user_ids = that.value.item.user_ids;
						formData.allow_login_background = allow_login_background;
						return formData;
					}
				}
			}
		};
	},
	mounted() {
		that = this;
		that.init();
	},
	methods: {
		// 初始化
		init() {
			let { value } = that;
			that.$emit("input", value);
		},
		// 监听 - 页面打开
		onOpen() {
			that = this;
			let { item={} } = that.value;
			// 每次打开时，重新设置表单的值 = value.item 的值，item通过 vk.pubfn.openForm('表单名',{ item:{ _id:"1" } }) 传递值
			that.form1.props.columns[2].data = item.dcloudAppidData;
			that.form1.props.columns[3].data = item.dcloudAppidData;
		},
		// 监听 - 页面关闭
		onClose() {
			//that.$refs.form1.resetForm(); // 关闭时，重置表单
		},
		// 监听 - 提交成功后
		onFormSuccess() {
			that.value.show = false; // 关闭页面
			that.$emit("success");
		}
	},
	// 监听属性
	watch: {
		
	},
	// 计算属性
	computed: {}
};
</script>

<style lang="scss" scoped></style>
