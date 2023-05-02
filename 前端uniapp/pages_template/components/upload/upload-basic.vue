<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Upload 上传"
			subTitle="基础用法"
		></vk-data-page-header>
		<view class="page-body">
			<vk-data-upload
				v-model="form1.images"
				:limit="6"
			></vk-data-upload>
		</view>

		<el-button @click="a">清空值</el-button>
		<el-button @click="b">设置值</el-button>

		<view class="tips mt15">
			<view class="mt15 json-view" v-if="form1">
				<view style="font-size: 14px;">表单数据</view>
				<pre>
					{{ form1 }}
				</pre>
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
				// init请求返回的数据
				data:{

				},
				// 表单请求数据
				form1:{
					images : []
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
			a(){
				that.form1.images = [];
			},
			b(){
				that.form1.images = ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608288366373&di=c8e0bb26e8a98a5dc1c869037c5f2286&imgtype=0&src=http%3A%2F%2Fimg3.iqilu.com%2Fdata%2Fattachment%2Fforum%2F201308%2F22%2F092042sk2dhz7sdzkftyc1.jpg'];
			},
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
