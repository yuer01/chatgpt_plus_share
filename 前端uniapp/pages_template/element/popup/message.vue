<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			消息提示功能演示
		</div>

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					基础用法:
				</div>
				<el-button :plain="true" @click="open">打开消息提示</el-button>
				<el-button :plain="true" @click="openVn">VNode</el-button>
			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					不同状态:
				</div>
				<el-button :plain="true" type="success" @click="open2">成功</el-button>
				<el-button :plain="true" type="warning" @click="open3">警告</el-button>
				<el-button :plain="true" type="primary" @click="open1">消息</el-button>
				<el-button :plain="true" type="danger" @click="open4">错误</el-button>
			</el-col>
		</el-row>

		<!-- 可关闭功能 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					可关闭:
				</div>
				<el-button :plain="true" type="primary" @click="openA">消息</el-button>
				<el-button :plain="true" type="success" @click="openB">成功</el-button>
				<el-button :plain="true" type="warning" @click="openC">警告</el-button>
				<el-button :plain="true" type="danger" @click="openD">错误</el-button>
			</el-col>
		</el-row>

		<!-- 居中 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					文字居中:
				</div>
				<el-button :plain="true" @click="openCenter" type="infor">文字居中</el-button>
			</el-col>
		</el-row>

		<!-- 嵌入HTML片段 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					嵌入HMTL片段:
				</div>
				<el-button :plain="true" @click="openHTML">使用 HTML 片段</el-button>
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
			},
			open() {
				this.$message('这是一条消息提示');
			},
			openVn() {
				const h = this.$createElement;
				this.$message({
					message: h('p', null, [
						h('span', null, '内容可以是 '),
						h('i', {
							style: 'color: teal'
						}, 'VNode')
					])
				});
			},
			openCenter() {
				this.$message({
					message: '居中的文字',
					center: true
				});
			},
			open1() {
				this.$message('这是一条消息提示');
			},
			open2() {
				this.$message({
					message: '恭喜你，这是一条成功消息',
					type: 'success'
				});
			},

			open3() {
				this.$message({
					message: '警告哦，这是一条警告消息',
					type: 'warning'
				});
			},
			open4() {
				this.$message.error('错了哦，这是一条错误消息');
			},
			openA() {
				this.$message({
					showClose: true,
					message: '这是一条消息提示'
				});
			},

			openB() {
				this.$message({
					showClose: true,
					message: '恭喜你，这是一条成功消息',
					type: 'success'
				});
			},

			openC() {
				this.$message({
					showClose: true,
					message: '警告哦，这是一条警告消息',
					type: 'warning'
				});
			},

			openD() {
				this.$message({
					showClose: true,
					message: '错了哦，这是一条错误消息',
					type: 'error'
				});
			},
			openHTML() {
				this.$message({
					dangerouslyUseHTMLString: true,
					message: '<strong>这是 <i>HTML</i> 片段</strong>'
				});
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
</style>
