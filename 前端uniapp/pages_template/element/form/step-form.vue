<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<div style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
		分步表单功能演示
		</div>

		<view style="padding: 80rpx 400rpx;margin-left: 0rpx;width: 1700rpx;">
			<el-steps :active="data.step" align-center>
				<el-step title="填写转账信息" icon="el-icon-edit"></el-step>
				<el-step title="确认转账信息" icon="el-icon-edit-outline"></el-step>
				<el-step title="完成" icon="el-icon-circle-check"></el-step>
			</el-steps>
		</view>

		<view style="margin-left: 700rpx;">
			<el-form
			:label-position="data.labelPosition" label-width="100px" :model="data.ruleForm" :rules="data.rules" ref="ruleForm">

				<!-- step为1的逻辑开始 -->
				<view v-if="this.data.step==1">
					<el-form-item label="付款账户" prop="account" required>
						<el-col :span="24">
							<el-select v-model="data.ruleForm.account" style="width: 800rpx;">
								<el-option label="账户一" value="shanghai"></el-option>
								<el-option label="账户二" value="beijing"></el-option>
							</el-select>
						</el-col>

					</el-form-item>

					<el-form-item label="收款账户" prop="pay" required :inline="true">
						<el-col :span="24">
							<el-input placeholder="请输入收款账户" v-model="data.ruleForm.pay" class="input-with-select" style="width: 800rpx;">
								<el-select v-model="data.ruleForm.select" slot="prepend" placeholder="账户" style="width: 190rpx;">
									<el-option label="微信" value="1"></el-option>
									<el-option label="支付宝" value="2"></el-option>
								</el-select>
							</el-input>
						</el-col>
					</el-form-item>

					<el-form-item label="收款人姓名" prop="name" required>
						<el-col :span="24">
							<el-input v-model="data.ruleForm.name" style="width: 800rpx;">
							</el-input>
						</el-col>
					</el-form-item>


					<el-form-item label="转账金额" prop="price" required :inline="true">
						<el-col :span="24">
							<el-input placeholder="请输入额度" v-model="data.ruleForm.price" class="input-with-select" style="width: 800rpx;">
								<template slot="prepend">¥</template>
							</el-input>
						</el-col>
					</el-form-item>
				</view>
				<!-- step为1的逻辑结束 -->

				<!-- step为2的逻辑开始 -->
				<view v-if="this.data.step==2">
					<el-tag closable style="font-size: 40rpx;width:1200rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 4rpx;background-color: #F8F8F8;color: red;">
						注意!确认转账后,资金将进到对方账户,无法退回
					</el-tag>

					<el-col :span="24" style="padding: 40rpx;letter-spacing:4rpx;font-size: 30rpx;">
						<text style="color: #515a6e;">付款账户:</text>
						<text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.account}}</text>
					</el-col>

					<el-col :span="24" style="padding: 40rpx;letter-spacing:4rpx;font-size: 30rpx;">
						<text style="color: #515a6e;">收款账户:</text>
						<text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.pay}}</text>
					</el-col>

					<el-col :span="24" style="padding: 40rpx;letter-spacing:4rpx;font-size: 30rpx;">
						<text style="color: #515a6e;">收款人姓名:</text>
						<text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.name}}</text>
					</el-col>

					<el-col :span="24" style="padding: 40rpx;letter-spacing:4rpx;font-size: 30rpx;border-bottom: 1px solid #ccc;width: 1200rpx;">
						<text style="color: #515a6e;">转账金额:</text>
						<text style="margin-left: 20rpx;color: #515a6e;font-weight: bold;">¥{{data.ruleForm.price}}</text>
					</el-col>

					<el-col :span="24" style="padding: 40rpx 0rpx">
						<el-form-item label="支付密码" prop="password" required>
							<el-input v-model="data.ruleForm.password" style="width: 800rpx;">
							</el-input>
						</el-form-item>
					</el-col>
				</view>
				<!-- step为2的逻辑结束 -->

				<!-- step为3的逻辑开始 -->
				<view v-if="this.data.step==3">
					<el-col :span="24" style="margin-left: 500rpx;">

					<i class="el-icon-success" style="color: green;font-size: 200rpx;"></i>

					<view style="font-family: kaiti;font-weight: bold;font-size: 80rpx;margin-left: -60rpx;margin-top: 20rpx;">操作成功</view>

					<view style="letter-spacing: 4rpx;margin: 30rpx 0rpx 30rpx -40rpx;color: #8086a3;">预计两小时内到账</view>

					</el-col>

					<el-col :span="24" style="background-color: #f8f8f9;width: 1700rpx;margin-left: -200rpx;">
						<view style="display: flex; flex-flow: column;">
							<view style="padding: 40rpx 160rpx;">
					<text style="color: #515a6e;">付款账户:</text>
					<text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.account}}</text>
							</view>

							<view style="padding: 40rpx 160rpx;">
							  <text style="color: #515a6e;">收款账户:</text>
							  <text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.pay}}</text>
							</view>

							<view style="padding: 40rpx 160rpx;">
								<text style="color: #515a6e;">收款人姓名:</text>
								<text style="margin-left: 20rpx;color: #515a6e;">{{data.ruleForm.name}}</text>
							</view>

							<view style="padding: 40rpx 160rpx;">
								<text style="color: #515a6e;">转账金额:</text>
								<text style="margin-left: 20rpx;color: #515a6e;font-weight: bold;">¥{{data.ruleForm.price}}</text>
							</view>
						</view>
					</el-col>
				</view>

				<el-col :span="24" style="padding: 40rpx 0rpx;">
					<el-form-item>
						<el-button v-if="this.data.step==1" type="primary" @click="next('ruleForm')" :loading="data.loading">下一步</el-button>
						<el-button v-if="this.data.step==2" type="primary" @click="next('ruleForm')" :loading="data.loading">提交</el-button>

						<el-button v-if="this.data.step==3" type="primary" @click="next('ruleForm')" :loading="data.loading">再来一单</el-button>

					</el-form-item>
				</el-col>
			<!-- step为3的逻辑结束 -->
			</el-form>
		</view>


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
					loading:false,
					step: 1,
					labelPosition: 'right',
					formLabelAlign: {
						name: '',
						region: '',
						type: ''
					},
					ruleForm: {
						name: '',
						pay: '',
						select: '微信',
						account: '账户一',
						price: '',
						password:''
					},
					rules: {
						name: [{
								required: true,
								message: '该项为必填项',
								trigger: 'input'
							},
							{
								min: 1,
								max: 8,
								message: '长度在 1 到 8 个字符',
								trigger: 'blur'
							}
						],
						pay: [{
							required: true,
							message: '请输入完整内容',
							trigger: 'change'
						}],
						account: [{
							required: true,
							message: '请选择付款账户',
							trigger: 'change'
						}],
						price: [{
							required: true,
							message: '请输入付款额度',
							trigger: 'change'
						}],
						password: [{
							required: true,
							message: '请输入支付密码',
							trigger: 'change'
						}],
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
			next(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 如果通过了验证之后才可以点下一步
						if (this.data.step <3) {
							// 再写一个判断 单独判断对应的值为1和2的时候
							this.data.loading=true
							setTimeout(()=>{
							this.data.step++;
							this.data.loading=false
							},1000)
						} else if (this.data.step == 3) {
							this.data.step=1
							this.data.ruleForm=[]
						}
					} else {
						// 否则就不能点下一步
						return false;
					}
				});
			},
			// submitForm(formName) {
			// 	this.$refs[formName].validate((valid) => {
			// 		if (valid) {
			// 			alert('submit!');
			// 		} else {
			// 			console.log('error submit!!');
			// 			return false;
			// 		}
			// 	});
			// },
			resetForm(formName) {
				this.$refs.ruleForm.resetFields();
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

	.select-option {
		// border: 1px solid white !important;
		background-color: #F8F8F8 !important;
		color: red;
	}
	.topTip{
		width: 300rpx;
		height: 100rpx;
    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
	}

	// 设置所有input的样式
</style>
