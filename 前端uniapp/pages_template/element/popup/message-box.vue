<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			消息提示功能演示
		</div>

		<el-row>
			<el-col :span="24" style="padding:40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					消息提示:
				</div>
				<el-button type="text" @click="open">点击打开 Message Box</el-button>
			</el-col>
		</el-row>

		<!-- 确认消息功能 -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					确认消息:
				</div>
				<el-button type="text" @click="open1">点击打开 Message Box</el-button>
			</el-col>
		</el-row>

		<!-- 自定义消息功能 -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					确认消息:
				</div>
				<el-button type="text" @click="open2">点击打开 Message Box</el-button>
			</el-col>
		</el-row>

		<!-- 使用HTML消息功能 -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					使用HTML片段:
				</div>
				<el-button type="text" @click="open3">点击打开 Message Box</el-button>
			</el-col>
		</el-row>

		<!-- 区分取消和关闭 -->
		<!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top: -40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					区分取消和关闭:
				</div>
				<el-button type="text" @click="open4">点击打开 Message Box</el-button>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx; margin-top:-40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					内容居中布局:
				</div>
				<el-button type="text" @click="open5">点击打开 Message Box</el-button>
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
				this.$alert('这是一段内容', '标题名称', {
					confirmButtonText: '确定',
					callback: action => {
						this.$message({
							type: 'info',
							message: `消息内容: ${ action }`
						});
					}
				});
			},
			open1() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			open2() {
				const h = this.$createElement;
				this.$msgbox({
					title: '消息',
					message: h('p', null, [
						h('span', null, '内容可以是 '),
						h('i', {
							style: 'color: teal'
						}, 'VNode')
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(() => {
								done();
								setTimeout(() => {
									instance.confirmButtonLoading = false;
								}, 300);
							}, 3000);
						} else {
							done();
						}
					}
				}).then(action => {
					this.$message({
						type: 'info',
						message: 'action: ' + action
					});
				});
			},
			open3() {
				this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
					dangerouslyUseHTMLString: true
				});
			},
			open4() {
				this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
						distinguishCancelAndClose: true,
						confirmButtonText: '保存',
						cancelButtonText: '放弃修改'
					})
					.then(() => {
						this.$message({
							type: 'info',
							message: '保存修改'
						});
					})
					.catch(action => {
						this.$message({
							type: 'info',
							message: action === 'cancel' ?
								'放弃保存并离开页面' :
								'停留在当前页面'
						})
					});
			},
			 open5() {
			        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          center: true
			        }).then(() => {
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });
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
