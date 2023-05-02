<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			弹窗功能演示
		</div>

		<el-row>
		<el-col :span="24"  style="padding: 40rpx;">
			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				基本用法:
			</div>
		<el-button type="text" @click="dialogVisible1 = true">点击打开 Dialog</el-button>

		<el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
			</span>
		</el-dialog>
		</el-col>
		</el-row>


		<el-row>
		<el-col :span="24"  style="padding: 40rpx;">
			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				嵌套表格:
			</div>
		<!-- Table -->
		<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

		<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
			<el-table :data="gridData">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
		</el-dialog>
		</el-col>
		</el-row>


		<el-row>
		<el-col :span="24"  style="padding: 40rpx;">
			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				嵌套表单:
			</div>
		<!-- Form -->
		<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="活动名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="活动区域" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>

		</el-col>
		</el-row>


		<el-row>
		<el-col :span="24"  style="padding: 40rpx;">
			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				多层嵌套:
			</div>
		<el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>

		<el-dialog title="外层 Dialog" :visible.sync="outerVisible">
			<el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
			</el-dialog>
			<div slot="footer" class="dialog-footer">
				<el-button @click="outerVisible = false">取 消</el-button>
				<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
			</div>
		</el-dialog>
		</el-col>
		</el-row>

		<el-row>
		<el-col :span="24"  style="padding: 40rpx;">
			<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				居中布局:
			</div>
		<el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

		<el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
			<span>需要注意的是内容是默认不居中的</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

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

				centerDialogVisible: false,
				outerVisible: false,
				innerVisible: false,
				dialogVisible1: false,
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
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',

				// init请求返回的数据
				data: {},
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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
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
