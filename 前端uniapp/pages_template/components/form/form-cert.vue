<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="证书转换"
			subTitle="快速将证书内容变成1行字符串"
		></vk-data-page-header>
		<view class="page-body" style="max-width: 800px;margin: 0 auto;">
			<el-input v-model="form1.content" type="textarea" :rows="20" placeholder="请将证书内容粘贴到此处"></el-input>
			<view style="margin-top: 20px;">
				<el-button type="primary" @click="copy">复制证书内容（一行字符串形式）</el-button>
			</view>
			<view class="tips mt15">
				<view class="mt15 json-view" v-if="form1">
					<view style="font-size: 14px;">证书内容</view>
					<pre>
						{{ form1 }}
					</pre>
				</view>
			</view>

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
				// 表单相关开始-----------------------------------------------------------
				form1: {
					content: "",
				},
				// 表单相关结束-----------------------------------------------------------

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

			},
			copy(){
				let str = JSON.stringify(this.form1);
				let content = str.substring(12,str.length-2);
				uni.setClipboardData({
					data: content,
					success: function () {
						vk.toast("复制成功");
					}
				});
			}
		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>

</style>
