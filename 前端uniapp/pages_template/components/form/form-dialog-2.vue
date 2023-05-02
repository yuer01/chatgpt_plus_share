<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Form 表单"
			subTitle="复用同一个表单实现添加和修改"
		></vk-data-page-header>
		<view class="page-body">

			<view style="padding: 15px;color:#303133;">
				当两个表单内的字段有大部分相似时，同一个表单组件可以复用。<br/>
				通过控制 formType 可以切换表单的类型<br/>
				同时在 columns 中添加属性 show:["add"] 代表该字段只有 formType 为 "add" 时才显示
			</view>
			<el-button @click="showForm('add')">弹出添加表单</el-button>
			<el-button @click="showForm('update')">弹出修改表单</el-button>

			<view class="tips mt15">
				<view class="mt15 json-view" v-if="form1.data">
					<view style="font-size: 14px;">表单数据</view>
					<pre>
						{{ form1.data }}
					</pre>
				</view>
			</view>

		</view>
		<!-- 弹窗开始 -->
		<vk-data-dialog
			v-model="form1.props.show"
			:title="form1.props.title"
			width="600px"
			mode="form"
		>
			<vk-data-form
				ref="form1"
				v-model="form1.data"
				:action="form1.props.action"
				:columns='form1.props.columns'
				:rules="form1.props.rules"
				:form-type="form1.props.formType"
				:loading.sync="form1.props.loading"
				:auto-close="true"
				:submit-text='form1.props.submitText'
				label-width="140px"
				@success="form1.props.show = false;"
				@cancel="form1.props.show = false"
			></vk-data-form>
		</vk-data-dialog>
		<!-- 弹窗结束 -->

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
							{ key: "text", title:"text类型字段", type:"text", show:["add"] },
							{ key: "number", title:"number类型字段", type:"number", show:["add"]},
							{ key: "radio", title:"radio类型字段", type:"radio" , show:["add"],
								data:[
									{ value: 1, label: "选项1" },
									{ value: 2, label: "选项2" }
								]
							},
							{ key: "checkbox", title:"checkbox类型字段", type:"checkbox", show:["update"],
								data:[
									{ value: 1, label: "选项1" },
									{ value: 2, label: "选项2" }
								]
							},
							{ key: "textarea", title:"textarea类型字段", type:"textarea",
								autosize:{ minRows: 4, maxRows: 10 }, maxlength:200, showWordLimit:true,
							},
							{ key: "switch", title:"switch类型字段", type:"switch" },
						],
						// 表单验证规则
						rules: {

						},
						// add 代表添加 update 代表修改
						formType:'',
						// 是否显示表单1 的弹窗
						show: false,
						// 表单是否在请求中
						loading:false,
						// 表单标题
						title: '',
						submitText:''
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
			// 重置表单
			resetForm() {
				if (that.$refs.form1) that.$refs.form1.resetForm();
			},
			// 显示表单
			showForm(type){
				let { form1 } = that;
				// 先重置下表单
				that.resetForm();
				if(type === 'add'){
					form1.props.title = '添加表单';
					form1.props.submitText = '添加';
					// 此处添加的action和修改的action可以不一致
					form1.props.action = "template/test/sys/test";
				}else{
					form1.props.title = '修改表单';
					form1.props.submitText = '修改';
					// 此处添加的action和修改的action可以不一致
					form1.props.action = "template/test/sys/test";
					// 如果是修改 可以在此赋值
					form1.data = {
						checkbox: [1],
						textarea: '1111',
						switch: true
					};
				}
				form1.props.formType = type;
				form1.props.show = true;
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
