<template>
	<view class="page-body">
		<image src="../../static/icon/icon-403.svg"></image>
		<view class="title">
			<text class="code">403</text>
			<text class="tips">抱歉，你无权访问该页面</text>
			<text class="tips">{{ errMsg }}</text>
			<text class="btn" @tap="to_index_page">返回首页</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad(query) {
			this.errMsg = query.errMsg || ''
		},
		methods: {
			to_index_page() {
				uni.navigateTo({
					url: "/pages/index/index"
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background-color: #F5F7F9;
	}
	.page-body {
		display: flex;
		padding-top: 250rpx;
		justify-content: center;
		
		.title {
			display: flex;
			flex-direction: column;
			padding-top: 120rpx;
			margin-left: 200rpx;
		}
		.code{
			margin-bottom: 24px;
			color: #515a6e;
			font-weight: 600;
			font-size: 72px;
			line-height: 72px;
		}
		.tips{
			margin-bottom: 16px;
			color: #808695;
			font-size: 20px;
			line-height: 28px;
		}
		.btn{
			display: inline-block;
			color: #fff;
			background-color: #2d8cf0;
			border-color: #2d8cf0;
			width: 200rpx;
			height: 85rpx;
			border-radius: 6rpx;
			text-align: center;
			line-height: 85rpx;
		}
		.btn:hover{
			cursor: pointer;
			background-color: #57a3f3 !important;
		}
	}
</style>
