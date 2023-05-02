<template>
	<view class="vk-data-input-editor" :style="[style_obj,styleCom]" @tap="close_popup">
		<view class='wrapper'>
			<view class='toolbar' @tap="format">
				<!-- 选着文本颜色面板 -->
				<view class="text_color"><text :style="`backgroundColor:${item1}`" v-for="(item1,index1) of choice_color_list" :key="index1" @click="change_text_color(index1)"></text>
				</view>
				<!-- 选着背景颜色面板 -->
				<view class="bg_color"><text :style="`backgroundColor:${item1}`" v-for="(item1,index1) of choice_color_list" :key="index1" @click="change_bg_color(index1)"></text>
				</view>
				<!-- 文字颜色 -->
				<view style="color:var(--text_color)" :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color" data-name="color"
				 data-value="#0000ff" @tap.stop="text_color"></view>
				<!-- 背景色 -->
				<view style="color:var(--bg_color)" :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''" class="iconfont icon-fontbgcolor"
				 data-name="backgroundColor" data-value="#00ff00"  @tap.stop="bg_color"></view>
				<!-- 文字加粗 -->
				<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold"></view>
				<!-- 文字倾斜 -->
				<view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view>
				<!-- 下划线 -->
				<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian" data-name="underline"></view>
				<!-- 中划线 -->
				<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian" data-name="strike"></view>
				<!-- 左对齐 -->
				<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi" data-name="align"
				 data-value="left"></view>
				 <!-- 居中 -->
				<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi" data-name="align"
				 data-value="center"></view>
				 <!-- 右对齐 -->
				<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi" data-name="align"
				 data-value="right"></view>
				 <!-- 两端对齐 -->
				<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi" data-name="align"
				 data-value="justify"></view>
				 <!-- 行高 -->
				<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height" data-name="lineHeight"
				 data-value="2"></view>
				 <!-- 文字间距 -->
				<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing" data-name="letterSpacing"
				 data-value="2em"></view>
				 <!-- margin-top -->
				<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju" data-name="marginTop"
				 data-value="20px"></view>
				<!-- margin-bottom -->
				<view :class="formats.previewarginBottom ? 'ql-active' : ''" class="iconfont icon-723bianjiqi_duanhouju"
				 data-name="marginBottom" data-value="20px"></view>
				<!-- 选择字体 -->
				<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font" data-name="fontFamily" data-value="Pacifico"></view>
				<!-- 调整字体大小 -->
				<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize" data-name="fontSize"
				 data-value="24px" @tap.stop="change_font">
					<!-- 字号大小选择器 -->
					<view class="fontSize">
						<text v-for="(item2,index2) of fontSize_list" :key="index2" @tap="change_font_size(index2)">{{item2.type}}</text>
					</view>
				 </view>
				<!-- 当前日期 -->
				<view class="iconfont icon-date">
					<!-- 时间选着器 -->
					<el-date-picker class="el-date-picker" v-model="formatDate" type="datetime" @change="determine_time"></el-date-picker>
				</view>

				<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
				<!-- 列表 数字 -->
				<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie" data-name="list"
				 data-value="ordered"></view>
				<!-- 列表 点 -->
				<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
				 data-value="bullet"></view>
				<!-- 取消缩进 -->
				<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
				<!-- 缩进 -->
				<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
				<!-- 分割线 -->
				<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
				<!-- 上传图片 -->
				<view class="iconfont icon-charutupian" @tap="insertImage"></view>
				<!-- 上传视频 -->
				<!-- <view class="icon el-icon-video-camera" @tap="insertVideo"></view> -->
				<!-- H1 -->
				<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1" data-name="header"
				 :data-value="1" @tap.stop="trade_name">
					<!-- 字号大小选择器 -->
					<view class="header_size">
						<text v-for="(item2,index2) of header_list" :key="index2" @tap="trade_name_size(index2)">{{item2}}</text>
					</view>
				</view>
				 <!-- 下标 -->
				<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao" data-name="script"
				 data-value="sub"></view>
				<!-- 上标 -->
				<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao" data-name="script"
				 data-value="super"></view>
				<!-- 清空 -->
				<view class="iconfont icon-shanchu" @tap="clear"></view>
				<!-- 左右颠倒 -->
				<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl" data-name="direction"
				 data-value="rtl"></view>
				<!-- 撤销 -->
				<view class="iconfont icon-undo" @tap="undo"></view>
				<!-- 恢复撤销 -->
				<view class="iconfont icon-redo" @tap="redo"></view>
				<!-- 清除格式 -->
				<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
			</view>

			<editor
				:id="editorId"
				class="ql-container"
				:placeholder="placeholder"
				showImgSize
				showImgToolbar
				showImgResize
				:read-only="disabledFn()"
				@statuschange="onStatusChange"
				@ready="onEditorReady"
				@input="onInput"
			></editor>
		</view>
	</view>
