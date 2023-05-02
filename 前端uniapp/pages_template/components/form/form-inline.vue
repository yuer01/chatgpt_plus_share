<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单"
			subTitle="行内表单"
		></vk-data-page-header>
		<view class="page-body" style="max-width: 1200px;margin: 0 auto;">
			<vk-data-form
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				:loading.sync="form1.props.loading"
				label-width="140px"
				:inline="true"
				:columnsNumber="2"
				@cancel="onCancel"
				@success="onFormSuccess"
			></vk-data-form>
		</view>

		<view class="tips mt15">
			<view class="mt15 json-view" v-if="form1.data">
				<view style="font-size: 14px;">表单数据</view>
				<pre>
					{{ form1.data }}
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
				// 表单相关开始-----------------------------------------------------------
				form1: {
					// 表单请求数据，此处可以设置默认值
					data: {
						radio: 1,
						checkbox : [1,2]
					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"template/test/sys/test",
						// 表单字段显示规则
						columns:[
							{ key: "text", title:"text类型字段", type:"text" },
							{ key: "user_id", title:"用户选择器", type:"remote-select", placeholder:"请输入用户账号",
								action:"admin/select/kh/user"
							},

							{ key: "money", title:"money类型字段", type:"money" },
							{ key: "select", title:"select类型字段", type:"select",
								data:[
									{ value: 1, label: "选项1" },
									{ value: 2, label: "选项2" }
								]
							},
							{ key: "number", title:"number类型字段", type:"number" },
								{ key: "switch", title:"switch类型字段", type:"switch" },
							{ key: "radio", title:"radio类型字段", type:"radio" ,
								data:[
									{ value: 1, label: "选项1" },
									{ value: 2, label: "选项2" }
								]
							},
							{ key: "checkbox", title:"checkbox类型字段", type:"checkbox",
								data:[
									{ value: 1, label: "选项1" },
									{ value: 2, label: "选项2" }
								]
							},
							{ key: "textarea", title:"textarea类型字段", type:"textarea",
								autosize:{ minRows: 6, maxRows: 10 }, maxlength:200, showWordLimit:true,
								width:820
							},
						],
						// 表单验证规则
						rules: {

						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show: false,
						// 表单是否在请求中
						loading:false
					}
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
			onCancel(){
				console.log("关闭");
				vk.menuTabs.closeCurrent();
			},
			onFormSuccess(){
				console.log("表单提交成功");
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
