
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/ad18e7d6-ae0e-4424-bf3d-6e3dad1036a1.png)

### 插件名称：`vk-unicloud-admin`
### 作者：VK

## 序
* 如果你热爱编程，想快速入门云开发，欢迎使用`vk-unicloud`系列开发框架
* 无需转变开发习惯，0成本上手云开发。
* 框架内置了众多API、工具包，为你的业务扫平障碍。使你的项目刚起步进度就是50%（微信登录、短信、验证码、缓存、生成小程序码等等）
* 从此你又get一个新技能，只需用js，轻松搞定前后台整体业务。
* `client端`框架地址： [https://ext.dcloud.net.cn/plugin?id=2204](https://ext.dcloud.net.cn/plugin?id=2204)
* `admin端`框架地址：[https://ext.dcloud.net.cn/plugin?id=5043](https://ext.dcloud.net.cn/plugin?name=vk-unicloud-admin)
* `client端`框架文档：[点击查看](https://vkdoc.fsq.pub/client/)
* `admin端`框架文档：[点击查看](https://vkdoc.fsq.pub/admin/)

#### 框架学习Q群：`22466457` 欢迎萌新和大佬来使用和共同改进框架

#### 框架体验地址：[点击进入『框架体验地址』](https://vkunicloud.fsq.pub/admin/)

#### 体验账号：

* 高级管理员：test11（账号）123456（密码）可以执行绝大部分功能
* 初级管理员：test12（账号）123456（密码）只能执行查询功能
* 无权限用户：test13（账号）123456（密码）无admin登录权限

[点击体验『表单可视化生成器』](https://vkunicloud.fsq.pub/vk-form-visualizer/)

### 什么是 `vk-unicloud-admin` ?

* `vk-unicloud-admin` 是基于 `uniapp` + `unicloud` + `uni-id` +`element` + `vk-unicloud-router` 的一套快速 `admin` 完整开发框架
* （只兼容PC，只为PC admin而生，但Ta也是uniapp项目，非传统vue-admin项目，你可以用Ta来做你H5、小程序、app的admin管理端）

**注意：TA是uniapp项目，支持uniapp所有H5的API和插件市场所有uni-admin插件**

**最大亮点：使用 `vk-unicloud-admin` 后，即使你是一个纯后端，不会写任何css，照样可以写出功能强大且页面好看的admin管理系统。**

### `vk-unicloud-admin` 的优势是什么 ?

* 1、完美集成 `vk-unicloud-router`，拥有 `vk-unicloud-router` 的所有现成API功能。让你开发事半功倍。[点击查看](https://vkdoc.fsq.pub/client/)
* 2、完美集成 `element` UI框架，并在 `element` 基础上进行了深度封装（支持原生 `element`）[element官网](https://element.eleme.cn/#/zh-CN/component/button)
* 3、`表单可视化拖拽工具`（可直接生成 `vk框架代码 `和 `element` 原生代码 [点击体验](https://vkunicloud.fsq.pub/vk-form-visualizer/)
* 4、`万能表格组件`，通过少量代码即可完成 `CRUD`，同时还拥有较高的自由度。几分钟完成一个页面 `CRUD`。
* 5、`万能表单组件`，通过少量代码即可完成表单渲染 + 表单请求。
* 6、超高自由度，支持使用插槽的形式自定义已有的功能和渲染方式，也支持直接使用 `element` 原生代码来写页面。
* 7、完善的用户角色权限，无需开发即可拥有（权限可精确到每一个云函数）。
* 8、`pages-dev.json` 机制，开发调试页面不会被发布到正式版中。
* 9、只要你开发过传统 `vue admin` 项目，那么上手此框架的学习成本几乎为0
* 10、众多示例代码，为你的云开发之路扫平障碍。
* 11、内置3个主题（纯黑，纯白，黑白）且支持自定义主题。[点击查看主题](https://vkdoc.fsq.pub/admin/1/theme.html)
* 12、群内众多开发者，关于框架使用问题几乎有问必答。Q群：22466457
* 13、更多功能敬请体验。

### 核心功能

#### 一、万能表格

核心思想：通过 JSON 配置渲染页面（简单配置一下，表格就完成了）

如下方JSON用于渲染头像和时间
```js
 [
   { key: "avatar", title: "头像", type: "avatar", width: 80, shape:"circle" },
   { key: "_add_time", title: "添加时间", type: "time", width: 160, valueFormat:"yyyy-MM-dd hh:mm:ss" },
 ]
```

* 1、查询：包含分页、排序、多条件搜索、搜索项折叠、多表连表、数据源预处理、展开行、树状结构等等
* 2、支持多选框（用于批量操作）
* 3、自动生成详情页：点击详情按钮，自动显示详情页弹窗。
* 4、修改：点击修改按钮，自动显示修改表单弹窗。
* 5、删除：点击删除，显示气泡二次确认提示，再点击确定，则删除数据。
* 6、自定义操作按钮：如发货、审核等自定义按钮。
* 7、高自由度：每个字段都有插槽，在内置组件不满足需求的情况下，可以使用插槽自己编写该字段的渲染规则。（内置组件基本上可满足90%以上的渲染需求）
* 8、导出excel表格：通过内置api只需一行代码即可直接导出表格数据。
* 9、导出满足表格查询条件的数据库内所有数据（unicloud的查询有限制每次500条记录，但万能表格解决了此问题，可以导出数据库内全部数据)
* 10、异常重试机制：一般不需要此功能，但是由于unicloud-阿里云空间会偶尔查询失败，此时此功能就派上用场了（会自动重新再查询，用户体验上只是感觉这次查询慢了一点而已（因为第一次失败了，查了2次或2次以上））
* 11、不仅仅支持unicloud云函数请求，还支持http请求。
* 12、支持下方自动显示合计
* 13、更多功能敬请体验 [万能表格文档地址](https://vkdoc.fsq.pub/admin/2/table.html)

#### 二、万能表单

核心思想：通过 JSON 配置渲染表单（简单配置一下，表单就完成了）

如下方JSON用于渲染 一个昵称输入框 和 性别单选按钮组
```js
 [
   { key:"nickname", title:"昵称", type:"text" },
   {
    key:"gender", title:"性别", type:"radio",
    data:[
      { value:1, label:"男" },
      { value:2, label:"女" }
    ]
   }
 ]
```

* 1、自动提交表单
* 2、提交前自动表单验证
* 3、防止表单重复提交（提交后按钮自动进入loading状态，不可再点击）
* 4、同一表单可复用（如一般添加和修改的表单基本是一样的）
* 5、表单复用时，支持字段显示规则（如添加时有A字段，修改时，无A字段等）
* 6、拦截器：表单提交前拦截，执行自己逻辑，再放行或终止。
* 7、高自由度：每个字段都有插槽，在内置组件不满足需求的情况下，可以使用插槽自己编写该字段的渲染规则。（内置组件基本上可满足90%以上的渲染需求）
* 8、重置表单：一键重置表单
* 9、表单可视化拖拽工具 [点击查看](https://vkunicloud.fsq.pub/vk-form-visualizer/#/)
* 10、更多功能敬请体验 [万能表单文档地址](https://vkdoc.fsq.pub/admin/3/form.html)

`vk-unicloud-admin` 框架同时还包含 `vk-unicloud-router` 所有功能，[点击查看vk-unicloud-router功能列表](https://vkdoc.fsq.pub/client/)

### 同时 admin 框架内置了以下页面

* 1、用户管理
* 2、角色管理
* 3、权限管理
* 4、菜单管理
* 5、应用管理
* 6、系统缓存管理
* 7、动态组件数据
* 8、用户登录日志
* 9、系统操作日志
* 10、VK框架组件演示
* 11、element静态功能演示
* 12、素材管理（图片、视频、文件）
* 13、App升级中心管理（新增于1.14.0）
* 14、持续完善中。。。

## 2、快速上手 - 安装步骤 

* 1、`项目根目录` 执行 `npm i` 命令（必须先执行此npm命令，安装必要的依赖，否则会无法启动。）

#### 接下来是后端（云函数端）安装步骤

* 通常一个完整的项目分为 `client端`（客户端）、`admin端`（管理端）、`service端`（服务端，这里指云函数端）

#### 这里需要分三种情况
#### [情况一](#情况一)：你之前已经在用 `vk-unicloud-router` 框架开发H5、小程序、APP的开发者。

#### [情况二](#情况二)：你之前是用别的框架开发H5、小程序、APP，现在只想用VK框架单独开发 admin 项目。

#### [情况三](#情况三)：你的项目刚开始，`client端` 和 `admin端` 都还没开发。

### 情况一

#### 思路：因为云函数会互相覆盖，因此我们可以把 `service端（云函数端）` 统一放在 `client端` 的项目中，而 `admin端` 项目 直接绑定 `client端` 项目
#### 安装步骤：
* 1、把 `admin端` 内的 `uniCloud/router/service/admin` 内的以下文件复制到你之前的 `client端` 项目 `uniCloud/router/service/admin` 内（复制整个目录）
* 2、把 `admin端` 内的 `uniCloud/router/service/template` 内的以下文件复制到你之前的 `client端` 项目 `uniCloud/router/service/template` 内（复制整个目录）
* 3、把 `admin端` 内的 `uniCloud/database/db_init/` 目录下的3个数据库表数据导入对应的表内（导入方法：服务空间后台 - 数据库 - 导入）
```js
uni-id-roles 角色表
uni-id-permissions 权限表
opendb-admin-menus 菜单表
```
* 3、把 `admin端` 的服务空间直接绑定 `client端` 项目（注意是 `绑定` 不是 `关联`）（注意是 `绑定` 不是 `关联`）（注意是 `绑定` 不是 `关联`）

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/98c6961a-22c8-4d61-833f-f558d848b0e5.png)
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/8a9406fd-ff00-48d4-b1fe-6e133c2bf13a.png)

* 4、上传 `router` 云函数

* 5、完成

### 情况二
已完成情况一的请直接跳过情况二和情况三
#### 安装步骤：
* 1、在 `项目根目录` 目录执行 `npm i`

* 2、右键 `uniCloud` 目录 点击 `运行云服务空间初始化向导`

* 3、完成

### 情况三

#### 安装步骤：
* 建议你先使用 `vk-unicloud-router` 框架进行 `client端` 开发，`client端` 开发完成后，使用 `vk-unicloud-admin` 开发 `admin端`

* 当然你也可以先开发 `admin端`，再开发 `client端`。

* 如果先开发 `admin端`，则直接用 `情况二` 的安装步骤即可。

* 如果先开发 `client端`，则先下载 `client端` 开发框架，等 `client端` 开发完后再用 `情况一` 的安装步骤即可 [点击前往下载client端开发框架](https://ext.dcloud.net.cn/plugin?id=2204)

#### 初始admin账号密码：123456

#### 如密码错误，可以强制重置admin账号密码
[点击查看『强制重置admin账号密码步骤』](https://vkdoc.fsq.pub/admin/4/forceResetAdminPassword.html)

### 安装代码快捷提示步骤
*  1、将 `根目录/使用帮助/代码快捷提示/javascript代码块提示.json` 内的代码 复制到 hbx 工具 - 代码块设置 - javascript代码块
*  2、将 `根目录/使用帮助/代码快捷提示/vue代码块提示.json` 内的代码 复制到 hbx 工具 - 代码块设置 - vue代码块

### 其他
删除 `pages.json` 内的 `pages_template/components` 和 `pages_template/element` 分包（此为发布演示版本需要而加，你的项目可以删除，删除后开发模式下依然存在（因为在`pages-dev.json`中配置了），发布到线上环境时自动屏蔽）

### 若提示上传云函数失败，请仔细对比下你的项目 `uniCloud/common` 目录是否跟下图完全一致

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/7ae174db-7666-4301-b017-725edc73e3a3.png)

如果不一致，特别是 `uni-id` 目录下没有这个文件 `uni-id/node_modules/uni-config-center/uni-id/config.json`，则在 `uni-id` 目录执行 `npm i` 试试（如果有这个`uni-id/node_modules`目录，先删除目录，再执行npm i）

### 若新建的用户登录提示用户不存在（数据库明明有数据），此时是因为不同端用户隔离导致的 

* 1、先用admin账号登录后台，进入应用管理

因为每个人的 `DCloud Appid`是不一样的，所以你需要在应用管理中添加自己的应用（或直接修改内置的2条数据的appid即可）

`DCloud Appid` 获取方法

复制 `uniapp` 项目根目录的 `manifest.json` 文件内的 `appid`

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/e717232f-0f18-4dee-8437-5dec2c224920.png)

* 2、再进入用户管理，对需要设置的用户点击编辑，设置该用户可以登录哪些端。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/18cd54d5-bedc-4d4f-bda2-7c339c865257.png)

* 3、完成，可以登录了。


#### 如有疑问，请加群：22466457 关于插件的问题包教包会！

[点击查看『完整安装步骤』](https://vkdoc.fsq.pub/admin/1/quickstart.html)

## 3、框架目录结构

[点击查看『目录结构』](https://vkdoc.fsq.pub/admin/1/catalogue.html)

## 4、万能表格

[点击查看『万能表格』](https://vkdoc.fsq.pub/admin/2/table.html)

## 5、万能表单

[点击查看『万能表单』](https://vkdoc.fsq.pub/admin/3/form.html)

[点击查看『表单可视化生成器』](https://vkunicloud.fsq.pub/vk-form-visualizer/)

## 6、用户角色权限

[点击查看『用户角色权限』](https://vkdoc.fsq.pub/admin/4/role.html)

## 7、创建我的第一个带CRUD的页面

[点击查看『如何创建我的第一个带CRUD的页面』](https://vkdoc.fsq.pub/admin/5/template.html)

## 8、HBX代码块提示

[点击查看『HBX代码块提示』](https://vkdoc.fsq.pub/admin/4/codeTips.html)

## 9、admin框架更新步骤指南

[点击查看『admin框架更新步骤指南』](https://vkdoc.fsq.pub/admin/1/update.html)

## 10、强制重置admin账号密码

[点击查看『强制重置admin账号密码』](https://vkdoc.fsq.pub/admin/4/forceResetAdminPassword.html)

## 11、admin框架内置组件参数说明

[点击查看『admin框架内置组件参数说明』](https://vkdoc.fsq.pub/admin/components/1%E3%80%81text.html)

## 20、云函数开发文档

[点击查看『云函数开发文档』](https://vkdoc.fsq.pub/client/uniCloud/cloudfunctions/catalogue.html)

## 21、vk.baseDao数据库API

[点击查看『vk.baseDao』数据库API](https://vkdoc.fsq.pub/client/uniCloud/db/api.html)

## 22、数据库缓存API

[点击查看『数据库缓存API』](https://vkdoc.fsq.pub/client/uniCloud/cache/cache.html)

## 23、中间件开发文档

[点击查看『中间件开发文档』](https://vkdoc.fsq.pub/client/uniCloud/middleware/filter.html)

## 24、JS API文档大全

[点击查看『JS API文档大全』](https://vkdoc.fsq.pub/client/jsapi.html)

## 25、前端请求云函数

[点击查看『前端请求云函数』](https://vkdoc.fsq.pub/client/pages/callFunction.html)

## 26、配置前端非法token拦截器

[点击查看『前端请求云函数』](https://vkdoc.fsq.pub/client/pages/interceptor1.html)

## 27、配置前端全局异常拦截器

[点击查看『前端请求云函数』](https://vkdoc.fsq.pub/client/pages/interceptor2.html)

## 28、vuex使用文档

[点击查看『vuex使用文档』](https://vkdoc.fsq.pub/client/pages/vuex.html)

## 29、更多其他功能敬请在框架内体验

### vk-unicloud-admin 框架研究Q群:`22466457` 如有问题或建议可以在群内讨论。

### 如果你觉得框架对你有用，可以在下方进行评论，也可以进行赞赏。