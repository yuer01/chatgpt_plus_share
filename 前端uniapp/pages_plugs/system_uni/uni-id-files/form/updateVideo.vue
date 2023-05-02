<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
		mode="form"
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
				title: "编辑视频信息",
				submitText: "确定",
				cancelText: "关闭",
				showCancel: true,
				top: "14vh",
				width: "450px"
			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {},
				// 表单属性
				props: {
					// 表单请求地址
					action: "admin/system_uni/uni-id-files/files/kh/update",
					// 表单字段显示规则
					columns: [
						{ key: "display_name", title: "名称", type: "text" },
						{ key: "cover_image", title: "封面图", type: "image", limit:1 },
					],
					// 表单验证规则
					rules: {
						display_name: [
							{ required: true, message: '名称不能为空', trigger: 'change' },
							{ max: 32, message: '最多32字', trigger: 'change' }
						],
					},
					labelWidth: "60px"
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
			let { item } = that.value;
			that.form1.data = {
				_id: item._id,
				display_name: item.display_name,
				cover_image: item.cover_image
			};
		},
		// 监听 - 页面关闭
		onClose() {
			// that.$refs.form1.resetForm(); // 关闭时，重置表单
		},
		// 监听 - 提交成功后
		onFormSuccess() {
			that.$set(that.value.item,"display_name",that.form1.data.display_name);
			that.$set(that.value.item,"cover_image",that.form1.data.cover_image);
			that.value.show = false; // 关闭页面
			that.$emit("success");
		}
	},
	watch: {
		"value.show": {
			handler(newValue, oldValue) {
				let that = this;
				if (newValue) {
					that.onOpen();
				} else {
					that.onClose();
				}
			}
		}
	},
	// 过滤器
	filters: {},
	// 计算属性
	computed: {}
};
</script>

<style lang="scss" scoped></style>
