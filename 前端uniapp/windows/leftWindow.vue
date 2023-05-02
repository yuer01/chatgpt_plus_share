<template>
	<scroll-view class="sidebar" :class="classCom" scroll-y="true" v-loading="!vk.getVuex('$app.inited')" :style="styleCom">
		<vk-data-menu-nav
			v-if="vk.getVuex('$app.inited')"
			:data="vk.getVuex('$app.navMenu')"
			:uniqueOpened="true"
			:collapse="vk.getVuex('$app.leftCollapse')"
			:collapse-transition="false"
			:theme="theme"
			default-menu-icon="el-icon-folder-opened"
			default-sub-menu-icon="el-icon-tickets"
			@select="select"
		></vk-data-menu-nav>
	</scroll-view>
</template>

<script>
	import config from "@/app.config.js";
	export default {
		data() {
			return {
				theme: config.theme
			}
		},
		methods: {
			select(e){

			},
		},
		// 监听属性
		watch: {
			$route: {
				immediate: true,
				handler(newRoute, oldRoute) {
					let that = this;
					let { vk } = that;
					let { path , query } = newRoute;
					let url = path + vk.pubfn.queryParams(query);
					let route = { path, query, url };
					vk.setVuex('$app.route', route);
				}
			}
		},
		// 计算属性
		computed: {
			styleCom(){
				let theme = this.theme;
				if (theme && theme.use) {
					return theme[theme.use].leftMenu;
				} else {
					return {};
				}
			},
			classCom(){
				let obj = {
					pc: vk.getVuex('$app.isPC'),
					mobile: !vk.getVuex('$app.isPC'),
					collapse: vk.getVuex('$app.leftCollapse'),
				};
				return obj;
			}
		}
	}
</script>

<style lang="scss">
	.sidebar {
		position: fixed;
		top: var(--window-top);
		width: 240px;
		height: calc(100vh - (var(--window-top)) + 50px);
		box-sizing: border-box;
		box-shadow: var(--boxShadow, 2px 0 0px rgba(0,21,4,0.2));
		border-top: var(--borderTop);
		background-color: $left-window-bg-color;
		padding-bottom: 10px;
		top: 50px;
		z-index: 998;
	}
	.sidebar.collapse{
		width: 64px;
	}
	.title {
		margin-left: 5px;
	}
	.center{
		text-align: center;
		margin-top: 100px;
	}
</style>
