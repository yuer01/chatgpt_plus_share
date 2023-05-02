<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			文字提示功能演示
		</div>

		<!-- 基本用法 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">

				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					基础用法:
				</div>

				<div class="box">
					<div class="top">
						<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
							<el-button>上左</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
							<el-button>上边</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
							<el-button>上右</el-button>
						</el-tooltip>
					</div>
					<div class="left">
						<el-tooltip class="item" effect="dark" content="Left Top 提示文字" placement="left-start">
							<el-button>左上</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Left Center 提示文字" placement="left">
							<el-button>左边</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
							<el-button>左下</el-button>
						</el-tooltip>
					</div>

					<div class="right">
						<el-tooltip class="item" effect="dark" content="Right Top 提示文字" placement="right-start">
							<el-button>右上</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
							<el-button>右边</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
							<el-button>右下</el-button>
						</el-tooltip>
					</div>
					<div class="bottom">
						<el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
							<el-button>下左</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
							<el-button>下边</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
							<el-button>下右</el-button>
						</el-tooltip>
					</div>
				</div>
			</el-col>
		</el-row>

		<!-- 设置主题功能 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx; margin-top:-40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					设置主题:
				</div>
				<el-tooltip content="Top center" placement="top">
					<el-button>Dark</el-button>
				</el-tooltip>
				<el-tooltip content="Bottom center" placement="bottom" effect="light">
					<el-button>Light</el-button>
				</el-tooltip>
			</el-col>
		</el-row>

		<!-- 更多content功能 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx; margin-top:-40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					设置主题:
				</div>
				<el-tooltip placement="top">
					<div slot="content">多行信息<br />第二行信息</div>
					<el-button>Top center</el-button>
				</el-tooltip>
			</el-col>
		</el-row>

		<!-- 高级拓展 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx; margin-top:-40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					设置主题:
				</div>
				<el-tooltip :disabled="disabled" content="点击关闭 tooltip 功能" placement="bottom" effect="light">
					<el-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</el-button>
				</el-tooltip>
			</el-col>
		</el-row>


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
				disabled: false,
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
	.box {
		width: 400px;

		.top {
			text-align: center;
		}

		.left {
			float: left;
			width: 60px;
		}

		.right {
			float: right;
			width: 60px;
		}

		.bottom {
			clear: both;
			text-align: center;
		}

		.item {
			margin: 4px;
		}

		.left .el-tooltip__popper,
		.right .el-tooltip__popper {
			padding: 8px 10px;
		}
	}
</style>
