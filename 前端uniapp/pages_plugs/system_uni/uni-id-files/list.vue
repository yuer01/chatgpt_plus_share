<template>
	<view class="page-body">
		<!-- 页面内容开始 -->
		<view class="header">
			<view class="header-item" style="margin-left:0;">
				<el-button type="primary" :round="false" size="small" icon="el-icon-plus upload-btn" @click="uploadFile" > 上传 </el-button>
			</view>
			<view class="header-item">
				<el-radio-group v-model="queryForm1.formData.type" size="small" @change="getList">
					<el-radio-button label="image">图片</el-radio-button>
					<el-radio-button label="video">视频</el-radio-button>
					<el-radio-button label="other">其他</el-radio-button>
				</el-radio-group>
			</view>
			<view class="header-item">
				<el-input class="search-input input-border-radius-4004" size="small" type="text" clearable placeholder="请输入名称搜索..." v-model="queryForm1.formData.display_name" @keyup.enter.native="getList" @clear="getList" />
				<el-button type="primary" :loading="loading.main" :round="false" size="small" icon="el-icon-search" @click.stop="getList" style="border-radius: 0 4px 4px 0;" ></el-button>
			</view>
			<view class="header-item">
				<el-input class="search-input input-border-radius-4004" size="small" type="text" clearable placeholder="请输入URL搜索..." v-model="queryForm1.formData.url" @keyup.enter.native="getList" @clear="getList" />
				<el-button type="primary" :loading="loading.main" :round="false" size="small" icon="el-icon-search" @click.stop="getList" style="border-radius: 0 4px 4px 0;" ></el-button>
			</view>
		</view>
		<view class="nav" v-loading="loading.nav">
			<view
				class="nav-list"
				v-for="(item, index) of data.navList" :key="index"
				:class="queryForm1.formData.category_id == item._id ? 'selected-nav' : ''"
				@click.stop="queryByCategory(item._id)"
			>
				<text class="nav-name text-one">{{ item.name }}</text>
				<view class="nav-btn">
					<view v-if="index > 1" class="btn el-icon-edit" @click.stop="vk.pubfn.openForm('updateCategory', { item })" ></view>
					<el-popconfirm v-if="index > 1" title="确定删除该分组吗？（组内图片不会删除）" @confirm="deleteCategory(item._id, index)" >
						<view slot="reference" class="btn el-icon-delete" @click.stop="stop"></view>
					</el-popconfirm>
				</view>
			</view>

			<view class="add-group" @click.stop="vk.pubfn.openForm('addCategory')">添加分组</view>
		</view>
		<view class="main" v-loading="loading.main">
			<!-- 内容详情 -->
			<view
				class="content-item"
				:class="[selectedIds.includes(item._id) ? 'choose-image' : '']"
				v-for="(item, index) in data.content.rows" :key="index"
				@click.stop="clickFile(item)"
			>
				<view class="item-file">
					<image :src="item.url" mode="aspectFit" v-if="item.type === 'image'"></image>
					<view class="vk-contents" v-else-if="item.type === 'video'">
						<image :src="item | coverImageFilter" mode="aspectFit"></image>
						<view class="duration">{{ item.duration | durationFilter }}</view>
						<view class="size">{{ item.size | sizeFilter(["B","KB","MB","GB"],1024,1,"MB") }}</view>
						<vk-data-icon :name="item.play ?'el-icon-video-pause':'el-icon-video-play'" size="40" color="#d9d9d9" class="video-play-btn" @click="preview(item)"></vk-data-icon>
					</view>

					<view :src="item.url" class="other-icon" v-else>
						<vk-data-icon name="el-icon-document" size="80" color="#d5d5de"></vk-data-icon>
						<view class="size">{{ item.size | sizeFilter(["B","KB","MB","GB"],1024,1) }}</view>
						<view class="suffix">{{ item.original_name | suffixFilter }}</view>
					</view>
				</view>
				<view class="tips">
					<text class="title">{{ item.display_name }}</text>
					<text class="operation" v-if="item.type === 'video'" @click="vk.pubfn.openForm('updateVideo', { item })">编辑</text>
					<text class="operation" v-else @click="vk.pubfn.openForm('updateFileName', { item })">改名</text>
					<el-tooltip class="operation" placement="bottom">
						<text>链接</text>
						<view slot="content">
							<view style="text-align: center;">
								<el-button type="text" @click="copyFileUrl(item.url)" style="margin-left: 0px;"> 复制 </el-button>
								<el-button type="text" @click="preview(item)" style="margin-left: 30px;"> 预览 </el-button>
							</view>
							<view>{{ item.url }}</view>
						</view>
					</el-tooltip>
					<text class="operation" @click="vk.pubfn.openForm('updateFileCategory', { item, list: data.navList })" > 分组 </text>
					<el-popconfirm class="operation" title="确定删除吗？" @confirm="deleteFile(item._id)">
						<text slot="reference" @click.stop="stop">删除</text>
					</el-popconfirm>
				</view>
			</view>
			<!-- 上传的按钮 -->
			<view class="update-img" @click.stop="uploadFile"></view>
		</view>
		<view class="footer" :class="selectedIds.length ? '' : 'no-selected'">
			<label :style="data.content.rows.length ? '' : 'pointer-events: none;'" class="footer-label" @click.stop="selectAll" >
				<checkbox style="transform: scale(0.6);" class="checkbox" :checked="selectedIds.length ? true : false" />
				<text>已选</text>
				<text class="num">{{ selectedIds.length }} / {{ data.content.rows.length }}</text>
				<text>项</text>
			</label>
			<text class="footer-item" @click.stop=" vk.pubfn.openForm('updateFileCategory', { item: { _id: selectedIds }, list: data.navList }) " >
				保存到组
			</text>
			<el-popconfirm class="footer-item" title="确定删除吗？" @confirm="deleteFile(selectedIds)" >
				<text slot="reference">删除</text>
			</el-popconfirm>
			<!-- 底部分页内容 -->
			<el-pagination
				class="paging"
				background
				:total="data.content.total"
				:current-page="queryForm1.pageIndex"
				:page-size="queryForm1.pageSize"
				:page-sizes="[30, 50, 100]"
				:pager-count="5"
				layout="total, sizes, prev, pager, next, jumper"
				@size-change=" val => { queryForm1.pageSize = val; getList(); } "
				@current-change=" val => { queryForm1.pageIndex = val; getList(); } "
			></el-pagination>
		</view>
		<!-- 页面内容结束 -->

		<!-- 弹窗列表 -->
		<addCategory v-model="formDatas.addCategory" @success="getNavList"></addCategory>
		<updateCategory v-model="formDatas.updateCategory"></updateCategory>
		<updateFileCategory v-model="formDatas.updateFileCategory" @success="getList();selectedIds = [];"></updateFileCategory>
		<updateFileName v-model="formDatas.updateFileName"></updateFileName>
		<updateVideo v-model="formDatas.updateVideo"></updateVideo>
		<preview v-model="formDatas.preview"></preview>

	</view>
