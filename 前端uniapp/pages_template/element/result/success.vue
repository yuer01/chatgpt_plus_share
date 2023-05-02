<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<i class="el-icon-check"></i>
		<text class="success">提交成功</text>
		<text class="txt">提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。灰色区域可以显示一些补充的信息。</text>
		<text class="examine">已提交申请，等待部门审核。</text>
		<view class="project_list">
			<text>返回列表</text>
			<text>查看项目</text>
			<text>打印</text>
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
				// init请求返回的数据
				data: {

				},
				// 表单请求数据
				form1: {

				}
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
		onReady() {

		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {


		},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {


		},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options) {

			},
			pageTo(path) {
				vk.navigateTo(path);
			}
		},
		// 过滤器
		filters: {

		},
		// 计算属性
		computed: {

		}
	}
</script>
<style lang="scss" scoped>
	page {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.page-body {
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.el-icon-check {
			font-size: 90rpx;
			margin: 50rpx 0rpx;
			color: #FFFFFF;
			background-color: #19BE6B;
			padding: 35rpx;
			border-radius: 50%;
		}

		.success {
			margin-bottom: 32rpx;
			color: #17233d;
			font-weight: 500;
			font-size: 24px;
			line-height: 32px;
		}

		.txt {
			color: #808695;
			font-size: 14px;
			line-height: 22px;
		}

		.examine {
			margin-top: 40rpx;
			background: #f8f8f9;
			border-radius: 8rpx;
			display: inline-block;
			width: 69%;
			height: 140rpx;
			line-height: 140rpx;
			padding-left: 80rpx;
			color: #515a6e;
			font-size: 30rpx;
		}
	}

	.project_list {
		margin-top: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		>text {
			display: inline-block;
			width: 180rpx;
			height: 60rpx;
			border: 2rpx solid transparent;
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
			cursor: pointer;
			border-radius: 8rpx;

			&:first-of-type {
				border-color: #2D8CF0;
				background-color: #2D8CF0;
				color: #FFFFFF;

				&:hover {
					background-color: #57a3f3 !important;
				}
			}


			&:nth-of-type(2) {
				margin: 0rpx 20rpx;
			}

			&:not(:first-of-type) {
				border-color: #DCDEE2;

				&:hover {
					color: #57a3f3 !important;
					border-color: #57a3f3 !important;
				}
			}

		}
	}
</style>
