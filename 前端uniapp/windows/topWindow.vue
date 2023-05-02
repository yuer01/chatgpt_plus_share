<template>
	<view class="header no-user-select" v-loading="!vk.getVuex('$app.inited')" :style="'--textColor'+textColor">
		<!-- 左侧 -->
		<view class="left">
			<navigator class="logo" open-type="reLaunch" url="/">
				<image :src="vk.getVuex('$app.staticUrl.navBar.logo1')" mode="aspectFill" class="min-logo" v-show="vk.getVuex('$app.leftCollapse')"></image>
				<image :src="vk.getVuex('$app.staticUrl.navBar.logo2')" mode="aspectFill" v-show="!vk.getVuex('$app.leftCollapse')"></image>
			</navigator>
		</view>
		<!-- 右侧 -->
		<view class="right">
			<!-- 右上 -->
			<view class="right-top" :style="topMenuStyle">
				<view
					class="navbar"
					:class="{ 'navbar-mini': !matchLeftWindow, 'popup-menu': popupMenuOpened }"
				>
					<vk-data-icon
						class="menu-collapse"
						:name="vk.getVuex('$app.leftCollapse') ? 'vk-icon-zhankaicaidan':'vk-icon-shouqicaidan'"
						size="17"
						:color="textColor"
						:pointer="true"
						@click="menuCollapse"
					></vk-data-icon>
					<!-- 面包屑 -->
					<breadcrumb></breadcrumb>

					<view class="navbar-left pointer">
						<vk-data-icon
							@click="toggleSidebar"
							class="menu-icon"
							name="vk-icon-sortlight"
							size="30"
							:color="textColor"
						></vk-data-icon>
					</view>
					<view class="navbar-middle">
						<text class="title-text">{{ navigationBarTitleText }}</text>
					</view>
					<view class="navbar-right pointer">
						<view
							v-show="vk.getVuex('$user.userInfo.username')"
							@click="togglePopupMenu"
							class="navbar-user"
						>
							<view class="username">
								<text>{{ vk.getVuex("$user.userInfo.username") }}</text>
							</view>
							<vk-data-icon
								class="arrowdown"
								name="vk-icon-unfold"
								:color="textColor"
								size="13"
							></vk-data-icon>
						</view>
						<view class="vk-mask" @click="togglePopupMenu"></view>
						<view class="navbar-menu">
							<!-- #ifdef H5 -->
							<view
								v-if="vk.getVuex('$error.logs').length"
								@click="openForm('errorLog')"
								class="menu-item debug pointer"
							>
								<el-badge :value="vk.getVuex('$error.logs').length" class="item">
									<vk-data-icon
										name="el-icon-message-solid"
										size="22"
										:color="textColor"
									></vk-data-icon>
								</el-badge>
							</view>
							<!-- #endif -->
							<view
								v-if="vk.getVuex('$app.width') >= 1100 && debug"
								v-for="link in links"
								:key="link.url"
								class="menu-item text-overflow"
							>
								<vk-data-link :href="link.url" :text="link.text" />
							</view>
							<view class="menu-item text-overflow">
								<text>{{ vk.getVuex("$user.userInfo.username") }}</text>
							</view>
							<view class="menu-item" @click="openForm('updatePassword')">
								<text class="text-overflow">修改密码</text>
							</view>
							<view class="menu-item">
								<text class="logout pointer text-overflow" @click="logout">退出</text>
							</view>
							<view class="popup-menu__arrow"></view>
						</view>
					</view>
				</view>
			</view>
			<!-- 右下 -->
			<view class="right-bottom">
				<!-- tabs标签组 -->
				<vk-data-menu-tabs v-if="vk.getVuex('$app.inited')" ref="menuTabs"></vk-data-menu-tabs>
			</view>
		</view>
		<!-- 弹窗 - 错误日志 -->
		<errorLog v-model="formDatas.errorLog"></errorLog>
		<!-- 弹窗 - 修改密码 -->
		<updatePassword v-model="formDatas.updatePassword"></updatePassword>
	</view>
</template>

