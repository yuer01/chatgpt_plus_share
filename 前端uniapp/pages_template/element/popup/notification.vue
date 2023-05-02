<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			悬浮提示功能演示
		</div>

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					基本用法:
				</div>

				<el-button plain @click="open1">
					可自动关闭
				</el-button>
				<el-button plain @click="open2">
					不会自动关闭
				</el-button>

			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					具有倾向性:
				</div>
				<el-button plain @click="openA">
					成功
				</el-button>
				<el-button plain @click="openB">
					警告
				</el-button>
				<el-button plain @click="openC">
					消息
				</el-button>
				<el-button plain @click="openD">
					错误
				</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					自定义弹出位置:
				</div>
				<el-button plain @click="opena">
					右上角
				</el-button>
				<el-button plain @click="openb">
					右下角
				</el-button>
				<el-button plain @click="openc">
					左下角
				</el-button>
				<el-button plain @click="opend">
					左上角
				</el-button>
			</el-col>
		</el-row>

		<!-- 带有偏移的弹窗 -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					带偏移的消息提示:
				</div>
				<el-button plain @click="open">
					偏移的消息
				</el-button>
			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					使用HTML字段:
				</div>
				<el-button plain @click="openuu">
					使用 HTML 片段
				</el-button>

			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					不显示关闭按钮:
				</div>
				<el-button plain @click="openhide">
					隐藏关闭按钮
				</el-button>

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
			//
			open() {
				this.$notify({
					title: '偏移',
					message: '这是一条带有偏移的提示消息',
					offset: 100
				});
			},
			open1() {
				const h = this.$createElement;

				this.$notify({
					title: '标题名称',
					message: h('i', {
						style: 'color: teal'
					}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
				});
			},

			open2() {
				this.$notify({
					title: '提示',
					message: '这是一条不会自动关闭的消息',
					duration: 0
				});
			},

			openA() {
				this.$notify({
					title: '成功',
					message: '这是一条成功的提示消息',
					type: 'success'
				});
			},

			openB() {
				this.$notify({
					title: '警告',
					message: '这是一条警告的提示消息',
					type: 'warning'
				});
			},

			openC() {
				this.$notify.info({
					title: '消息',
					message: '这是一条消息的提示消息'
				});
			},

			openD() {
				this.$notify.error({
					title: '错误',
					message: '这是一条错误的提示消息'
				});
			},
			opena() {
				this.$notify({
					title: '自定义位置',
					message: '右上角弹出的消息'
				});
			},

			openb() {
				this.$notify({
					title: '自定义位置',
					message: '右下角弹出的消息',
					position: 'bottom-right'
				});
			},

			openc() {
				this.$notify({
					title: '自定义位置',
					message: '左下角弹出的消息',
					position: 'bottom-left'
				});
			},

			opend() {
				this.$notify({
					title: '自定义位置',
					message: '左上角弹出的消息',
					position: 'top-left'
				});
			},
			openuu() {
				this.$notify({
					title: 'HTML 片段',
					dangerouslyUseHTMLString: true,
					message: '<strong>这是 <i>HTML</i> 片段</strong>'
				});
			},
			openhide() {
				this.$notify.success({
					title: 'Info',
					message: '这是一条没有关闭按钮的消息',
					showClose: false
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
