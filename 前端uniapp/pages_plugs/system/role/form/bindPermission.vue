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
			<template v-slot:permissionList>
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
				info:{},
				// 权限的树形结构数据
				treeData: [],
				// 默认选中的权限列表
				checkedKeys:[],
				// 树的唯一标识
				nodeKey:"permission_id",
			},
			page: {
				title: "权限赋予",
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
					permissionList:[],
					stats_count_info:{}
				},
				// 表单属性
				props: {
					// 表单请求地址
					action: "admin/system/role/sys/bindPermission",
					// 表单字段显示规则
					columns: [
						// 常用字段类型
						{ key: "permissionList", title: "权限列表", type: "text" }
					],
					// 表单验证规则
					rules: {

					},
					labelWidth: "100px",
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
						formData.permissionList = allCheckedKeys;
						let menuNum = vk.pubfn.getData(that.data,"info.stats_count_info.type[0].count",0);
						if(typeof menuNum !== "number") menuNum = 0;
						let list = vk.pubfn.treeToArray(that.data.treeData, {
							id:"permission_id",
							parent_id:"parent_id",
							children:"children",
							deleteChildren:true
						});
						let stats_count_info = {
							// 各个分类有多少个数量
							curd_category: [
								{ type: 0, label: "未分类", count: 0 },
								{ type: 1, label: "增", count: 0 },
								{ type: 2, label: "删", count: 0 },
								{ type: 3, label: "改", count: 0 },
								{ type: 4, label: "查", count: 0 },
								{ type: 5, label: "特殊", count: 0 }
							],
							// 各个等级有多少个数量
							level: [
								{ type: 0, label: "未分类", count: 0 },
								{ type: 1, label: "子弹级", count: 0 },
								{ type: 2, label: "炸弹级", count: 0 },
								{ type: 3, label: "榴弹级", count: 0 },
								{ type: 4, label: "核弹级", count: 0 }
							],
							// 各个模式有多少个数量
							match_mode: [
								{ type: 0, label: "完整路径", count: 0 },
								{ type: 1, label: "通配符", count: 0 },
								{ type: 2, label: "正则表达式", count: 0 }
							],
							// 菜单和权限分别多少个数量
							type: [
								{ type: 0, label: "菜单", count: menuNum },
								{ type: 1, label: "权限", count: 0 }
							]
						};
						allCheckedKeys.forEach((value,index,arr)=>{
							let res = vk.pubfn.getListItem(list,"permission_id",value);
							let { curd_category=0, level=0, match_mode=0, url } = res;
							if(vk.pubfn.isNotNull(url)){
								stats_count_info["type"][1].count++;
								stats_count_info["curd_category"][curd_category].count++;
								stats_count_info["level"][level].count++;
								stats_count_info["match_mode"][match_mode].count++;
							};
						});
						formData.stats_count_info = stats_count_info;
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
			let { role_id, role_name, permission = [] } = item;
			that.page.title = `权限赋予（${role_name}）`;
			that.data.info = item;
			that.form1.data.role_id = role_id;
			that.form1.data.permissionList = permission;
			if (vk.pubfn.isNotNull(that.data.treeData)){
				that.initData();
				return;
			}
			that.getList();
		},
		getList(){
			// 执行请求
			vk.callFunction({
				url: 'admin/system/permission/sys/getAll',
				data: {},
				loading:{ that, name:"page.loading" },
			  success: (data) => {
					let rows = [{
						label :"全选",
						permission_id :"",
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
			let { menu_id, name, permission = [] } = item;
			let current = vk.pubfn.copyObject(permission);
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
				that.$set(that.value.item, "permission", res.data.info.permission);
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
