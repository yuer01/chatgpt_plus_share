<template>
	<view class="page-body">
		<!-- 页面内容开始 -->

		【腾讯文档】如何组队chatGPT4账号<br/>
		<a href="https://docs.qq.com/doc/DRHNiZHloaWFobXpi" target="_blank">https://docs.qq.com/doc/DRHNiZHloaWFobXpi</a>
		
		<br/><br/>
		【腾讯文档】组队账号常见问题<br/>
		<a href="https://docs.qq.com/doc/DRFNIU0xpZmpSTWNG" target="_blank">https://docs.qq.com/doc/DRFNIU0xpZmpSTWNG</a>
		<br/><br/>
		【腾讯文档】chatgpt免费共享账号（网上的，可能有的无效了）<br/>
		<a href="https://docs.qq.com/sheet/DREhmVENLeFJiTkdY?tab=BB08J2" target="_blank">https://docs.qq.com/sheet/DREhmVENLeFJiTkdY?tab=BB08J2</a>
		
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
				// init请求返回的数据
				data:{

				},
				// 表单请求数据
				form1:{

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
				
			
			},
			pageTo(path){
				vk.navigateTo(path);
			},
      load(e){
        console.log(1,e);
      },
      error(e){
        console.log(2,e);
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
