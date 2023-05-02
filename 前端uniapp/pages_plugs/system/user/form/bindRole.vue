<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		mode="form"
		@open="onOpen"
		@closed="onClose"
	>
		<!-- 页面主体内容开始 -->
		<vk-data-form
			ref="form1"
			:form-type="value.mode"
			v-loading="page.loading"
			v-model="form1.data"
			:rules="form1.props.rules"
			:action="form1.props.action"
			:columns="form1.props.columns"
			:loading.sync="form1.props.loading"
			:labelWidth="form1.props.labelWidth"
			:show-cancel="page.showCancel"
			:cancel-text="page.cancelText"
			:submit-text="page.submitText"
			@success="onFormSuccess"
		>
			<template v-slot:user_id>
				<view style="display: flex;align-items: center;">
					<el-avatar v-if="data.avatar" :src="data.avatar" fit="cover"></el-avatar>
					<text style="margin-left: 10px;">{{ data.nickname }}（ID：{{ data._id }}）</text>
				</view>
			</template>
		</vk-data-form>
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
					item: ""
				};
			}
		}
	},
	data: function() {
		// 组件创建时,进行数据初始化
		return {
			// 页面基础数据
			page: {
				title: "角色绑定",
				submitText: "绑定",
				cancelText: "关闭",
				showCancel: true,
				top: "7vh",
				width:"820px",
				loading: false
			},
			data:{

			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {
					user_id: "",
					roleList: [],
					reset: true
				},
				// 表单属性
				props: {
					// 表单请求地址
					action: "admin/system/user/sys/bindRole",
					// 表单字段显示规则
					columns: [
						{ key:"user_id", title:"用户", type:"text" },
						{
							key: "roleList", title: "角色列表", type: "table-select", placeholder:"选择角色",
							action:"admin/system/role/sys/getList",
							columns:[
								{ key:"role_name", title:"角色昵称", type:"text", nameKey:true },
								{ key:"role_id", title:"角色标识", type:"text", idKey:true },
								{ key:"comment", title:"备注", type:"text" },
							],
							formData:{
								enable:true
							},
							queryColumns:[
								{ key: "role_name", title: "角色昵称", type: "text", width: 150, mode: "%%" },
								{ key: "role_id", title: "角色标识", type: "text", width: 150, mode: "%%" },
								{ key: "enable", type: "text", mode: "=", hidden:true }
							],
							multiple:true,
							pageSize:10, // 只有5和10可以选
						},
					],
					// 表单验证规则
					rules: {
						user_id: [
							{ "required": true, "message": "user_id不能为空", "trigger": "change" }
						]
					},
					// label宽度
					labelWidth:"100px",
					// label对其方式
					labelPosition:"left",
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
			let { value } = that;
			let { role = [], _id } = value.item;
			that.data = value.item;
			that.form1.props.show = true;
			that.form1.data.user_id = _id;
			that.form1.data.roleList = role;
		},
		// 监听 - 页面关闭
		onClose() {
			that.$refs.form1.resetForm(); // 关闭时，重置表单
		},
		// 表单提交成功后
		onFormSuccess() {
			that.$set(that.value.item, "role", that.form1.data.roleList);
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

<style lang="scss" scoped>

</style>
