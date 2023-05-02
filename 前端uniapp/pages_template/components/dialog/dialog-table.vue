<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Dialog 弹窗"
			subTitle="弹窗表格"
		></vk-data-page-header>
		<view class="page-body">
			<el-button @click="show = true">显示弹窗</el-button>
		</view>
		<view class="page-dialog">
			<!-- 页面弹窗内容开始 -->
			<vk-data-dialog
				v-model="show"
				title="标题"
				width="900px"
				top="14vh"
				center
				:close-on-click-modal="true"
			>
				<!-- 表格组件开始 -->
				<vk-data-table
					:data="table1.data"
					:columns="table1.columns"
					:max-height="500"
				></vk-data-table>
				<!-- 表格组件结束 -->
				<template v-slot:footer>
					<el-button @click="show = false">取 消</el-button>
					<el-button type="primary" @click="show = false">确 定</el-button>
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
				show:false,
				table1:{
					// 字段显示规则
					columns: [
						{ key: "_id" , title: "用户ID" , type: "text" , width: 200 },
						{ key: "username" , title: "用户名" , type: "text" , minWidth: 200 },
						{ key: "nickname" , title: "用户昵称" , type: "text" , minWidth: 200 },
						{ key: "mobile" , title: "手机号" , type: "text" , width: 200 },
					],
					// 表格数据
					data:[
						{
							_id:"001",
							username:`用户名001`,
							nickname:`用户昵001`,
							mobile:`尾号001`,
						},
						{
							_id:"002",
							username:`用户名002`,
							nickname:`用户昵002`,
							mobile:`尾号002`,
						},
						{
							_id:"003",
							username:`用户名003`,
							nickname:`用户昵003`,
							mobile:`尾号003`,
						},
					],
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
