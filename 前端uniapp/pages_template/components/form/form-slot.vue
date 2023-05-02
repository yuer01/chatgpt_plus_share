<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单"
			subTitle="使用插糟自定义表单"
		></vk-data-page-header>

		<view class="page-body" style="max-width: 800px;margin: 0 auto;">
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:rules="form1.props.rules"
				:action="form1.props.action"
				:form-type="form1.props.formType"
				:columns='form1.props.columns'
				:loading.sync="form1.props.loading"
				label-width="140px"
				@success="onFormSuccess"
			>
				<!-- v-slot:rate 中的 rate 对应 columns中的 key, form对应 form1.data keyName 对应 columns中的 key -->
				<template v-slot:rate="{ form, keyName }">
					<view style="height: 36px;display: flex;align-items: center;">
						<el-rate v-model="form[keyName]"></el-rate>
					</view>
				</template>

				<template v-slot:footer="{ loading }">
					<el-button plain style="margin-right: 20px;width: 80px;" @click="onCancel">返回</el-button>
					<el-button :loading="loading" type="primary" style="width: 80px;" @click="submitForm">添加</el-button>
				</template>

			</vk-data-form>


			<view class="tips mt15">
				<view class="mt15 json-view" v-if="form1.data">
					<view style="font-size: 14px;">表单数据</view>
					<pre>
						{{ form1.data }}
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
					// 表单请求数据，此处可以设置默认值
					data: {

					},
					// 表单属性
					props: {
						// 表单请求地址
						action:"template/test/sys/test",
						// 表单字段显示规则
						columns:[
							{ key: "text", title:"text类型字段", type:"text" },
							{ key: "rate", title:"插糟用法", type:"text" },
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
			// 页面返回
			onCancel(){
				vk.menuTabs.closeCurrent();
			},
			// 表单提交
			submitForm(){
				that.$refs.form1.submitForm();
			},
			// 表单提交成功后
			onFormSuccess(){

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
