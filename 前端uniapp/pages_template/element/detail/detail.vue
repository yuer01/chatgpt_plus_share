<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<el-row>
			<div style="padding: 0rpx;font-size: 70rpx;font-family: kaiti;">
			综合详情功能演示
			</div>
			<el-col :span="5">
				<div style="flex: 1;">
					<image style="width: 100%;" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fclubimg.club.vmall.com%2Fdata%2Fattachment%2Fforum%2F202007%2F17%2F232123momgketgdekbqtvl.jpg&refer=http%3A%2F%2Fclubimg.club.vmall.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611383212&t=3d0e493b7e997749772227dcc4fa3ae7"></image>
				</div>
			</el-col >

				<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">姓名：</text>
						<text style="color: #978e94">蒙奇D-呵呵</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">年龄：</text>
						<text style="color: #978e94">？？？？</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">性别：</text>
						<text style="color: #978e94">男</text>
					</div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">星座：</text>
						<text style="color: #978e94">天秤座</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">爱好：</text>
						<text style="color: #978e94">女</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">民族：</text>
						<text style="color: #978e94">神族</text>
					</div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">仙术：</text>
						<text style="color: #978e94">凌波微步</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">仙骨：</text>
						<text style="color: #978e94">百万年</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">查克拉：</text>
						<text style="color: #978e94">？？？？？</text>
					</div>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">斗气等级：</text>
						<text style="color: #978e94">？？？？？</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">果实能力：</text>
						<text style="color: #978e94">震震果实</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">所属派别：</text>
						<text style="color: #978e94">黑手党</text>
					</div>
				</div>
			</el-col>



			<el-col :span="24" style="border-bottom: 1px solid #ebeef5;">
			</el-col>

			<!-- 其他信息 -->
			<el-col :span="24">
				<div style="padding: 20rpx;" class="grid-content bg-purple-dark">其它信息</div>
			</el-col>
			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">住址：</text>
						<text style="color: #978e94">天界</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">家乡：</text>
						<text style="color: #978e94">神界</text>
					</div>
				</div>
			</el-col>

			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">城市：</text>
						<text style="color: #978e94">天宫</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">仙龄：</text>
						<text style="color: #978e94">6000年</text>
					</div>
				</div>
			</el-col>

			<el-col :span="24">
				<div class="grid-content bg-purple-dark" style="padding: 20rpx;display: flex;">
					<div style="flex: 1;">
						<text style="color: #3d475c;">仙术：</text>
						<text style="color: #978e94">炎咒</text>
					</div>
					<div style="flex: 1;">
						<text style="color: #3d475c;">公司：</text>
						<text style="color: #978e94">魔界</text>
					</div>
				</div>
			</el-col>

			<el-col :span="24" style="border-bottom: 1px solid #ebeef5;">
			</el-col>

			<el-col :span="24">

				<div style="padding: 20rpx;" class="grid-content bg-purple-dark">表格信息</div>

				<el-table :data="data.tableData" style="width: 100%" border row-class-name="tableRowClassName">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>

					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>

					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>

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
					tableData: [{
							date: '2016-05-02',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1518 弄',
						},
						{
							date: '2016-05-04',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1518 弄'
						},
						{
							date: '2016-05-01',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1518 弄',
						},
						{
							date: '2016-05-03',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1518 弄'
						},
					]
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
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex === 3) {
					return 'success-row';
				}
				return '';
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
	.page-body {}

	div {
		padding: 12rpx 0rpx;
		font-size: 30rpx;
	}

	.el-table .warning-row {
		background: oldlace !important;
	}

	.el-table .success-row {
		background: #f0f9eb !important;
	}
</style>
