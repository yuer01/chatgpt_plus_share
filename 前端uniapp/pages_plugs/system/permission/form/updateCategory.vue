<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
		@open="onOpen"
		@closed="onClose"
	>
		<vk-data-input-radio
		  v-model="form1.curd_category"
		  :localdata="localdata"
			option-type="button"
			@change="onChange"
		></vk-data-input-radio>
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
				title: "修改权限分类",
				top: "20vh",
				width: "460px"
			},
			form1:{
				_id:"",
			},
			localdata:[
				{ value:1, label:"增加", tagType:"success" },
				{ value:2, label:"删除", tagType:"danger" },
				{ value:3, label:"修改", tagType:"" },
				{ value:4, label:"查询", tagType:"info" },
				{ value:5, label:"特殊", tagType:"warning" },
				{ value:0, label:"其他", tagType:"warning" },
			],
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
			that.form1 = {
				_id: item._id,
				curd_category: item.curd_category
			}
		},
		// 监听 - 页面关闭
		onClose() {
			//that.$refs.form1.resetForm(); // 关闭时，重置表单
		},
		onChange(value){
			vk.callFunction({
				url: 'admin/system/permission/sys/updateCategory',
				title:'请求中...',
				data:that.form1,
				success:function(data){
					that.$set(that.value.item,"curd_category",value);
					that.value.show = false; // 关闭页面
					that.$emit("success");
				}
			});
		},
	},
	// 监听属性
	watch: {
		
	},
	// 计算属性
	computed: {}
};
</script>

<style lang="scss" scoped></style>
