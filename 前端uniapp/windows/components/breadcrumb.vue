<template>
	<view class="mini-none">
		<view style="display: flex;">
			<view
				v-for="(item, index) in vk.getVuex('$app.menuMap')"
				:key="index"
				@click="pageTo(item)"
				class="top-bar"
			>
				<view class="item-content" v-if="item.name">
					{{ item.name }}
					<text v-if="index !== vk.getVuex('$app.menuMap').length - 1" class="item-content-text">
						/
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {},
	data: function() {
		// 组件创建时,进行数据初始化
		return {};
	},
	mounted() {},
	methods: {
		pageTo(item={}){
			let { vk } = this;
			if(item.url){
				vk.navigateTo(item.url);
			}
		}
	},
	watch: {},
	// 过滤器
	filters: {},
	// 计算属性
	computed: {}
};
</script>

<style lang="scss" scoped>
.top-bar {
	margin-left: 10px;
	cursor: pointer;
}
.top-bar:first-child {
	margin-left: 0px;
}
.item-content {
	color: #606266;
}
.item-content:hover {
	color: #409eff;
}
.item-content-text {
	margin-left: 10px;
	color: #a3a9a9;
	font-weight: bold;
}
</style>
