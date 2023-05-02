<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			弹窗功能演示
		</div>
		 <el-alert
		    title="成功提示的文案"
		    type="success"
		    show-icon>
		  </el-alert>

		  <el-alert
		    title="消息提示的文案"
		    type="info"
		    show-icon>
		  </el-alert>

		  <el-alert
		    title="警告提示的文案"
		    type="warning"
		    show-icon>
		  </el-alert>

		  <el-alert
		    title="错误提示的文案"
		    type="error"
		    show-icon>
		  </el-alert>

			 <el-alert
			    title="成功提示的文案"
			    type="success"
			    center
			    show-icon>
			  </el-alert>

			  <el-alert
			    title="消息提示的文案"
			    type="info"
			    center
			    show-icon>
			  </el-alert>

			  <el-alert
			    title="警告提示的文案"
			    type="warning"
			    center
			    show-icon>
			  </el-alert>

			  <el-alert
			    title="错误提示的文案"
			    type="error"
			    center
			    show-icon>
			  </el-alert>

				  <el-alert
				    title="带辅助性文字介绍"
				    type="success"
				    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
				  </el-alert>


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
	.el-alert{
		margin-bottom: 20rpx;
	}
</style>
