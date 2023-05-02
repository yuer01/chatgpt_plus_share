<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<!-- 左边 -->
		<view class="left">
			<view>
				<i class="el-icon-s-operation"></i>
				<text>个人设置</text>
			</view>
			<view :class="display_list == index ? 'select_list': ''" v-for="(item,index) of left_list" :key="index" @click="change_left(index)">
				<text>{{item.name}}</text>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 右边 -->
		<view class="right">
			<view v-show="display_list == 0" class="form">
				<view class="base_set">
					<view class="right_title">基本设置</view>
					<el-form class="form_input" label-width="800px" label-position="top" :model="form1" :rules="rules" ref="form1">
						<el-form-item label="昵称" prop="name" required>
							<el-input v-model="form1.name"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email" required>
							<el-input v-model="form1.email"></el-input>
						</el-form-item>
						<el-form-item label="个人介绍" required>
							<el-input type="textarea" v-model="form1.introduce"></el-input>
						</el-form-item>
						<el-form-item label="公司" required>
							<el-input v-model="form1.company"></el-input>
						</el-form-item>
						<el-form-item label="居住地" required>
							<el-cascader placeholder="选择地区" :options="options_list" :props="{ multiple: true }" filterable></el-cascader>
						</el-form-item>
						<el-button type="primary">更新基本信息</el-button>
					</el-form>
				</view>
				<view class="avater">
					<text >头像</text>
					<image src="../../../static/logo.png" ></image>
					<el-button class="avater_but" size="mini" style="margin-left: -2px;" plain><i class="el-icon-camera-solid"></i>修改头像</el-button>
				</view>
			</view>
			<view v-show="display_list == index + 1" v-for="(item,index) of right_list" :key="index">
				<view class="right_title">{{item.title}}</view>
				<view class="name_tips" v-for="(value,key) of item.list" :key="key">
					<view class="name">
						<image src="" v-if="index == 1 && key == 0"></image>
						<image src="" v-if="index == 1 && key == 1"></image>
						<image src="" v-if="index == 1 && key == 2"></image>
						<image src="" v-if="index == 1 && key == 3"></image>
						<text>{{value.name}}</text>
					</view>
					<text class="tips">{{value.tips}}</text>
					<text class="operation">
						<el-switch v-show="index == 2" v-model="switch_value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						<text class="operation_modify" v-show="index == 1 || index == 0">修改</text>
					</text>
				</view>
			</view>
		</view>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	let left_list = [{
		name: "基础设置",
		title: "个人账户信息设置"
	}, {
		name: "安全设置",
		title: "密码、邮箱等设置"
	}, {
		name: "账号绑定",
		title: "绑定第三方社交账户"
	}, {
		name: "新消息通知",
		title: "各种通知的设置"
	}];
	let right_list = [{
		title: "安全设置",
		list: [{
			name: "账户密码",
			tips: "绑定手机和邮箱，并设置密码，帐号更安全"
		}, {
			name: "绑定手机",
			tips: "已绑定手机号：+86185****0000"
		}, {
			name: "密保问题",
			tips: "未设置密保问题，密保问题可有效保护账户安全"
		}, {
			name: "个性域名",
			tips: "已绑定域名：iview.design"
		}]
	}, {
		title: "账号绑定",
		list: [{
			name: "微信",
			tips: "当前未绑定微信账号"
		}, {
			name: "微博",
			tips: "当前未绑定微博账号"
		}, {
			name: "Facebook",
			tips: "当前未绑定Facebook账号"
		}, {
			name: "Twitter",
			tips: "当前未绑定Twitter账号"
		}]
	}, {
		title: "新消息通知",
		list: [{
			name: "陌生人私信",
			tips: "未关注的人向您发私信时的通知"
		}, {
			name: "邀请/评论消息",
			tips: "有人对我发出邀请时，我会收到消息通知"
		}, {
			name: "赞同/赞赏消息设置",
			tips: "有人对我赞同或赞赏时，我会收到消息通知"
		}, {
			name: "邮件设置",
			tips: "重要事件发生时，我将会收到邮件提醒"
		}]
	}];
	let options_list = [{
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
	}];
	export default {
		data() {
			// 页面数据变量
			return {
				left_list,
				right_list,
				// 多级联动数据源
				options_list,
				display_list: 0,
				switch_value: true,
				rules: {
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在3到5个字符',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: "请输入邮箱",
						trigger: "blur"
					}, {
						type: "email",
						message: "请输入正确的邮箱！",
						trigger: "blur"
					}],
				},
				// init请求返回的数据
				data: {},
				// 表单请求数据
				form1: {
					name: "",
					email: "",
					introduce: "",
					company: "",
					options: ""
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
			change_left(index) {
				this.display_list = index;
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
	view,
	text {
		box-sizing: border-box;
	}

	page {
		width: 100%;
		height: 100%;
		background-color: #F5F7F9;
	}

	.page-body {
		display: flex;
		background-color: #F5F7F9;

		>view {
			border-radius: 8rpx;
		}
	}

	.left {
		width: 800rpx;
		background: #fff;
		position: relative;
		transition: all .2s ease-in-out;
		padding-bottom: 14rpx;
		margin-right: 40rpx;
		border-bottom: 2rpx solid #e8eaec;
		position: relative;
		margin-bottom: auto;

		.el-icon-s-operation {
			margin-right: 10rpx;
		}

		>view {
			&:first-of-type {
				font-size: 32rpx;
				border-bottom: 2rpx solid #e8eaec;
				padding: 28rpx 32rpx;
				margin-bottom: 14rpx;
			}

			&:not(:first-of-type) {
				display: flex;
				flex-direction: column;
				padding: 14rpx 32rpx;
				color: #515a6e;
				font-size: 14px !important;
				white-space: nowrap;
				list-style: none;
				cursor: pointer;
				transition: background .2s ease-in-out;

				&:hover {
					background-color: #f3f3f3 !important;
				}

				>text {
					&:first-of-type {
						font-size: 28rpx;
					}

					&:last-of-type {
						font-size: 22rpx;
						color: #808695;
					}
				}
			}
		}
	}

	// 选中左侧列表的样式
	.select_list {
		color: #2d8cf0 !important;
		background-color: #F0FAFF !important;

		>text {
			color: #2d8cf0 !important;
		}
	}

	// 右边的样式
	.right {
		flex: 1;
		background-color: #FFFFFF;
		padding: 32rpx;
	}

	.right_title {
		font-size: 45rpx;
		color: #515A6E;
		font-weight: bolder;
		letter-spacing: 2px;
		margin-bottom: 20rpx;
	}

	.name_tips {
		margin-left: 32rpx;
		padding: 40rpx 0rpx;
		display: flex;
		flex-direction: column;
		border-bottom: 2rpx solid #E8EAEC;
		position: relative;

		.name {
			font-size: 30rpx;
			font-weight: bolder;
			letter-spacing: 2rpx;
			margin-bottom: 16rpx;
			display: flex;
			align-items: center;

			image {
				width: 50rpx;
				height: 50rpx;
				margin-right: 15rpx;
			}
		}

		.tips {
			font-size: 28rpx;
			color: #808695;
		}

		// 操作
		.operation {
			position: absolute;
			float: right;
			color: #2D8CF0;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);

			.operation_modify {
				&:hover {
					cursor: pointer;
				}
			}
		}
	}

	// 表单样式
	.form {
		display: flex;

		.form_input {
			width: 1000rpx;
		}

		.avater {
			display: flex;
			flex-direction: column;
			margin-left: 100rpx;
			margin-top: 100rpx;

			text {
				font-size: 28rpx;
				color: #515a6e;
			}

			image {
				margin-top: 10rpx;
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
				display: block;
			}

			.avater_but {
				margin-top: 30rpx;

				i {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