</template>

<script>
var that; // 当前页面对象
var vk = uni.vk; // vk实例

import addCategory from "./form/addCategory";
import updateCategory from "./form/updateCategory";
import updateFileCategory from "./form/updateFileCategory";
import updateFileName from "./form/updateFileName";
import updateVideo from "./form/updateVideo";
import preview from "./form/preview";

export default {
	components: {
		addCategory,
		updateCategory,
		updateFileCategory,
		updateFileName,
		updateVideo,
		preview
	},
	data() {
		// 页面数据变量
		return {
			// 选中的
			selectedIds: [],
			// 页面是否请求中或加载中
			loading: {
				nav: false,
				main: false
			},
			// init请求返回的数据
			data: {
				// 分组列表
				navList: [],
				// 文件数据
				content: {
					rows: [],
					total: 0
				}
			},
			// 查询表单
			queryForm1: {
				pageIndex: 1,
				pageSize: 30,
				formData: {
					display_name: "",
					category_id: "",
					type: "image"
				},
				columns: [
					{ key: "display_name", title: "名称", type: "text", mode: "%%" },
					{ key: "url", title: "URL", type: "text", mode: "=" },
					{ key: "category_id", title: "分类id", type: "text", mode: "=" },
					{ key: "type", title: "文件类型", type: "text", mode: "=" }
				]
			},
			formDatas: {}
			// 表单相关开始 -----------------------------------------------------------
		};
	},
	// 监听 - 页面每次【加载时】执行(如：前进)
	onLoad(options = {}) {
		that = this;
		vk = that.vk;
		that.options = options;
		that.init(options);
	},
	// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
	onReady() {},
	// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
	onShow() {},
	// 监听 - 页面每次【隐藏时】执行(如：返回)
	onHide() {},
	// 函数
	methods: {
		// 页面数据初始化函数
		init(options) {
			that.getNavList();
			that.getList();
		},
		// 获取文件列表
		getList() {
			let { queryForm1, selectedIds } = that;
			vk.callFunction({
				url: "admin/system_uni/uni-id-files/files/kh/getList",
				loading: { that, name: "loading.main" },
				data: queryForm1,
				success: function(data) {
					that.data.content = data;
					selectedIds.length = 0;
				}
			});
		},
		// 获取分类列表
		getNavList() {
			vk.callFunction({
				url: "admin/system_uni/uni-id-files/categories/kh/getList",
				loading: { that, name: "loading.nav" },
				data: {
					pageIndex: 1,
					pageSize: 100
				},
				success: function(data) {
					that.data.navList = [
						{ _id: "", name: "全部" },
						{ _id: "null", name: "未分组" },
						...data.rows
					];
				}
			});
		},
		// 查询指定分类下的文件列表
		queryByCategory(category_id) {
			if (that.queryForm1.formData.category_id != category_id) {
				that.queryForm1.formData.category_id = category_id;
				that.getList();
			}
		},
		// 删除分组
		deleteCategory(_id, index) {
			vk.callFunction({
				url: "admin/system_uni/uni-id-files/categories/sys/delete",
				loading: { that, name: "loading.nav" },
				data: {
					_id
				},
				success: function(data) {
					that.data.navList.splice(index, 1);
				}
			});
		},
		// 删除
		deleteFile(ids) {
			vk.callFunction({
				url: "admin/system_uni/uni-id-files/files/kh/delete",
				title:"请求中...",
				data: {
					_id: ids
				},
				success: function(data) {
					if(data.num>0){
						if (typeof ids !== "object") ids = [ids];
						ids.map(id => {
							let index = vk.pubfn.getListIndex(that.data.content.rows, "_id", id);
							if (index > -1) {
								that.data.content.rows.splice(index, 1);
							}
						});
						that.selectedIds = [];
					}
				}
			});
		},
		uploadFile(){
			let type = that.queryForm1.formData.type;
			let fileType;
			let extension = [];
			if(type === "image"){
				extension = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
				fileType = "image";
			}else if(type === "video"){
				extension = ["avi", "mp3", "mp4", "3gp", "mov", "rmvb", "rm", "flv", "mkv"];
				fileType = "video";
			}else if(type === "other"){
				extension = ["txt","pdf","xls","xlsx","ppt","pptx","doc","docx","rar","zip"];
			}
			uni.chooseFile({
				extension,
				success: res => {
					vk.showLoading("上传中...");
					let tasks = [];
					for (let i in res.tempFilePaths) {
						tasks.push(
							new Promise(function(resolve, reject){
								vk.callFunctionUtil.uploadFile({
									filePath: res.tempFilePaths[i],
									file: res.tempFiles[i],
									needSave: true,
									fileType,
									category_id: that.queryForm1.formData.category_id,
									addSuccess:function(res){
										// 等保存到数据库后才执行resolve
										resolve(res);
									}
								});
							})
						);
					}
					Promise.all(tasks)
						.then(res1 => {
							vk.hideLoading();
							that.getList();
						})
						.catch(err => {
							vk.hideLoading();
							console.error(err);
						});
				}
			});
		},
		// 复制文件的URL
		copyFileUrl(data) {
			uni.setClipboardData({
				data,
				success: res => {
					that.$message({
						message: "URL已复制",
						type: "success"
					});
				}
			});
		},
		// 预览
		preview(item){
			let { type, url } = item;
			if(type === "image"){
				vk.pubfn.openForm('preview', { item })
			}else if(type === "video"){
				vk.pubfn.openForm('preview', { item })
			}else{
				vk.toast("暂不支持该类型文件的预览");
			}
		},
		// 点击了文件
		clickFile(item) {
			let index = that.selectedIds.indexOf(item._id);
			if (index > -1) {
				that.selectedIds.splice(index, 1);
			} else {
				that.selectedIds.push(item._id);
			}
		},
		// 全选
		selectAll() {
			if (that.selectedIds.length &&that.data.content.rows.length == that.selectedIds.length) {
				that.selectedIds = [];
			} else {
				that.data.content.rows.forEach((value, index, arr) => {
					if (!that.selectedIds.includes(value._id)) {
						that.selectedIds.push(value._id);
					}
				});
			}
		},
		stop() {}
	},
	watch: {},
	// 过滤器
	filters: {
		suffixFilter(name=""){
			let arr = name.split(".");
			return arr[arr.length-1];
		},
		coverImageFilter(item){
			let src = "";
			let { cover_image, url, width=600, height=600 } = item;
			if(cover_image){
				src = cover_image;
			}else{
				src = `${url}?x-oss-process=video/snapshot,t_1000,f_jpg,w_${width},h_${height},m_fast`;
			}
			return src;
		},
		durationFilter(value){
			let result = parseInt(value);
			let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
			let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
			let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
			return `${h}:${m}:${s}`;
		}
	},
	// 计算属性
	computed: {}
};
</script>
<style lang="scss" scoped>
page,
.page-body {
	width: 100%;
	height: 100%;
}
// 页面主体内容区域
.page-body {
	display: grid;
	grid-template-columns: 180px auto;
	grid-template-rows: 35px auto 40px;
	grid-gap: 8px 0px;
	position: relative;
}
.header {
	display: flex;
	align-items: center;
	grid-column: 1 / -1;
	font-size: 14px;
	.el-button {
		height: 32px;
	}
}
// 搜索
.header-item {
	margin-left: 20px;
	height: 100%;
	display: flex;
	border-radius: 4px;
	overflow: hidden;
	.search-input {
		width: 200px;

	}
	.el-button {
		height: 32px;
	}
}