<script>
import config from "@/app.config.js";
import breadcrumb from "./components/breadcrumb";
import errorLog from "./components/errorLog";
import updatePassword from "./components/updatePassword";
export default {
	components: {
		breadcrumb,
		errorLog,
		updatePassword
	},
	props: {
		navigationBarTitleText: {
			type: String
		},
		matchLeftWindow: {
			type: Boolean
		},
		showLeftWindow: {
			type: Boolean
		}
	},
	data() {
		return {
			debug: config.debug,
			// 主题配置
			theme: config.theme,
			// 右侧链接,只在开发模式时显示
			links: [
				// {
				// 	text: "Admin框架文档",
				// 	url: "https://vkdoc.fsq.pub/admin/"
				// },
				// {
				// 	text: "浏览更多VK插件",
				// 	url: "https://ext.dcloud.net.cn/search?q=vk"
				// }
			],
			popupMenuOpened: false,
			tabCheck: "",
			formDatas: {}
		};
	},
	// 组件挂载完毕时
	mounted() {
		this.vk.menuTabs = this.$refs.menuTabs;
		this.checkMenuCollapse();
	},
	methods: {
		// 退出登录
		logout() {
			let that = this;
			let { vk } = that;
			vk.userCenter.logout({
				success: function(data) {
					if (typeof that.$refs.menuTabs.clear === "function") that.$refs.menuTabs.clear();
					uni.reLaunch({
						url: config.login.url
					});
				}
			});
		},
		// 左侧菜单显示和隐藏
		toggleSidebar() {
			let that = this;
			if (!that.showLeftWindow) {
				uni.showLeftWindow();
			} else {
				uni.hideLeftWindow();
			}
		},
		// 右上方菜单显示和隐藏
		togglePopupMenu() {
			let that = this;
			that.popupMenuOpened = !that.popupMenuOpened;
		},
		// 打开表单
		openForm(name) {
			let that = this;
			let { vk } = that;
			that.formDatas[name] = {
				show: true
			};
		},
		// pc状态下菜单折叠
		menuCollapse(){
			let leftCollapse = vk.getVuex('$app.leftCollapse');
			vk.setVuex('$app.leftCollapse', !leftCollapse);
			this.checkMenuCollapse();
		},
		checkMenuCollapse(){
			let leftCollapse = vk.getVuex('$app.leftCollapse');
			if (!leftCollapse) {
				// 打开
				uni.setLeftWindowStyle({
					width: '240px',
				});
			} else {
				// 折叠
				uni.setLeftWindowStyle({
					width: '64px',
				});
			}
		}
	},
	// 计算属性
	computed: {
		topMenuStyle(){
			let theme = this.theme;
			if (theme && theme.use) {
				let topMenu = theme[theme.use].topMenu;
				let {
					backgroundColor,
					textColor
				} = topMenu;
				return {
					backgroundColor,
					color:textColor
				}
			} else {
				return {}
			}
		},
		textColor(){
			let theme = this.theme;
			if (theme && theme.use) {
				return theme[theme.use].topMenu.textColor || "#999";
			} else {
				return "#999";
			}
		}
	}
};
</script>

<style lang="scss">
.header {
	height: 100px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	border-bottom: 1px solid darken($top-window-bg-color, 3%);
	background-color: $top-window-bg-color;
	color: $top-window-text-color;
	/* 左侧 */
	.left {
		width: calc(var(--window-left));
	}
	/* 右侧 */
	.right {
		width: calc(100% - var(--window-left));

		.navbar {
			font-size: 13px;
			position: relative;
			height: 100%;
			padding: 0 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.menu-icon {
			width: 30px;
			height: 30px;
			line-height: 30px;
		}
		.menu-collapse{
			width: 30px;
			height: 30px;
			line-height: 30px;
		}

		.navbar-left,
		.navbar-middle,
		.navbar-right {
			flex: 1;
		}

		.navbar-middle,
		.username {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.navbar-middle {
			text-align: center;
		}

		.username {
			max-width: 150px;
		}

		.text-overflow {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.text-overflow {
			max-width: 150px;
		}

		.title-text {
			font-size: 13px;
			line-height: 30px;
		}

		.navbar-menu {
			display: flex;
		}

		.menu-item {
			padding: 5px;
		}

		.debug {
			display: inline-block;
			position: relative;
		}

		.debug-badge {
			position: absolute;
			top: 5px;
			right: 13px;
			transform: translateY(-50%) translateX(100%) scale(0.8);
		}

		.arrowdown {
			margin-top: 4px;
			margin-left: 3px;
		}

		.navbar-right {
			display: flex;
			justify-content: flex-end;
		}

		.navbar-right .vk-mask {
			background-color: rgba(255, 255, 255, 0);
		}

		.popup-menu__arrow {
			position: absolute;
			top: -6px;
			right: 20px;
			border-width: 6px;
			margin-right: 3px;
			border-top-width: 0;
			border-bottom-color: #ebeef5;
			filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		}

		.popup-menu__arrow::after {
			content: " ";
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			border-width: 6px;
			top: 1px;
			margin-left: -6px;
			border-top-width: 0;
			border-bottom-color: #fff;
		}

		/* 大屏时，隐藏的内容 */
		.menu-icon,
		.navbar-middle,
		.navbar-user,
		.popup-menu__arrow,
		.navbar-right .vk-mask {
			display: none;
		}

		/* 小屏，显示的内容 */
		.navbar-mini .menu-icon,
		.navbar-mini .navbar-middle {
			display: block;
		}

		.navbar-mini .navbar-user {
			display: flex;
		}

		/* 小屏时，隐藏的内容 */
		.navbar-mini .menu-collapse,
		.navbar-mini .logo,
		.navbar-mini .debug,
		.navbar-mini .navbar-menu,
		.navbar-mini .navbar-menu .username,
		.navbar-mini .breadcrumb-view,
		.navbar-mini .mini-none {
			display: none;
		}

		.navbar-mini .navbar-menu {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: fixed;
			right: 20px;
			top: 50px;
			background-color: #fff;
			z-index: 999;
			padding: 0px 15px;
			margin: 5px 0;
			background-color: #fff;
			border: 1px solid #ebeef5;
			border-radius: 4px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}

		/* 小屏时，弹出下拉菜单 */
		.navbar-mini.popup-menu .navbar-menu {
			display: flex;
		}

		.navbar-mini.popup-menu .popup-menu__arrow,
		.navbar-mini.popup-menu .navbar-right .vk-mask {
			display: block;
		}
		.logout:hover {
			color: $menu-text-color-actived;
		}
	}
	/* 右上 */
	.right-top {
		height: 50px;
	}
	/* 右下 */
	.right-bottom {
		padding: 0px 12px;
		height: 50px;
		background-color: #f5f5f5;
	}
	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
		image {
			width: 100%;
			height: 50px;
			display: block;
		}
		text {
			margin-left: 8px;
		}
	}
	::v-deep .navbar .top-bar .item-content {
		color: var(--textColor);
	}
}
</style>
