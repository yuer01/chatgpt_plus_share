<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			抽屉功能演示
		</div>

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					普通功能:
				</div>
				<el-radio-group v-model="direction">
					<el-radio label="ltr">从左往右开</el-radio>
					<el-radio label="rtl">从右往左开</el-radio>
					<el-radio label="ttb">从上往下开</el-radio>
					<el-radio label="btt">从下往上开</el-radio>
				</el-radio-group>

				<el-col :span="24" style="padding: 40rpx 0rpx;margin-left: -40rpx;">
				<el-button @click="drawer = true" type="primary" size="small" style="margin-left: 18px;margin-top: 30rpx;">
					点我打开
				</el-button>
				</el-col>

				<el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
					<span>我来啦!</span>
				</el-drawer>
			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					无标题:
				</div>
				<el-button @click="data.drawer = true" type="success" size="small"  style="width: 160rpx;">
					点我打开
				</el-button>

				<el-drawer title="我是标题" :visible.sync="data.drawer" :with-header="false">
					<span>我来啦!</span>
				</el-drawer>
			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 40rpx;">

				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					嵌套内容:
				</div>

				<el-button type="text" @click="table = true">打开嵌套表格的 Drawer</el-button>
				<el-button type="text" @click="dialog = true">打开嵌套 Form 的 Drawer</el-button>
				<el-drawer title="我嵌套了表格!" :visible.sync="table" direction="rtl" size="50%">
					<el-table :data="gridData">
						<el-table-column property="date" label="日期" width="150"></el-table-column>
						<el-table-column property="name" label="姓名" width="200"></el-table-column>
						<el-table-column property="address" label="地址"></el-table-column>
					</el-table>
				</el-drawer>

				<el-drawer title="我嵌套了 Form !" :before-close="handleClose" :visible.sync="dialog" direction="ltr" custom-class="demo-drawer"
				 ref="drawer">
					<div class="demo-drawer__content">
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
						<div class="demo-drawer__footer">
							<el-button @click="cancelForm">取 消</el-button>
							<el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
						</div>
					</div>
				</el-drawer>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<div style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					多层嵌套:
				</div>
		<el-button @click="drawer1 = true" type="danger" size="small" style="margin-left: -2px;">
		  点我打开
		</el-button>

		<el-drawer
		  title="我是外面的 Drawer"
		  :visible.sync="drawer1"
		  size="50%">
		  <div>
		   <el-button @click="innerDrawer = true">打开里面的!</el-button>
		   <el-drawer
		     title="我是里面的"
		     :append-to-body="true"
		     :before-close="handleClose1"
		     :visible.sync="innerDrawer">
		     <p>_(:зゝ∠)_</p>
		   </el-drawer>
		  </div>
		</el-drawer>

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
				drawer1: false,
				innerDrawer: false,
				table: false,
				dialog: false,
				loading: false,
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
				formLabelWidth: '80px',
				timer: null,
				drawer: false,
				direction: 'rtl',
				// init请求返回的数据
				data: {
					drawer: false,
					direction: 'rtl',

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
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			handleClose(done) {
				if (this.loading) {
					return;
				}
				this.$confirm('确定要提交表单吗？')
					.then(_ => {
						this.loading = true;
						this.timer = setTimeout(() => {
							done();
							// 动画关闭需要一定的时间
							setTimeout(() => {
								this.loading = false;
							}, 400);
						}, 2000);
					})
					.catch(_ => {});
			},
			 handleClose1(done) {
			        this.$confirm('还有未保存的工作哦确定关闭吗？')
			          .then(_ => {
			            done();
			          })
			          .catch(_ => {});
			      },
			cancelForm() {
				this.loading = false;
				this.dialog = false;
				clearTimeout(this.timer);
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
