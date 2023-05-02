<!-- 与element-icons区别是没有left和top窗口 -->
<template>
	<!-- 页面内容开始 -->
	<view class="page">
		<vk-data-page-header
			title="Element 图标"
			subTitle="点击图标即可复制图标代码"
		></vk-data-page-header>
		<view class="page-body icons">
			<view v-for="(icon,index) in icons" :key="icon" class="icon-item pointer">
				<vk-data-icon :name="icon" size="30" @click="setClipboardData('tag',icon)"></vk-data-icon>
				<text @click="setClipboardData('class',icon)" class="icon-text">{{icon}}</text>
			</view>
		</view>
	</view>
	<!-- 页面内容结束 -->
</template>

<script>
	import icons from './js/element-icons.js'
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	export default {
		data() {
			// 页面数据变量
			return {
				icons,
				// init请求返回的数据
				data: {},
				// 表单请求数据
				form1: {}
			};
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
		onHide() {},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options) {},
			setClipboardData(type, icon) {
				let data = icon;
				if (type === 'tag') {
					data = `<vk-data-icon name="${icon}" size="30"></vk-data-icon>`;
				}
				vk.pubfn.setClipboardData({
					data,
					success(res) {
						uni.showToast({
							icon: 'none',
							title: '复制 ' + data + ' 成功！'
						})
					},
					fail(res) {
						uni.showModal({
							content: '复制 ' + data + ' 失败！',
							showCancel: false
						});
					}
				})
			}
		},
		// 过滤器
		filters: {},
		// 计算属性
		computed: {}
	}
</script>
<style lang="scss" scoped>
	.icons {
		display: flex;
		flex-wrap: wrap;
	}

	.icon-item {
		display: flex;
		width: 16.6%;
		height: 120px;
		font-size: 30px;
		text-align: center;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.icon-item:hover,
	.icon-item:hover .icon-text {
		color: #007AFF;
	}

	.icon-text {
		color: #99a9bf;
		font-size: 12px;
		text-align: center;
		height: 1em;
		line-height: 1em;
		margin-top: 15px;
	}


	@media only screen and (max-width: 500px) {
		.icon-item {
			width: 33.3%;
		}
	}

</style>
