<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			悬浮提示功能演示
		</div>

		<!-- 基本用法 -->
		<el-row>
		<el-col :span="24" style="padding: 40rpx;">

			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				基本用法:
			</div>

			<el-popconfirm
			  title="这是一段内容确定删除吗？"
			>
			  <el-button slot="reference">删除</el-button>
			</el-popconfirm>
		</el-col>
		</el-row>

		<!-- 自定义功能从这个地方开始 -->

		<el-row>
		<el-col :span="24" style="padding: 40rpx;">

			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				自定义用法:
			</div>
				<el-popconfirm
				  confirm-button-text='好的'
				  cancel-button-text='不用了'
				  icon="el-icon-info"
				  icon-color="red"
				  title="宁确定要删除吗？"
				>
				  <el-button slot="reference">删除</el-button>
				</el-popconfirm>
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
				// init请求返回的数据
				data:{

				},
				// 表单请求数据
				form1:{

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
		onReady(){

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
			init(options){

			},
			pageTo(path){
				vk.navigateTo(path);
			}
		},
		// 过滤器
		filters:{

		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>
	.page-body{

	}
</style>
