<template>
	<view class="page">
		<!-- 页面头部内容开始 -->
		<vk-data-page-header
			title="富文本编辑器"
			subTitle="editor"
			@back="pageBack"
		></vk-data-page-header>
		<!-- 页面头部内容结束 -->
		<view class="page-body">
			<!-- 页面主体内容开始 -->
			<view style="display: flex;">
				<vk-data-input-editor
					v-model="content"
					placeholder="开始输入"
					width="50%"
				></vk-data-input-editor>
				<view style="width: 50%;">
					<view style="padding: 20px;font-size: 35px;font-family: kaiti;color: red;">
						HTML效果展示
					</view>
					<view v-html="content" class="vk-data-input-editor-view" style="padding: 15px;"></view>
				</view>
			</view>

			<view class="tips">
				<view class="json-view" v-if="content">
					<pre>
						{{ content }}
					</pre>
				</view>
			</view>

			<!-- 页面主体内容结束 -->
		</view>
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	export default {
		data() {
			// 页面数据变量
			return {
				content:""
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
		onReady(){

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
			init(options){

			}
		},
		// 监听器
		watch:{

		},
		// 过滤器
		filters:{

		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>
	
</style>
