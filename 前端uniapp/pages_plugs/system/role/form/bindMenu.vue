<template>
	<vk-data-dialog
		v-model="value.show"
		:title="page.title"
		:top="page.top"
		:width="page.width"
		mode="form"
		@open="onOpen"
		@closed="onClose"
	>
		<!-- 页面主体内容开始 -->
		<vk-data-form
			v-loading="page.loading"
			ref="form1"
			v-model="form1.data"
			:form-type="value.mode"
			:rules="form1.props.rules"
			:action="form1.props.action"
			:columns="form1.props.columns"
			:loading.sync="form1.props.loading"
			:labelWidth="form1.props.labelWidth"
			:before-action="form1.props.beforeAction"
			:show-cancel="page.showCancel"
			:cancel-text="page.cancelText"
			:submit-text="page.submitText"
			@success="onFormSuccess"
		>
			<template v-slot:menuList>
				<el-tree
					ref="tree"
					:data="data.treeData"
					:node-key="data.nodeKey"
					:default-checked-keys="data.checkedKeys"
					:props="{
						children: 'children',
						label: 'label'
					}"
					show-checkbox
					default-expand-all
					expand-on-click-node
				></el-tree>
			</template>
		</vk-data-form>
		<!-- 页面主体内容结束 -->
	</vk-data-dialog>
</template>

<script>
var that;					// 当前页面对象
var vk = uni.vk; 	// vk实例
export default {
	props: {
		value: {
			Type: Object,
			default: function() {
				return {
					show: false,
					mode: "",
					item: ""
				};
			}
		}
	},
	data: function() {
		// 组件创建时,进行数据初始化
		return {
			data:{
				list:[],
				// 权限的树形结构数据
				treeData: [],
				// 默认选中的权限列表
				checkedKeys:[],
				// 树的唯一标识
				nodeKey:"menu_id",
			},
			page: {
				title: "菜单赋予",
				submitText: "确定",
				cancelText: "关闭",
				showCancel: true,
				top: "7vh",
				width:"800px",
				loading: false
			},
			form1: {
				// 表单请求数据，此处可以设置默认值
				data: {
					role_id:"",
					reset:true,
					menuList:[],
					addPermission:true
				},
				// 表单属性
				props: {
					// 表单请求地址
					action: "admin/system/role/sys/bindMenu",
					// 表单字段显示规则
					columns: [
						{ key: "addPermission", title: "同时赋予菜单内置权限", type: "switch" },
						{ key: "menuList", title: "菜单列表", type: "text", showLabel:false },
					],
					// 表单验证规则
					rules: {

					},
					labelWidth: "160px",
					beforeAction:function(formData){
						let checkedKeys = that.$refs.tree.getCheckedKeys();
						let halfCheckedKeys = that.$refs.tree.getHalfCheckedKeys();
						let allCheckedKeys = checkedKeys.concat(halfCheckedKeys);
						// 去除空属性
						for(let i = 0;i<allCheckedKeys.length;i++){
							if(vk.pubfn.isNull(allCheckedKeys[i])){
								allCheckedKeys.splice(i, 1);
								i--;
							}
						}
						formData.menuList = allCheckedKeys;
						return formData;
					}
				}
			}
		};
	},
	mounted() {
		that = this;
		that.init();
	},
	methods: {
		// 初始化
		init() {
			let { value } = that;
			that.$emit("input", value);
		},
		// 监听 - 页面打开
		onOpen() {
			that = this;
			let { value={} } = that;
			let { item } = value;
			let { role_id, role_name, menu = [] } = item;

			that.page.title = `菜单赋予（${role_name}）`;

			that.form1.data.role_id = role_id;
			that.form1.data.menuList = menu;
			if (vk.pubfn.isNotNull(that.data.treeData)){
				that.initData();
				return;
			}
			that.getList();
		},
		getList(){
			vk.callFunction({
				url: 'admin/system/menu/sys/getAll',
				loading:{ that, name:"page.loading" },
				data: {},
				success: (data) => {
					let rows = [{
						label :"全选",
						menu_id :"",
						children : data.rows
					}];
					// 渲染树
					that.data.treeData = rows;
					that.data.list = data.list;
					that.initData();
				}
			});
		},
		initData(){
			let { value={} } = that;
			let { item } = value;
			let { role_id, role_name, menu = [] } = item;

			let current = vk.pubfn.copyObject(menu);
			// 设置当前选中用户的权限列表
			// 去除所有含有子元素的权限
			for(let i in that.data.list){
				let item = that.data.list[i];
				let index = current.indexOf(item.parent_id);
				if(index > -1){
					current.splice(index, 1);
				}
			}
			that.data.checkedKeys = current;
			that.$refs.tree.setCheckedKeys(current);
		},
		// 监听 - 页面关闭
		onClose() {
			that.$refs.form1.resetForm(); // 关闭时，重置表单
		},
		// 监听 - 提交成功后
		onFormSuccess(res) {
			if (res.data.info) {
				that.$set(that.value.item, "menu", res.data.info.menu);
				that.$set(that.value.item, "stats_count_info", res.data.info.stats_count_info);
			}
			that.value.show = false; // 关闭页面
			that.$emit("success");
		}
	},
	// 监听属性
	watch: {

	},
	// 计算属性
	computed: {

	}
};
</script>

<style lang="scss" scoped>

</style>
