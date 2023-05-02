module.exports = {
  /**
   * 初始化数据
   * @url plugs/components_dynamic/client/pub/init 前端调用的url参数地址
   * data 请求参数 说明
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : 'ok' };
    // 业务逻辑开始-----------------------------------------------------------
		// 承载所有读操作的 promise 的数组
		let dbName = "vk-components-dynamic";
		let data_ids = [
			"vk-test-notice-bar-01",
			"vk-test-notice-bar-02",
			"vk-test-notice-bar-03",
			"vk-test-notice-bar-04",
			"vk-test-index-swiper-01",
			"vk-test-grid-button-01"
		];
		let whereJson = {
			data_id:_.in(data_ids)
		};
		res = await vk.baseDao.select({
			dbName:dbName,
			getCount:true,
			pageIndex:1,
			pageSize:100,
			whereJson:whereJson
		}, event.util);
		if(res.rows.length == data_ids.length){
			return res;
		}
		await vk.baseDao.del({
			dbName:dbName,
			whereJson:whereJson
		},event.util);
		let dataArr = [
			{
			  "data_id": "vk-test-notice-bar-01",
			  "data": {
			    "list": [
			      "公告111公告111公告111公告111公告111公告111公告111"
			    ]
			  }
			},
			{
			  "data_id": "vk-test-notice-bar-02",
			  "data": {
			    "list": [
			      "公告222公告222公告222公告222公告222公告222公告222"
			    ]
			  }
			},
			{
			  "data_id": "vk-test-notice-bar-03",
			  "data": {
			    "list": [
			      "公告333333公告333333公告333333公告333333公告333333"
			    ]
			  }
			},
			{
			  "data_id": "vk-test-notice-bar-04",
			  "data": {
			    "list": [
			      "公告44444公告44444公告44444公告44444公告44444公告44444"
			    ]
			  }
			},
			{
			  "data_id": "vk-test-index-swiper-01",
			  "data": {
			    "list": [
			      {
			        "title": "标题11111111",
			        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798331539&di=fe544344d765e4f23f90457f02a2d361&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F58f03bf05fddb.jpg%3Fdown"
			      },
			      {
			        "title": "标题2222222",
			        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798658581&di=bcd5486940ad88cf88a904f411c53e94&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn15%2F600%2Fw1920h1080%2F20180505%2Fad66-hacuuvt5802647.jpg"
			      },
			      {
			        "title": "标题3333333",
			        "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798022306&di=ed613c19ef36df7856b383601acb2f05&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fwallpaper%2F1306%2F17%2Fc1%2F22199754_1371460645988.jpg"
			      }
			    ],
			    "height": 300
			  }
			},
			{
			  "data_id": "vk-test-grid-button-01",
			  "data": {
					"col":4,
					"icon-size":46,
					"text-margin-top":10,
					"text-color":"#000000",
					"icon-color":"#000000",
					"border":false,
					"list":[
						{
							"icon":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594798331539&di=fe544344d765e4f23f90457f02a2d361&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F58f03bf05fddb.jpg%3Fdown",
							"text":"按钮1",
							"page":"../vk-u-notice-bar/vk-u-notice-bar"
						},
						{
							"icon":"red-packet",
							"text":"按钮2",
							"icon-color":"red",
							"page":"../vk-u-swiper/vk-u-swiper"
						},
						{
							"icon":"red-packet",
							"text":"按钮3",
							"text-color":"red"
						},
						{
							"icon":"red-packet",
							"text":"按钮4"
						}
					]
				}
			}
		];
		await vk.baseDao.adds({
			dbName:dbName,
			dataJson:dataArr
		},event.util);

    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
