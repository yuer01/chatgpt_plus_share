<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		:close-on-click-modal="true"
		center
		@open="onOpen"
		@closed="onClose"
	>
		<view class="uni-container">

			<h3 class="text-separated" style="padding: 0 0 20rpx 0;">步骤1：了解“统一发布页”</h3>

			<view style="margin-top: 20rpx;">
				<view class="text-separated">
					<text class="strong">uni-portal </text>
					<text>是 uni-app 提供的一套开箱即用的“统一发布页”。</text>
				</view>
				<view class="text-separated">
					<text class="strong">uni-portal </text>
					<text>可作为面向用户的统一业务名片，在一个页面集中展现：App下载地址、小程序二维码、H5访问链接等信息。</text>
				</view>

				<!-- #ifdef H5 -->
				<view class="text-separated">
					<text style="font-size: 16px;">uni-app 官方示例的发布页就是基于<text class="strong">uni-portal </text> 制作的，<a
							href="https://hellouniapp.dcloud.net.cn/portal" target="_blank" class="a-label">点击体验</a>
					</text>
				</view>
				<!-- #endif -->
			</view>

			<h3 class="text-separated" style="padding: 40rpx 0 20rpx 0;">步骤2：获取“统一发布页”</h3>
			<view class="flex text-separated" style="margin-top: 20rpx;">
				<text>
					<view class="strong">uni-portal </view> 可根据「应用管理」中所填写的应用信息，一键生成发布页：
				</text>
				<button class="custom-button" size="mini" type="primary" @click="publish"
					style="margin: 0;">生成并下载发布页</button>
			</view>

			<h3 class="text-separated" style="padding: 40rpx 0 20rpx 0;">步骤3：上传“统一发布页”</h3>

			<view style="margin-top: 20rpx;">
				<view class="text-separated">
					<text>
						步骤2下载的“统一发布页”，是一个静态HTML页面，你可以直接在本地浏览器中打开访问。
					</text>
				</view>

				<view class="text-separated">
					<text>
						为了让用户访问到这个“统一发布页”，你需要将该静态HTML文件上传到你的服务器中；推荐使用<a href="https://uniapp.dcloud.io/uniCloud/hosting"
							target="_blank" class="a-label" style="padding: 5px;">前端网页托管</a>，因为前端网页托管具备使用更简单、价格更便宜、访问更快等优点。
					</text>
				</view>
			</view>
		</view>
		<template v-slot:footer>
			<el-button :loading="page.loading" type="primary" size="small" style="width: 80px;" @click="close">{{ page.submitText }}</el-button>
		</template>
	</vk-data-dialog>
</template>

<script>
var vk = uni.vk; // vk实例
var download = function(content, filename) {
	let eleLink = document.createElement('a');
	eleLink.download = filename;
	eleLink.style.display = 'none';
	let blob = new Blob([content]);
	eleLink.href = URL.createObjectURL(blob);
	document.body.appendChild(eleLink);
	eleLink.click();
	document.body.removeChild(eleLink);
};
export default {
	props: {
		value: {
			Type: Object,
			default: function() {
				return {
					show: false,
					item: {},
				};
			}
		}
	},
	data: function() {
		// 组件创建时,进行数据初始化
		return {
			page: {
				title: "生成统一发布页",
				submitText: "关闭",
				top: "5vh",
				width: "800px",
				loading: false
			},
			id: ""
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化
		init() {
			let { value } = this;
			this.$emit("input", value);
		},
		// 监听 - 页面打开
		onOpen() {
			let { value = {} } = this;
			let { item={} } = value;
			this.id = item._id;
		},
		// 监听 - 页面关闭
		onClose() {

		},
		close(){
			this.$emit("input", false);
		},
		publish() {
			if (!this.id) {
				uni.showModal({
					content: '页面出错，请返回重进',
					showCancel: false,
					success(res) {
						uni.redirectTo({
							url: '/pages/system/app/list'
						})
					}
				})
				return
			}
			vk.callFunction({
				url: 'admin/system/app/sys/createPublishHtml',
				title: '生成中...',
				data: {
					id: this.id
				},
				success: (res) => {
					if ('download' in document.createElement('a')) {
						download(res.body, 'uni-publish.html');
					} else {
						vk.toast('浏览器不支持');
					}
				}
			});
		}
	},
	watch: {

	},
	// 计算属性
	computed: {

	}
};
</script>

<style lang="scss" scoped>
.strong {
	padding: 10rpx;
	display: inline-block;
	color: #c7254e;
}

.a-label {
	text-decoration: none;
	color: #0366d6;
	font-weight: bold;
	padding: 10rpx;
}

.text-separated {
	line-height: 2em;
	color: #2c3e50;
}

.tip {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	background-color: #f3f5f7;
	color: #2c3e50;
	padding: 10px;
	font-size: 32rpx;

	border: {
		color: #409EFF;
		left-width: 8px;
		left-style: solid;
	}

	text {
		margin-right: 15px;
	}

	.custom-button {
		margin-left: 0px;
	}
}
</style>
