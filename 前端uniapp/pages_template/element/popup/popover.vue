<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			提示弹框功能演示
		</div>

		<!-- 基本用法 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">

				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					基本用法:
				</div>
				<el-popover placement="top-start" title="标题" width="200" style="margin-right: 30rpx;" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
					<el-button slot="reference">hover 激活</el-button>
				</el-popover>

				<el-popover placement="bottom" title="标题" width="200" style="margin-right: 30rpx;" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
					<el-button slot="reference">click 激活</el-button>
				</el-popover>

				<el-popover ref="popover" placement="right" title="标题" width="200" style="" trigger="focus" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
				</el-popover>
				<el-button v-popover:popover style="margin-right: 30rpx;">focus 激活</el-button>

				<el-popover placement="bottom" title="标题" width="200" trigger="manual" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
				 v-model="visible">
					<el-button slot="reference" @click="visible = !visible">手动激活</el-button>
				</el-popover>

			</el-col>
		</el-row>

		<!-- 自定义功能从这个地方开始 -->

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">

				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					嵌套信息:
				</div>
				<el-popover placement="right" width="400" trigger="click">
					<el-table :data="gridData">
						<el-table-column width="150" property="date" label="日期"></el-table-column>
						<el-table-column width="100" property="name" label="姓名"></el-table-column>
						<el-table-column width="300" property="address" label="地址"></el-table-column>
					</el-table>
					<el-button slot="reference">click 激活</el-button>
				</el-popover>
			</el-col>
		</el-row>

		<!-- 嵌套操作从这个地方开始 -->
		<el-row>
			<el-col :span="24" style="padding: 40rpx;">

				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					嵌套操作:
				</div>
				<el-popover
				  placement="top"
				  width="160"
				  v-model="visible1">
				  <p>这是一段内容这是一段内容确定删除吗？</p>
				  <div style="text-align: right; margin: 0">
				    <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
				    <el-button type="primary" size="mini" @click="visible1 = false">确定</el-button>
				  </div>
				  <el-button slot="reference">删除</el-button>
				</el-popover>

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
				 visible1: false,
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				visible: false,
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
</style>
