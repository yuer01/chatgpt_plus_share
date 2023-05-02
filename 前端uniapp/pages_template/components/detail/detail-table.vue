<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单详情"
			subTitle="展示表单详情"
		></vk-data-page-header>

		<view class="page-body" style="max-width: 800px;margin: 0 auto;">
			<vk-data-detail-table
				:data="data"
				:columns="columns"
				size="medium"
				label-width="150px"
			></vk-data-detail-table>
		</view>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	var originalForms = {}; 					// 表单初始化数据
	export default {
		data() {
			// 页面数据变量
			return {
				// 表单相关开始-----------------------------------------------------------
				data:{
					text:"这是文本",
					money:10000,
					number:10000,
					radio:1,
					checkbox:[1,2],
					select:1,
					image:[
						"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-ddu978w24hpp7a5735/828bfb9d-d293-444c-9db7-270c279d93ea.png",
						"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-ddu978w24hpp7a5735/828bfb9d-d293-444c-9db7-270c279d93ea.png",
						"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-ddu978w24hpp7a5735/828bfb9d-d293-444c-9db7-270c279d93ea.png",
					],
					province: {
						code: "11",
						name: "北京市"
					},
					address: {
						codes: [
							"33",
							"3301",
							"330110"
						],
						names: [
							"浙江省",
							"杭州市",
							"余杭区"
						],
						text: "浙江省杭州市余杭区",
						showText: "浙江省 / 杭州市 / 余杭区",
						province: {
							code: "33",
							name: "浙江省"
						},
						city: {
							code: "3301",
							name: "杭州市"
						},
						area: {
							code: "330110",
							name: "余杭区"
						}
					},
					textarea:"啊啊啊啊是的111123",
					json:{
						a:1,
						b:"aaa"
					},
					switch:true,
					object:{
						a:1,
						b:"aaa"
					}

				},
				columns:[
					{ key:"text", title:"text类型字段", type:"text" },
					{ key:"money", title:"money类型字段", type:"money" },
					{ key:"number", title:"number类型字段", type:"number" },
					{ key:"radio", title:"radio类型字段", type:"radio" ,
						data:[
							{ value:1, label:"选项1" },
							{ value:2, label:"选项2" }
						]
					},
					{ key:"checkbox", title:"checkbox类型字段", type:"checkbox",
						data:[
							{ value:1, label:"选项1" },
							{ value:2, label:"选项2" }
						]
					},
					{ key:"select", title:"select类型字段", type:"select",
						data:[
							{ value:1, label:"选项1" },
							{ value:2, label:"选项2" }
						]
					},
					{ key:"image", title:"image类型字段", type:"image",
						limit:6
					},
					{ key:"province", title:"province类型字段", type:"province" },
					{ key:"address", title:"address类型字段", type:"address" },
					{ key:"textarea", title:"textarea类型字段", type:"textarea",
						autosize:{ minRows:6, maxRows:10 },
					},
					{ key:"json", title:"json类型字段", type:"json" },
					{ key:"switch", title:"switch类型字段", type:"switch" },
					{ key:"object", title:"object类型字段", type:"object",
						columns:[
							{ key:"text", title:"text类型字段", type:"text" },
							{ key:"switch", title:"switch类型字段", type:"switch" }
						]
					}
				]
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
			formSuccess(){

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
