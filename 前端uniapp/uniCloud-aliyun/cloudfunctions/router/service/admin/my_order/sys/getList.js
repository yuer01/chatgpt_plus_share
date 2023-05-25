module.exports = {
  /**
   * 查询多条记录 分页
   * @url admin/kong/sys/getList 前端调用的url参数地址
   * data 请求参数 说明
   * @param {Number}         pageIndex 当前页码
   * @param {Number}         pageSize  每页显示数量
   * @param {Array<Object>}  sortRule  排序规则
   * @param {object}         formData  查询条件数据源
   * @param {Array<Object>}  columns   查询条件规则
   * res 返回参数说明
   * @param {Number}         code      错误码，0表示成功
   * @param {String}         msg       详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		
		let {
			formData = {}
		} = data;
		// console.log('查询入参 ',JSON.stringify(data))
		console.log('查询入参 444 ',JSON.stringify(formData))
		let search_type = formData.search_type 
		
		let whereJsonData = {}
		if(search_type === '1'){ // 购买订单
			// this.$set(whereJsonData,'to_uid',userInfo._id) //. = userInfo._id
			vk.pubfn.setData(whereJsonData, 'to_uid', userInfo._id);
		}else if(search_type === '2'){// 卖出订单
			// whereJsonData.from_uid = userInfo._id
			vk.pubfn.setData(whereJsonData, 'from_uid', userInfo._id);
		}
		let order_state = formData.order_state 
		if(order_state){
			// whereJsonData.order_state = order_state
			vk.pubfn.setData(whereJsonData, 'order_state', order_state);
		}
		console.log('查询入参 5555 ',JSON.stringify(whereJsonData))
		let dbName = "share-my-order";
		// data.to_uid
		// data.fromData = {}
		vk.pubfn.setData(data, 'formData', {});
		// console.log('我的订单 data 参数 333' , JSON.stringify(data) )
		
		res = await vk.baseDao.selects({
			dbName,
			getCount:true,
			// data,
			pageIndex:data.pageIndex,
			pageSize:data.pageSize,			
			whereJson: whereJsonData,
			sortArr:[
			    { name:"_add_time_str", type:"desc" }
			  ],
			// 副表列表
			foreignDB: [
				{
				  dbName: "share-my-acc", // 副表名
				  localKey:"acc_id", // 主表外键字段名
				  foreignKey: "_id", // 副表外键字段名
				  as: "acc",
				  limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
				  // 副表where条件
				  whereJson: {},
				  // 副表字段显示规则
				  fieldJson: {
					  password_key:false
				  },
				  // 副表排序规则
				  sortArr: [],
				},
				{
				  dbName: "uni-id-users", // 副表名
				  localKey:"to_uid", // 主表外键字段名
				  foreignKey: "_id", // 副表外键字段名
				  as: "user",
				  limit: 1, // 当limit = 1时，以对象形式返回，否则以数组形式返回
				  // 副表where条件
				  whereJson: {},
				  // 副表字段显示规则
				  fieldJson: {
					  
				  },
				  // 副表排序规则
				  sortArr: [],
				}
				]
			
		});
		console.log('我的订单 33 ', JSON.stringify( res ) )
		return res;
  }

}
