<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		<view style="padding: 40rpx;font-size: 70rpx;font-family: kaiti;">
			加载功能演示
		</view>

		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
				<view style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					区域加载:
				</view>
				<el-table v-loading="loading" :data="tableData" style="width: 100%">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

		<!-- 自定义加载的内容从这个地方开始 -->
		<el-row>
			<el-col :span="24" style="padding: 30rpx 40rpx;">
				<view style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
					自定义加载:
				</view>
				<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
				 element-loading-background="rgba(0, 0, 0, 0.8)" :data="tableData" style="width: 100%">
					<el-table-column prop="date" label="日期" width="180">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="180">
					</el-table-column>
					<el-table-column prop="address" label="地址">
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>


		<el-row>
			<el-col :span="24" style="padding: 40rpx;">
			<view style="padding: 40rpx 0rpx;font-size: 40rpx;font-family: simsun;">
				全屏加载:
			</view>
		<el-button type="primary" @click="openFullScreen1" v-loading.fullscreen.lock="fullscreenLoading">
			指令方式
		</el-button>

		<el-button type="primary" @click="openFullScreen2">
			服务方式
		</el-button>

		<el-button type="primary" @click="doudou=true">
			自定义方式
		</el-button>

		</el-col>
		</el-row>

		<!-- <view class='popContainer' v-show="doudou" @click="doudou=false">
			<el-image :draggable="false"
			style="width: 200rpx; height: 200rpx;text-align: center; margin-left: 50%; margin-top: 800rpx;"
			src="/static/icon/loading.gif"
			></el-image>
		</view> -->
		
		<view class='popContainer' v-show="doudou" @click="doudou=false">
			<div 
			class="loadingio-spinner-bean-eater-v394si28re"><div class="ldio-fk6s8i3hzwa">
			<div><div></div><div></div><div></div></div><div><div></div><div></div><div></div></div>
			</div></div>
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
				doudou:false,
				fullscreenLoading: false,
				tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				loading: true,
				// init请求返回的数据
				data: {

				},
				// 表单请求数据
				form1: {

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
			openFullScreen1() {
				this.fullscreenLoading = true;
				setTimeout(() => {
					this.fullscreenLoading = false;
				}, 2000);
			},
			openFullScreen2() {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				setTimeout(() => {
					loading.close();
				}, 2000);
			},
			openFullScreen3() {

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
	body {
		margin: 0;
	}
	.container{
		position: absolute !important;
		left: 300 !important;
	}
	view.popContainer {
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background: rgba(0, 0, 0, 0.7);
		z-index: 99999;
		user-select: none;
	}
	
	
	.loadingio-spinner-bean-eater-v394si28re{
		position: absolute;
		top:50%;
		left:50%;
		/* transform:scale(0.5) translate(-50%,-50%); */
		margin-left: -100px;
		margin-top: -100px;
		transform:scale(0.5);
	}
	
	@keyframes ldio-fk6s8i3hzwa-1 {
	    0% { transform: rotate(0deg) }
	   50% { transform: rotate(-45deg) }
	  100% { transform: rotate(0deg) }
	}
	@keyframes ldio-fk6s8i3hzwa-2 {
	    0% { transform: rotate(180deg) }
	   50% { transform: rotate(225deg) }
	  100% { transform: rotate(180deg) }
	}
	.ldio-fk6s8i3hzwa > div:nth-child(2) {
	  transform: translate(-15px,0);
	}
	.ldio-fk6s8i3hzwa > div:nth-child(2) div {
	  position: absolute;
	  top: 40px;
	  left: 40px;
	  width: 120px;
	  height: 60px;
	  border-radius: 120px 120px 0 0;
	  background: #f8b26a;
	  animation: ldio-fk6s8i3hzwa-1 1s linear infinite;
	  transform-origin: 60px 60px
	}
	.ldio-fk6s8i3hzwa > div:nth-child(2) div:nth-child(2) {
	  animation: ldio-fk6s8i3hzwa-2 1s linear infinite
	}
	.ldio-fk6s8i3hzwa > div:nth-child(2) div:nth-child(3) {
	  transform: rotate(-90deg);
	  animation: none;
	}@keyframes ldio-fk6s8i3hzwa-3 {
	    0% { transform: translate(190px,0); opacity: 0 }
	   20% { opacity: 1 }
	  100% { transform: translate(70px,0); opacity: 1 }
	}
	.ldio-fk6s8i3hzwa > div:nth-child(1) {
	  display: block;
	}
	.ldio-fk6s8i3hzwa > div:nth-child(1) div {
	  position: absolute;
	  top: 92px;
	  left: -8px;
	  width: 16px;
	  height: 16px;
	  border-radius: 50%;
	  background: #e15b64;
	  animation: ldio-fk6s8i3hzwa-3 1s linear infinite
	}
	.ldio-fk6s8i3hzwa > div:nth-child(1) div:nth-child(1) { animation-delay: -0.67s }
	.ldio-fk6s8i3hzwa > div:nth-child(1) div:nth-child(2) { animation-delay: -0.33s }
	.ldio-fk6s8i3hzwa > div:nth-child(1) div:nth-child(3) { animation-delay: 0s }
	.loadingio-spinner-bean-eater-v394si28re {
	  width: 200px;
	  height: 200px;
	  display: inline-block;
	  overflow: hidden;
	  background: transparent;
	}
	.ldio-fk6s8i3hzwa {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  transform: translateZ(0) scale(1);
	  backface-visibility: hidden;
	  transform-origin: 0 0; /* see note above */
	}
	.ldio-fk6s8i3hzwa div { box-sizing: content-box; }

</style>
