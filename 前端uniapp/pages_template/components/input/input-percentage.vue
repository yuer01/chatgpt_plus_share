<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Input 表单输入"
			subTitle="percentage 百分比"
		></vk-data-page-header>
		<view class="page-body">
			<view class="tips">
				百分比 与 数字不一样的地方是<br/>
				输入框显示的是1，但值其实是0.01<br/>
			</view>
			<view class="mt15">
				百分比输入框：
				<vk-data-input-percentage
					v-model="form1.value1"
					placeholder="请输入百分比"
					:precision="2"
					:max="100"
					width="300px"
				></vk-data-input-percentage>
			</view>
			<view class="mt15">
				表单绑定的值：
				<vk-data-input-number
					v-model="form1.value1"
					:precision="4"
					width="300px"
					placeholder="请输入金额"
				></vk-data-input-number>
			</view>
			<view class="mt15 json-view" v-if="form1">
				<pre>
					{{form1}}
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
					value1:0.01
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

			}
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
