<template>
	<view class="page-body">
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			高级表单功能演示
		</div>
		<!-- 页面内容开始 -->

		<!-- 出差信息功能展示 -->
		<div style="padding: 40rpx;">
			<div style="padding: 20rpx; font-weight: bold;">出差信息</div>
			<el-form label-position="top" label-width="100px" size="small" :model="data.ruleForm" :rules="data.rules" ref="ruleForm">
				<el-row>
					<el-col :span="8" style="margin: 0rpx 20rpx;">
						<el-form-item label="出差事由" prop="reason" required>
							<el-input v-model="data.ruleForm.reason"></el-input>
						</el-form-item>

					</el-col>
					<el-col :span="8" style="margin: 0rpx 20rpx;">
						<el-form-item label="合同编号" prop="number" required>
							<el-input v-model="data.ruleForm.number"></el-input>
						</el-form-item>

					</el-col>
				</el-row>

				<el-row>
					<!-- 选择对应的出差时间 -->
					<el-col :span="8" style="margin: 0rpx 20rpx;">
						<el-form-item label="出差日期" prop="travelDate" required>
							<el-date-picker style="width: 800rpx;" v-model="data.ruleForm.travelDate" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
					</el-col>

					<el-col :span="8" style="margin: 0rpx 20rpx;">
						<!-- 出差时间对应的应该是和审批人一起的 -->
						<el-form-item label="审批人" prop="Urgency" required>
							<el-select v-model="data.ruleForm.Urgency" placeholder="选择审批人" style="width: 800rpx;">
								<el-option label="呵呵呵哒" value="shanghai" style="height: 100rpx;">
									<image style="width: 30%;height: 100%;border-radius: 300rpx;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1959779733,683430928&fm=26&gp=0.jpg"></image>
									<span style="float: right; color: #8492a6; font-size: 13px;line-height:100rpx;">审批人一号</span>
								</el-option>

								<el-option label="呵呵呵哒" value="beijing" style="height: 100rpx;">
									<image style="width: 30%;height: 100%;border-radius: 300rpx;" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2334974629,3626811871&fm=26&gp=0.jpg"></image>
									<span style="float: right; color: #8492a6; font-size: 13px;line-height:100rpx;">审批人二号</span>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>

					<el-col :span="7" style="margin: 0rpx 20rpx;">
						<!-- 出差时间对应的应该是和审批人一起的 -->
						<el-form-item label="紧急程度" prop="Urgency">
							<el-radio v-model="data.radio" label="1">

								<el-tag type="danger">超级紧急</el-tag>
							</el-radio>

							<el-radio v-model="data.radio" label="2">
								<el-tag type="warning">一般紧急</el-tag>
							</el-radio>

							<el-radio v-model="data.radio" label="3">
								<el-tag type="success">丝毫不慌</el-tag>
							</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>


		<!-- 行程信息功能展示 -->
		<div style="padding: 40rpx;">
			<div style="padding: 20rpx; font-weight: bold;">行程信息</div>

			<el-form label-position="top" label-width="100px" size="small" :model="data.ruleForm" :rules="data.rules" ref="ruleForm">

				<el-row>
					<el-col :span="12">
						<div class="block" style="margin: 0rpx 20rpx;">
							<el-col :span="8">
								<el-form-item label="出发时间">
									<el-date-picker v-model="data.gotime" type="date" placeholder="选择出发日期">
									</el-date-picker>
								</el-form-item>
							</el-col>

							<el-col :span="8">
								<el-form-item label="返程时间">
									<el-date-picker style="" v-model="data.backtime" type="date" placeholder="选择返程日期">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</div>
					</el-col>
				</el-row>

				<el-row>
					<!-- 选择对应的出差时间 -->
					<el-col :span="8" style="margin: 0rpx 20rpx;">
						<el-form-item label="交通类型">
							<el-select v-model="data.ruleForm.traffic" placeholder="选择交通类型" style="width: 800rpx;">

								<el-option label="飞机" value="shanghai" style="height: 100rpx;">
								</el-option>

								<el-option label="坦克" value="beijing" style="height: 100rpx;">
								</el-option>

							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<!-- 表格的页面数据内容从这个地方开始 -->
			<div>
				<div style="padding: 20rpx; font-weight: bold;">同行人员</div>
				<div style="float: right;">
					<el-tooltip content="添加" placement="top">
						<el-button style="margin-right: 80rpx;" type="success" size="small" icon="el-icon-circle-plus-outline" @click="addData()" />
					</el-tooltip>
				</div>
				<el-table :data="data.tableData" style="width: 100%">
					<el-table-column label="姓名">
						<template slot-scope="{row}">
							<el-form v-if="row.edit">
								<el-form-item>
									<el-input v-model="row.date" size="small" />
								</el-form-item>
							</el-form>
							<span v-else>{{ row.date }}</span>
						</template>
					</el-table-column>

					<el-table-column label="员工编号">
						<template slot-scope="{row}">
							<el-form v-if="row.edit">
								<el-form-item>
									<el-input v-model="row.name" size="small" />
								</el-form-item>
							</el-form>
							<span v-else>{{ row.name }}</span>
						</template>
					</el-table-column>

					<el-table-column label="所属部门">
						<template slot-scope="{row}">
							<el-form v-if="row.edit">
								<el-form-item>
									<el-input v-model="row.address" size="small" />
								</el-form-item>
							</el-form>
							<span v-else>{{ row.address }}</span>
						</template>
					</el-table-column>

					<el-table-column align="center" label="操作" width="120" :resizable="false">
						<template slot-scope="{row}">
							<el-tooltip v-if="row.edit" content="保存" placement="top">
								<el-button type="success" size="small" icon="el-icon-check" @click="checkEditSaveOk(row)" />
							</el-tooltip>
							<el-tooltip v-else-if="!row.edit" content="编辑" placement="top">
								<el-button type="primary" size="small" icon="el-icon-edit" @click="row.edit=!row.edit" />
							</el-tooltip>

							<el-tooltip content="删除" placement="top">
								<el-button type="danger" size="small" icon="el-icon-error" @click="deletedata(row)" />
							</el-tooltip>

						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 点击添加之后对应的对话框 -->

			<el-dialog title="提示" :visible.sync="data.dialogVisible" width="30%">
				<el-form label-position="left" size="small">

					<el-form-item label="姓名" prop="name">

						<el-input v-model="data.add.one" style="width: 600rpx;"></el-input>

					</el-form-item>

					<el-form-item label="序号" prop="name">
						<el-input v-model="data.add.two" style="width: 600rpx;"></el-input>
					</el-form-item>

					<el-form-item label="序号" prop="name">
						<el-select v-model="data.add.three" placeholder="选择对应部门" style="width: 800rpx;">

							<el-option label="战忽部" value="zhanhu" style="height: 100rpx;">
							</el-option>
							<el-option label="策划部" value="cehua" style="height: 100rpx;">
							</el-option>
							<el-option label="财政部" value="caizheng" style="height: 100rpx;">
							</el-option>

							<el-option label="人事部" value="renshi" style="height: 100rpx;">
							</el-option>

						</el-select>
					</el-form-item>

					<el-button @click="add()" type="success" size="medium" style="width:200rpx;">确定</el-button>

				</el-form>
			</el-dialog>

		</div>
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
					// 去的时间和回来的时间
					gotime: '',
					backtime: '',
					// 选择城市等数据源
					props: {
						multiple: true
					},
					add: {
						one: '',
						two: '',
						three: '',
					},
					// 控制对话框的显示与否
					dialogVisible: false,
					// 多级联动数据源
					options: [{
						value: 'zhinan',
						label: '第一层数据',
						children: [{
							value: 'shejiyuanze',
							label: '第二层数据',
							children: [{
								value: 'yizhi',
								label: '数据一'
							}, {
								value: 'fankui',
								label: '数据二'
							}, {
								value: 'xiaolv',
								label: '数据三'
							}, {
								value: 'kekong',
								label: '数据四'
							}]
						}],
					}, ],
					// 多级联动的数据从这个地方开始
					labelPosition: 'right',
					formLabelAlign: {
						name: '',
						region: '',
						type: ''
					},
					ruleForm: {
						reason: '',
						number: '',
						travelDate: '',
						Urgency: '',
						city: ''
						// name: '',
						// region: '',
						// date1: '',
						// date2: '',
						// delivery: false,
						// type: [],
						// resource: '',
						// desc: ''
					},
					tableData: [{
						date: '特朗普',
						name: '001',
						address: '战忽部',
						edit: false
					}, {
						date: '奥巴马',
						name: '002',
						address: '策划部',
						edit: false
					}, {
						date: '拜登',
						name: '003',
						address: '财政部',
						edit: false
					}, {
						date: '罗斯福',
						name: '004',
						address: '人事部',
						edit: false
					}],
					rules: {
						name: [{
								required: true,
								message: '该项为必填项',
								trigger: 'blur'
							},
							{
								min: 3,
								max: 5,
								message: '长度在 3 到 5 个字符',
								trigger: 'blur'
							}
						],
						reason: [{
							required: false,
							message: '请输入原因',
							trigger: 'blur'
						}],
						city: [{
							required: false,
							message: '请输入出发城市',
							trigger: 'blur'
						}],
						gotime: [{
							required: false,
							message: '请输入出发时间',
							trigger: 'blur'
						}],
						backtime: [{
							required: false,
							message: '请输入返回时间',
							trigger: 'blur'
						}],
						number: [{
							required: true,
							message: '请输入合同编号',
							trigger: 'blur'
						}],
						travelDate: [{
							type: 'date',
							required: true,
							message: '请选择出差日期',
							trigger: 'blur'
						}],
						Urgency: [{
							required: true,
							message: '请选择紧急程度',
							trigger: 'blur'
						}],
						date2: [{
							type: 'date',
							required: true,
							message: '请选择时间',
							trigger: 'blur'
						}],
						type: [{
							type: 'array',
							required: true,
							message: '请至少选择一个',
							trigger: 'change'
						}],
						people: [{
							type: 'array',
							required: true,
							message: '请至少选择一个审批人',
							trigger: 'blur'
						}],
						resource: [{
							required: true,
							message: '请至少选择一个',
							trigger: 'change'
						}],
						desc: [{
							required: true,
							message: '该项为必填项',
							trigger: 'blur'
						}]
					}
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
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			checkEditSaveOk(row) {
				row.edit = !row.edit
				console.log(row)
			},
			deletedata(row) {
				let content = this.data.tableData
				content.map((item, index) => {
					item === row ? content.splice(index, 1) : console.log('不相等')
				})
				console.log(this.data.tableData)
				this.$message({
					message: '删除成功!',
					type: 'success'
				});
			},
			addData() {
				// 这个只控制对应的数据是否展示
				console.log('添加数据')
				this.data.dialogVisible = true
			},
			// 真实添加数据的逻辑
			add() {
				this.data.tableData.push({
					date: this.data.add.one,
					name: this.data.add.two,
					address: this.data.add.three,
					edit: false
				}, )
				this.$message({
					message: '添加成功!',
					type: 'success'
				});
				// 对应的添加的逻辑也已经完成
				this.data.dialogVisible = false;
			},
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
