<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
		:show-fullscreen="false"
		:show-header="false"
		:destroy-on-close="true"
		mode="form"
	>
		<!-- 页面主体内容开始 -->
		<image v-if="value.item.type === 'image'" :src="value.item.url" mode="widthFix" style="width: 100%;display: block;"></image>
		<view v-else-if="value.item.type === 'video' && value.show" :style="styleCom" style="margin: auto;">
			<video :src="value.item.url" autoplay object-fit="cover" style="width: 100%;height: 100%;display: block;"></video>
		</view>
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
				title: "预览",
				submitText: "确定",
				cancelText: "关闭",
				showCancel: true,
				top: "2vh",
				width: "600px"
			},
			styleCom:{}
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
			let { width, height=700, type } = item;
			//if(type === "video"){
				let showWidth = width;
				let showHeight = height;
				let maxHeight = 700;
				if(height > maxHeight){
					showHeight = maxHeight;
					showWidth = width / height * maxHeight;
				}
				that.styleCom = {
					width : `${showWidth}px`,
					height : `${showHeight}px`
				};
				that.page.width = that.styleCom.width;
				that.$set(that.value.item,"play",true);
			//}
		},
		// 监听 - 页面关闭
		onClose() {
			that.$set(that.value.item,"play",false);
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
