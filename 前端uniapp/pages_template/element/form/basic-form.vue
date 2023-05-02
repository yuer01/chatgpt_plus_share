<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
		普通表单功能演示
		</div>

		<div style="padding-left: 300rpx;">

			<el-radio-group v-model="data.labelPosition" size="small">
				<el-radio-button label="left">左对齐</el-radio-button>
				<el-radio-button label="right">右对齐</el-radio-button>
				<el-radio-button label="top">顶部对齐</el-radio-button>
			</el-radio-group>

			<div style="margin: 20px;"></div>

			<el-form :label-position="data.labelPosition" label-width="100px" :model="data.ruleForm" :rules="data.rules" ref="ruleForm">

				<el-form-item label="普通表单框" prop="name" required>

					<el-col :span="10">
						<el-input v-model="data.ruleForm.name"></el-input>
					</el-col>

				</el-form-item>

				<el-form-item label="Select选择" prop="region" required>
					<el-col :span="24">
						<el-select v-model="data.ruleForm.region" placeholder="请选择活动区域">
							<el-option label="选项一" value="shanghai"></el-option>
							<el-option label="选项二" value="beijing"></el-option>
						</el-select>
					</el-col>

				</el-form-item>


				<el-form-item label="时间选择器" required>
					<el-col :span="4">
						<el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="data.ruleForm.date1" style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" style="text-align: center;" :span="1">
						<text style="color: #ccc;">—</text>
						</el-col>
					<el-col :span="4">
						<el-form-item prop="date2">
							<el-time-picker placeholder="选择时间" v-model="data.ruleForm.date2" style="width: 100%;"></el-time-picker>
						</el-form-item>
					</el-col>
				</el-form-item>

				<!-- 多级联动页面区域 -->
				<el-form-item label="多级联动" required>
					<div class="block">
						<el-cascader placeholder="多级联动组件展示" :options="data.options" :props="{ multiple: true }" filterable></el-cascader>
					</div>
				</el-form-item>

				<el-form-item label="开关组件" prop="delivery" required>
					<el-switch v-model="data.ruleForm.delivery"></el-switch>
				</el-form-item>

				<el-form-item label="多选框" prop="type" required>
					<el-checkbox-group v-model="data.ruleForm.type">
						<el-checkbox label="选项一" name="type"></el-checkbox>
						<el-checkbox label="选项二" name="type"></el-checkbox>
						<el-checkbox label="选项三" name="type"></el-checkbox>
						<el-checkbox label="选项四" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item label="单选框" prop="resource" required>
					<el-radio-group v-model="data.ruleForm.resource">
						<el-radio label="选项一"></el-radio>
						<el-radio label="选项二"></el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="活动形式" prop="desc" required>
					<el-col :span="10">
						<el-input type="textarea" v-model="data.ruleForm.desc"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>

			</el-form>

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
				// 多级联动数据源
					options: [
						{
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
						},
					],
					// 多级联动的数据从这个地方开始
					labelPosition: 'right',
					formLabelAlign: {
						name: '',
						region: '',
						type: ''
					},
					ruleForm: {
						name: '',
						region: '',
						date1: '',
						date2: '',
						delivery: false,
						type: [],
						resource: '',
						desc: ''
					},
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
						cascade:[{
								required: false,
								message: '请输入活动名称',
								trigger: 'blur'
						}],
						region: [{
							required: true,
							message: '请至少选择一个',
							trigger: 'change'
						}],
						date1: [{
							type: 'date',
							required: true,
							message: '请选择日期',
							trigger: 'change'
						}],
						date2: [{
							type: 'date',
							required: true,
							message: '请选择时间',
							trigger: 'change'
						}],
						type: [{
							type: 'array',
							required: true,
							message: '请至少选择一个',
							trigger: 'change'
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
		mounted() {

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

	// 设置所有input的样式
</style>
