<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Input 表单输入"
			subTitle="address 省市区选择"
		></vk-data-page-header>
		<view class="page-body">
			<view class="tips">
				同时支持下拉选择 和 输入搜索
			</view>
			<view class="mt15">
				<vk-data-input-address
					v-model="form1.address1"
					placeholder="请选择省市区"
				></vk-data-input-address>
			</view>
			<view class="mt15">
				<vk-data-input-address
					v-model="form1.address2"
					placeholder="请选择省市"
					:level="2"
				></vk-data-input-address>
			</view>
			<view class="mt15">
				<vk-data-input-address
					v-model="form1.address3"
					placeholder="请选择省"
					:level="1"
				></vk-data-input-address>
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