.nav {
	height: 100%;
	grid-row: 2 / -1;
	border: 1px solid #e4e2e2;
	display: grid;
	grid-template-rows: repeat(auto-fill, 40px);
	color: #59607b;
	font-size: 12px;
	overflow-y: auto;
	box-sizing: border-box;
	padding-bottom: 10px;
}
.nav-list {
	cursor: pointer;
	border-bottom: 1px solid #e4e2e2;
	box-sizing: border-box;
	height: 40px;
	overflow: hidden;
	transition: all 0.3s;
	background-color: #f6f4f4;
	padding-left: 10px;
	display: flex;
	align-items: center;
	> i {
		font-size: 13px;
		place-self: center;
	}
	&:hover {
		color: #108ee9;
	}
	.nav-name {
		flex: 1;
	}
	.nav-btn {
		width: 44px;
		display: flex;
		align-items: center;
		.btn {
			width: 22px;
			display: block;
		}
	}
}

// 选中的分栏
.selected-nav {
	background-color: #ecf6fd !important;
	color: #108ee9 !important;
}
// 添加分组的按钮
.add-group {
	width: 60%;
	margin: 5px auto;
	padding: 5px 0px;
	text-align: center;
	border: 1px dashed #108ee9;
	color: #108ee9;
	cursor: pointer;
}
.add-group:hover {
	background-color: #108ee9;
	color: #ffffff;
	opacity: 0.9;
}
.add-group:active {
	background-color: #108ee9;
	color: #ffffff;
}
// 内容详情
.main {
	display: grid;
	grid-template-columns: repeat(auto-fill, 135px);
	grid-template-rows: repeat(auto-fill, 180px);
	grid-gap: 20px;
	place-content: start center;
	overflow-y: auto;
	min-width: 700px;
}
.update-img,
.content-item {
	width: 135px;
	height: 180px;
	border: 1px solid #e4e2e2;
	cursor: pointer;
	background-color: transparent;
	transition: all 0.25s;
	position: relative;
	overflow: hidden;
}
// 被选中的
.choose-image {
	background-color: #ecf6fd !important;
	border: 1px solid #daedff;
	.tips{
		background-color: #ecf6fd;
	}
}
.content-item:hover {
	background-color: #ecf6fd;
	border: 1px solid #daedff;
}
.item-file {
	width: 100%;
	height: 150px;
	position: relative;
	image {
		width: 100%;
		height: 100%;
	}
	.suffix{
		position: absolute;
		top:2px;
		right: 6px;
		font-size: 12px;
		color: #a7a7a7;
	}
	.duration{
		position: absolute;
		bottom:0px;
		left: 0px;
		font-size: 12px;
		color: #FFFFFF;
		background-color: #b2b2b2;
		padding: 0px 2px;
	}
	.size{
		position: absolute;
		bottom:0px;
		right: 0px;
		font-size: 12px;
		color: #FFFFFF;
		background-color: #b2b2b2;
		padding: 0px 2px;
	}
	.video-play-btn{
		position: absolute;
		top:54px;
		left:47px;
		background-color: rgba(66,66,66,0.6);
		border-radius: 50%;
	}

	.other-icon{
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}
}
.content-item:hover > .tips {
	transform: translateY(0%) !important;
}
// 上传按钮
.update-img {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: #d5d5de;
	&::before {
		line-height: 1;
		font-size: 45px;
		content: "+";
	}
	&::after {
		content: "上传";
		font-size: 12px;
	}
}
.tips {
	position: absolute;
	height: 60px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	background-color: #fff;
	transition: all 0.4s;
	transform: translateY(50%);
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-gap: 5px 0px;
	font-size: 13px;
	place-items: center;
}
.title {
	text-align: center;
	grid-column: 1 / -1;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.operation {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		color: #108ee9;
	}
}
// 保存到组、删除、下载链接
.footer {
	background-color: #f4faff;
	display: flex;
	align-items: center;
	font-size: 12px;
	color: #3091f2;
}
.paging {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.footer-item {
	padding: 2px 9px;
	border: 1px solid #3091f2;
	margin-left: 8px;
	cursor: pointer;
	background-color: #ffffff;
}

.no-selected {
	.footer-item {
		pointer-events: none;
		color: #ced0d5;
		background-color: #fff;
		border-color: #ebeef5 !important;
	}
}

.footer-label {
	display: flex;
	align-items: center;
	user-select: none;
	color: #59607b;
	.checkbox {
		margin: 0;
		padding: 0;
		outline: none;
	}
}
.num {
	min-width: 50px;
	text-align: center;
	margin: 0 10px;
	color: #3091f2;
}
</style>