</template>

<script>
	// 颜色表
	const choice_color_list = ["#000000","#e60000","#ff9900","#ffff00","#008a00","#0066cc","#9933ff","#ffffff","#facccc","#ffebcc","#ffffcc","#cce8cc","#cce0f5","#ebd6ff","#bbbbbb","#f06666","#ffc266","#ffff66","#66b966","#66a3e0","#c285ff","#888888","#a10000","#b26b00","#b2b200","#006100","#0047b2","#6b24b2","#444444","#5c0000","#663d00","#666600","#003700","#002966","#3d1466"];
	const header_list = ["h1","h2","h3","h4","h5","h6"];
	const fontSize_list = [{
		type: "小",
		size: "12px"
	},{
		type: "正常",
		size: "16px"
	},{
		type: "大",
		size: "18px"
	},{
		type: "超大",
		size: "22px"
	}];
	export default {
		name: 'vk-data-input-editor',
		props: {
			value:{},
			// 是否只读
			disabled: {
				type: Boolean,
				default:false
			},
			placeholder: {
				type: String,
				default:"开始输入..."
			},
			width: {
				type: [String,Number],
				default:"100%"
			},

		},
		data: function() {
			// 组件创建时,进行数据初始化
			return {
				choice_color_list,
				header_list,
				fontSize_list,
				formatDate: '',
				pickerOptions: {
				  disabledDate(time) {
				    return time.getTime() > Date.now();
				  },
				  shortcuts: [{
				    text: '今天',
				    onClick(picker) {
				      picker.$emit('pick', new Date());
				    }
				  }, {
				    text: '昨天',
				    onClick(picker) {
				      const date = new Date();
				      date.setTime(date.getTime() - 3600 * 1000 * 24);
				      picker.$emit('pick', date);
				    }
				  }, {
				    text: '一周前',
				    onClick(picker) {
				      const date = new Date();
				      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				      picker.$emit('pick', date);
				    }
				  }]
				},
				style_obj: {
					"--bg_color":"#000000",
					"--bg_opacity":0,
					"--text_color": "#000000",
					"--text_opacity":0,
					"--font_size_display":0,
					"--header_display":0
				},
				formats: {},
				editorId:"vk-editor"
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			// 初始化
			init(){
				let that = this;
				let { vk } = that;
				that.editorId = vk.pubfn.random(32,"abcdefghijklmnopqrstuvwxyz");
			},
			onInput(e){
				let { detail } = e;
				let { html, text, delta } = detail;
				this.$emit('input',html);
				this.inputTime = Date.now();
			},
			onEditorReady() {
				let that = this;
				let { value, editorId } = that;
				const query = uni.createSelectorQuery().in(that);
				query.select('#'+editorId).context((res) => {
					if(res){
						that.editorCtx = res.context;
						if(value){
							that.editorCtx.setContents({
								html: value
							});
						}
					}
				}).exec();
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name || name=="color" || name==="backgroundColor" || name ==="header") return;
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						// console.log('insert divider success')
					}
				})
			},
			clear() {
				let that = this;
				let disabled = that.disabledFn();
				if(disabled) return false;
				that.editorCtx.clear({
					success: function(res) {
						// console.log("clear success")
					}
				})
			},
			removeFormat() {
				let that = this;
				let disabled = that.disabledFn();
				if(disabled) return false;
				that.editorCtx.removeFormat();
				// 将文本颜色和背景颜色变化原来的颜色
				that.style_obj["--bg_color"] = "#000000";
				that.style_obj["--text_color"] = "#000000";
			},
			insertDate() {
				/*
				 this.editorCtx.insertText({
				 	text: formatDate
				 })
				 */
			},
			insertImage() {
				let that = this;
				let { vk } = that;
				let disabled = that.disabledFn();
				if(disabled) return false;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// 上传图片到云储存
						vk.callFunctionUtil.uploadFile({
							title:"上传中...",
							filePath: res.tempFilePaths[0],
							fileType: "image",
							success(res) {
								let imageUrl = res.fileID;
								that.editorCtx.insertImage({
									src: imageUrl,
									alt: "image",
									extClass:"vk-data-editor-image",
									success: function() {

									}
								});
							}
						});
					}
				})
			},
			insertVideo() {
				let that = this;
				let { vk } = that;
				let disabled = that.disabledFn();
				if(disabled) return false;
				uni.chooseVideo({
					count: 1,
					success: (res) => {
						// 上传视频到云储存
						vk.callFunctionUtil.uploadFile({
							title:"上传中...",
							filePath: res.tempFilePath,
							fileType: "video",
							success(res) {
								let imageUrl = res.fileID;
								// 目前 uniapp 的原生富文本 没有 insertVideo api
								that.editorCtx.insertVideo({
									src: imageUrl,
									alt: "video",
									extClass:"vk-data-editor-video",
									success: function() {

									}
								});
							}
						});
					}
				})
			},
			text_color(){
				let that = this;
				// 关闭字号大小和字体粗细
				that.style_obj["--header_display"] = 0;
				that.style_obj["--font_size_display"] = 0;
				that.style_obj["--bg_opacity"] = 0;

				if(that.style_obj["--text_opacity"]){
					that.style_obj["--text_opacity"] = 0;
				}else{
					that.style_obj["--text_opacity"] = 1;
				};
			},
			change_text_color(index){
				let that = this;
				let color = that.choice_color_list[index];
				that.editorCtx.format("color", color);
				that.style_obj["--text_opacity"] = 0;
				if(color === "#ffffff"){
					that.style_obj["--text_color"] = "#efebeb";
				}else{
					that.style_obj["--text_color"] = color;
				};
			},
			bg_color(){
				let that = this;
				// 关闭字号大小和字体粗细
				that.style_obj["--header_display"] = 0;
				that.style_obj["--font_size_display"] = 0;
				that.style_obj["--text_opacity"] = 0;

				if(that.style_obj["--bg_opacity"]){
					that.style_obj["--bg_opacity"] = 0;
				}else{
					that.style_obj["--bg_opacity"] = 1;
				};
			},
			change_bg_color(index){
				let that = this;
				let color = that.choice_color_list[index];
				that.editorCtx.format("backgroundColor", color);
				that.style_obj["--bg_opacity"] = 0;
				if(color === "#ffffff"){
					that.style_obj["--bg_color"] = "#efebeb";
				}else{
					that.style_obj["--bg_color"] = color;
				};
			},
			// 是否显示字粗细
			trade_name(){
				let that = this;
				// 关闭字号大小和颜色面板
				that.style_obj["--font_size_display"] = 0;
				that.style_obj["--text_opacity"] = 0;
				that.style_obj["--bg_opacity"] = 0;

				if(that.style_obj["--header_display"]){
					that.style_obj["--header_display"] = 0;
				}else{
					that.style_obj["--header_display"] = 1;
				};
			},
			// 是否显示字号
			change_font(){
				let that = this;
				// 关闭字体粗细和颜色面板
				that.style_obj["--header_display"] = 0;
				that.style_obj["--text_opacity"] = 0;
				that.style_obj["--bg_opacity"] = 0;

				if(that.style_obj["--font_size_display"]){
					that.style_obj["--font_size_display"] = 0;
				}else{
					that.style_obj["--font_size_display"] = 1;
				};
			},
			// 选着字号大小
			change_font_size(index){
				this.editorCtx.format("fontSize", this.fontSize_list[index].size);
			},
			// 选着字粗细
			trade_name_size(index){
				this.editorCtx.format("header", (index+1).toString());
			},
			// 确认时间
			determine_time(){
				let that = this;
				const date = that.formatDate;
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				// 分钟不够两位数就补0
				let minute = date.getMinutes().toString().padStart(2, "0");
				let second = date.getSeconds();
				let str = "";
				if (hour < 11) {
					str = "上午";
				} else if (hour > 13) {
					str = "下午";
				} else {
					str = "中午";
				};
				let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
				that.editorCtx.insertText({
					text: `${year}年${month}月${day}日${week}${str}${hour}时${minute}分${second}秒`
				});
			},
			// 关闭弹出层了
			close_popup(){
				let that = this;
				// 隐藏背景颜色面板
				if(that.style_obj["--bg_opacity"]) {
					that.style_obj["--bg_opacity"] = 0;
				};
				// 隐藏文本颜色面板
				if(that.style_obj["--text_opacity"]) {
					that.style_obj["--text_opacity"] = 0;
				};
				// 隐藏字体大小
				if(that.style_obj["--font_size_display"]){
					that.style_obj["--font_size_display"] = 0;
				};
				// 隐藏字体粗细
				if(that.style_obj["--header_display"]){
					that.style_obj["--header_display"] = 0;
				};
			},
			// 获取指定的父组件
			getParent(tagName){
				let that = this;
				let parent = that.$parent;
				while(parent && parent.tagName !== tagName){
					parent = parent.$parent;
				}
				return parent;
			},
			disabledFn(){
				let that = this;
				let { disabled=false } = that;
				let parent = that.getParent('vk-data-form');
				if(parent && parent.disabled){
					disabled = parent.disabled;
				}
				return disabled;
			}
		},
		watch : {
			value(newVal,oldValue) {
				let that = this;
				let time = Date.now();
				let { inputTime = 0 } = that;
				// 判断若属于外部直接赋值,则需要覆盖编辑器内容
				if ((time - inputTime) > 60 && that.editorCtx) {
					that.editorCtx.setContents({
						html: newVal
					});
				}
			},
		},
		// 过滤器
		filters: {


		},
		// 计算属性
		computed: {
			styleCom(){
				let { width } = this;
				let obj = {};
				if(width){
					if(typeof width === "number"){
						obj.width = `${width}px`;
					}else{
						obj.width = width;
					}
				}
				return obj;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.vk-data-input-editor {
		box-sizing: border-box !important;
		border: 2rpx solid #e4e7ed !important;

		.wrapper {
			padding: 5px;
		}

		.iconfont {
			display: inline-block;
			padding: 8px 8px;
			width: 24px;
			height: 24px;
			cursor: pointer;
			font-size: 20px;
		}
		.icon{
			padding: 8px 8px;
			width: 24px;
			height: 24px;
			cursor: pointer;
			font-size: 20px;
		}

		.toolbar {
			box-sizing: border-box;
			font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
			position: relative;
			border-bottom: 2rpx solid #e4e7ed !important;
		}


		.ql-container {
			box-sizing: border-box;
			padding: 15px;
			width: 100%;
			min-height: 30vh;
			height: auto;
			background: #fff;
			margin-top: 0px;
			font-size: 16px;
			line-height: 1.5;
		}

		.ql-active {
			color: #06c;
		}
	}

	@font-face {
		font-family: "iconfont";
		src: url('data:application/octet-stream;base64,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AQMAAwABBAkACgBWARMAAwABBAkACwAmAWkKQ3JlYXRlZCBieSBpY29uZm9udAppY29uZm9udFJlZ3VsYXJpY29uZm9udGljb25mb250VmVyc2lvbiAxLjBpY29uZm9udEdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAAoAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGkAYwBvAG4AZgBvAG4AdAAKAGkAYwBvAG4AZgBvAG4AdABSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdABpAGMAbwBuAGYAbwBuAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdABHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5AQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3ATgBOQE6AARyZWRvBHVuZG8GaW5kZW50B291dGRlbnQIZm9udHNpemUPZm9ybWF0LWhlYWRlci0xD2Zvcm1hdC1oZWFkZXItNA9mb3JtYXQtaGVhZGVyLTUPZm9ybWF0LWhlYWRlci02B2NsZWFydXAHcHJldmlldwRkYXRlC2ZvbnRiZ2NvbG9yDWNsZWFyZWRmb3JtYXQEZm9udBU3MjNiaWFuamlxaV9kdWFuaG91anUWNzIyYmlhbmppcWlfZHVhbnFpYW5qdQp0ZXh0X2NvbG9yD2Zvcm1hdC1oZWFkZXItMg9mb3JtYXQtaGVhZGVyLTMKLWNoZWNrbGlzdAZiYW9jdW4LbGluZS1oZWlnaHQIcXVhbnBpbmcNZGlyZWN0aW9uLXJ0bA1kaXJlY3Rpb24tbHRyCXNlbGVjdGFsbAVmdXpoaQdzaGFuY2h1DGJpYW5qaXNla3VhaQlmZW5nZXhpYW4HZGlhbnphbgxjaGFydWxpYW5qaWULY2hhcnV0dXBpYW4Kd3V4dXBhaWxpZQxqdXpob25nZHVpcWkHeWlueW9uZwt5b3V4dXBhaWxpZQh5b3VkdWlxaQl6aXRpZGFpbWEIeGlhb2xpYW4Jeml0aWppYWN1D3ppdGlzaGFuY2h1eGlhbg16aXRpc2hhbmdiaWFvCnppdGliaWFvdGkOeml0aXhpYWh1YXhpYW4Jeml0aXhpZXRpCXppdGl5YW5zZQh6dW9kdWlxaQl6aXRpeXVsYW4Leml0aXhpYWJpYW8LenVveW91ZHVpcWkHZHVpZ291eAZndWFuYmkOc2hlbmd5aW5fc2hpdGkRQ2hhcmFjdGVyLVNwYWNpbmcAAAAAAA==') format('truetype');
	}

	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}

	.icon-redo:before {
	  content: "\e627";
	}

	.icon-undo:before {
	  content: "\e633";
	}

	.icon-indent:before {
	  content: "\eb28";
	}

	.icon-outdent:before {
	  content: "\e6e8";
	}

	.icon-fontsize:before {
	  content: "\e6fd";
	}

	.icon-format-header-1:before {
	  content: "\e860";
	}

	.icon-format-header-4:before {
	  content: "\e863";
	}

	.icon-format-header-5:before {
	  content: "\e864";
	}

	.icon-format-header-6:before {
	  content: "\e865";
	}

	.icon-clearup:before {
	  content: "\e64d";
	}

	.icon-preview:before {
	  content: "\e631";
	}

	.icon-date:before {
	  content: "\e63e";
	}

	.icon-fontbgcolor:before {
	  content: "\e678";
	}

	.icon-clearedformat:before {
	  content: "\e67e";
	}

	.icon-font:before {
	  content: "\e684";
	}

	.icon-723bianjiqi_duanhouju:before {
	  content: "\e65f";
	}

	.icon-722bianjiqi_duanqianju:before {
	  content: "\e660";
	}

	.icon-text_color:before {
	  content: "\e72c";
	}

	.icon-format-header-2:before {
	  content: "\e75c";
	}

	.icon-format-header-3:before {
	  content: "\e75d";
	}

	.icon--checklist:before {
	  content: "\e664";
	}

	.icon-baocun:before {
	  content: "\ec09";
	}

	.icon-line-height:before {
	  content: "\e7f8";
	}

	.icon-quanping:before {
	  content: "\ec13";
	}

	.icon-direction-rtl:before {
	  content: "\e66e";
	}

	.icon-direction-ltr:before {
	  content: "\e66d";
	}

	.icon-selectall:before {
	  content: "\e62b";
	}

	.icon-fuzhi:before {
	  content: "\ec7a";
	}

	.icon-shanchu:before {
	  content: "\ec7b";
	}

	.icon-bianjisekuai:before {
	  content: "\ec7c";
	}

	.icon-fengexian:before {
	  content: "\ec7f";
	}

	.icon-dianzan:before {
	  content: "\ec80";
	}

	.icon-charulianjie:before {
	  content: "\ec81";
	}

	.icon-charutupian:before {
	  content: "\ec82";
	}


	.icon-wuxupailie:before {
	  content: "\ec83";
	}

	.icon-juzhongduiqi:before {
	  content: "\ec84";
	}

	.icon-yinyong:before {
	  content: "\ec85";
	}

	.icon-youxupailie:before {
	  content: "\ec86";
	}

	.icon-youduiqi:before {
	  content: "\ec87";
	}

	.icon-zitidaima:before {
	  content: "\ec88";
	}

	.icon-xiaolian:before {
	  content: "\ec89";
	}

	.icon-zitijiacu:before {
	  content: "\ec8a";
	}

	.icon-zitishanchuxian:before {
	  content: "\ec8b";
	}

	.icon-zitishangbiao:before {
	  content: "\ec8c";
	}

	.icon-zitibiaoti:before {
	  content: "\ec8d";
	}

	.icon-zitixiahuaxian:before {
	  content: "\ec8e";
	}

	.icon-zitixieti:before {
	  content: "\ec8f";
	}

	.icon-zitiyanse:before {
	  content: "\ec90";
	}

	.icon-zuoduiqi:before {
	  content: "\ec91";
	}

	.icon-zitiyulan:before {
	  content: "\ec92";
	}

	.icon-zitixiabiao:before {
	  content: "\ec93";
	}

	.icon-zuoyouduiqi:before {
	  content: "\ec94";
	}

	.icon-duigoux:before {
	  content: "\ec9e";
	}

	.icon-guanbi:before {
	  content: "\eca0";
	}

	.icon-shengyin_shiti:before {
	  content: "\eca5";
	}

	.icon-Character-Spacing:before {
	  content: "\e964";
	}
	.text_color,
	.bg_color{
		position: absolute;
		z-index: 100;
		top: 80rpx;
		display: grid;
		grid-template-columns: repeat(7,50rpx);
		grid-template-rows: repeat(5,50rpx);
		grid-gap: 10rpx;
		padding: 15rpx;
		border-radius: 6rpx;
		background-color: #FFF;
		border: 1rpx solid #e4e7ed;;
		transform-origin: center 0;
		transition: transform 0.2s ease-in-out, left 0.2s ease-in-out, opacity 0.3s ease-in-out 0.2s;
		&::before{
			position: absolute;
			top: 0;
			left: 25rpx;
			transform: translate(0%,-100%);
			content: "";
			border-width: 16rpx;
			border-style: solid;
			border-color: transparent transparent #e4e7ed transparent;
		}
		>text{
			box-sizing: border-box;
			font-size: 22rpx;
			border: 1rpx solid transparent;
			transition: all 0.2s;
			cursor: pointer;
			border-radius: 4rpx;
			&:hover{
				border-color: #000;
			}
		}
	}
	// 颜色选着了
	.text_color{
		left: 0rpx;
		transform: scaleY(var(--text_opacity));
		opacity: var(--text_opacity);
	}
	// 背景颜色选着面板
	.bg_color{
		left: 70rpx;
		transform: scaleY(var(--bg_opacity));
		opacity: var(--bg_opacity);
	}

	.icon-format-header-1,
	.icon-fontsize{
		position: relative;
	}

	.fontSize,
	.header_size{
		position: absolute;
		top: 85rpx;
		left: 50%;
		z-index: 100;
		background-color: #fff;
		border-bottom: 1rpx solid #e4e7ed;
		display: flex;
		flex-direction: column;
		transform-origin: center 0;
		transition: transform 0.15s ease-in-out, opacity 0.2s ease-in-out 0.15s;
		box-shadow: 0 2px 8px rgba(0,0,0,.2);
		border-radius: 8rpx;
		&::before{
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%,-100%);
			content: "";
			border-width: 16rpx;
			border-style: solid;
			border-color: transparent transparent #e4e7ed transparent;
		}
		>text{
			padding: 8rpx 0;
			text-align: center;
			transition: all 0.2s;
			&:not(:last-of-type){
				border-bottom: 1rpx solid #e4e7ed;
			}
			&:hover{
				background-color: rgba(0,0,0,.4);
				color: #fff;
			}
		}
	}
	.fontSize{
		width: 120rpx;
		transform: translateX(-50%) scaleY(var(--font_size_display));
		opacity: var(--font_size_display);
		>text{
			color: rgba(0,0,0,.7);
			&:nth-of-type(1){
				font-size: 12px;
			}
			&:nth-of-type(2){
				font-size: 16px;
			}
			&:nth-of-type(3){
				font-size: 18px;
			}
			&:nth-of-type(4){
				font-size: 22px;
			}
		}
	}
	// 字粗细
	.header_size{
		width: 90rpx;
		transform: translateX(-50%) scaleY(var(--header_display));
		opacity: var(--header_display);
		>text{
			&:nth-of-type(1){
				font-size: 34rpx;
			}
			&:nth-of-type(2){
				font-size: 32rpx;
			}
			&:nth-of-type(3){
				font-size: 30rpx;
			}
			&:nth-of-type(4){
				font-size: 28rpx;
			}
			&:nth-of-type(5){
				font-size: 26rpx;
			}
			&:nth-of-type(6){
				font-size: 24rpx;
			}
		}
	}
	//  隐藏时间选择器控件.让其隐藏到view里面.
	.icon-date{
		position: relative;
		.el-date-picker{
			position: absolute;
		  background-color: darkblue;
		  top: 0 !important;
		  left: 0rpx !important;
			width: 70rpx !important;
			height: 80rpx;
			z-index: 100;
			opacity: 0;
			cursor: pointer;
			>.el-input__inner{
				background-color: pink;
				width: 70rpx !important;
				height: 80rpx !important;
				padding: 0 !important;
				margin: 0 !important;
				opacity: 0;
				cursor: pointer;
			}
			>.el-input__prefix,.el-input__suffix{
				display: none;
				opacity: 0;
			}
	  }
	}
</style>
