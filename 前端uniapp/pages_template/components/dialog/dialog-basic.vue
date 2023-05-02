<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Dialog 弹窗"
			subTitle="基础用法"
		></vk-data-page-header>
		<view class="page-body">
			<el-button @click="dialog.show1 = true">显示弹窗1</el-button>
			<el-button @click="dialog.show2 = true">显示弹窗2</el-button>
		</view>
		<view class="page-dialog">
			<!-- 页面弹窗内容开始 -->
			<vk-data-dialog
				v-model="dialog.show1"
				title="标题1"
				width="500px"
				top="14vh"
				center
				:close-on-click-modal="true"
			>
				这里是自定义内容
				<template v-slot:footer>
					<el-button @click="dialog.show1 = false">取 消</el-button>
					<el-button type="primary" @click="dialog.show1 = false">确 定</el-button>
				</template>
			</vk-data-dialog>
			
			<vk-data-dialog
				v-model="dialog.show2"
				title="标题2"
				width="500px"
				top="14vh"
				:close-on-click-modal="true"
			>
				这里是自定义内容
				<template v-slot:footer="{ close }">
					<el-button @click="close">取 消</el-button>
					<el-button type="primary" @click="close">确 定</el-button>
				</template>
			</vk-data-dialog>
			
			<!-- 页面弹窗内容开始 -->
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
				dialog:{
					
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
