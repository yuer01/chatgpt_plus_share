<!-- 与vk-icons区别是没有left和top窗口 -->
<template>
	<view class="page">
		<vk-data-page-header
			title="VK框架图标"
			subTitle="点击图标即可复制图标代码，如需其他图标，欢迎提交需求。Q群：22466457"
		></vk-data-page-header>
		<view class="page-body icons">
			<view v-for="(icon,index) in icons" :key="icon" class="icon-item pointer">
				<vk-data-icon :name="icon" size="30" @click="setClipboardData('tag',icon)"></vk-data-icon>
				<text @click="setClipboardData('class',icon)" class="icon-text">{{icon}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import icons from './js/vk-icons.js';
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	export default {
		data() {
			return {
				icons
			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
		},
		methods: {
			// 页面数据初始化函数
			init(options) {

			},
			setClipboardData(type, icon) {
				let data = icon;
				if (type === 'tag') {
					data = `<vk-data-icon name="${icon}" size="30"></vk-data-icon>`;
				};
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
				});
			}
		}
	}
</script>

<style>
	.icons {
		display: flex;
		flex-wrap: wrap;
	}

	.icon-item {
		display: flex;
		width: 16.6%;
		height: 120px;
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
