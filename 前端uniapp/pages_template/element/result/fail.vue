<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<i class="el-icon-close"></i>
		<text class="fail">提交失败</text>
		<text class="txt">请核对并修改以下信息后，再重新提交。</text>
		<view class="examine">
			<text class="title">您提交的内容有如下错误：</text>
			<view>
				<i class="el-icon-circle-close"></i>
				<text>您的账户已被冻结</text>
				<text class="thaw">立即解冻</text>
				<i class="el-icon-arrow-right"></i>
			</view>
			<view>
				<i class="el-icon-circle-close"></i>
				<text>您的账户还不具备申请资格</text>
				<text class="upgrade">立即升级</text>
				<i class="el-icon-arrow-right"></i>
			</view>
		</view>
		<text class="modify">返回修改</text>
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

		.el-icon-close {
			font-size: 90rpx;
			margin: 50rpx 0rpx;
			color: #FFFFFF;
			background-color: #ED4014;
			padding: 35rpx;
			border-radius: 50%;
		}

		.fail {
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
			width: 69%;
			padding: 40rpx 60rpx;
			color: #515a6e;
			font-size: 28rpx;
			display: flex;
			flex-direction: column;

			view {
				&:first-of-type {
					margin: 40rpx 0rpx;
				}
			}
		}
	}

	.modify {
		margin-top: 80rpx;
		display: inline-block;
		width: 180rpx;
		height: 60rpx;
		line-height: 60rpx;
		border: 2rpx solid #2D8CF0;
		text-align: center;
		font-size: 28rpx;
		cursor: pointer;
		border-radius: 8rpx;
		background-color: #2D8CF0;
		color: #FFFFFF;

		&:hover {
			background-color: #57a3f3 !important;
		}
	}

	.el-icon-circle-close {
		color: #ED4014;
		margin-right: 10rpx;
	}

	.upgrade,
	.thaw {
		color: #2D8CF0;
		margin: 0rpx 20rpx 0rpx 40rpx;

		&:hover {
			color: #57a3f3;
			cursor: pointer;
		}
	}

	.el-icon-arrow-right {
		color: #515a6e;
	}
</style>
