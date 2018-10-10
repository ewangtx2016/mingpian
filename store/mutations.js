export default {
	// 设置code 
	SET_CODE: (state, obj)=>{
		state.CODE = obj.code
		state.TT_TOKEN = obj.tt_token
		state.TICKET = obj.ticket
	},
	// 设置用户信息
	 SET_USERINFO: (state, obj)=>{
		 state.USERINFO = obj
	 },
	 // 过滤时间
	 FILE_TIME: (state, time)=>{
		 let date = new Date(time)
		 let year = date.getFullYear()
		 let month = date.getMonth()
		 let day = date.getDate()
		 let hours = date.getHours()
		 let min = date.getMinutes()
		 return `${year}-${month}-${day}  ${hours}:${min}`
	 },
	 // 记录-上传用户行为
	 UPDATA_USER_RADAR: (state, radar)=> {
		 // 获取用户信息
		 let getCode = uni.getStorageSync('CODE') || ''
		 let getUserinfo = uni.getStorageSync('USERINFO') || ''
		 let newdata = radar.newdata // 名片数据
		 let type = radar.type || 'visit_business_card' //用户行为类型
		 
		 console.log('信息--------', newdata)
		 
		 uni.request({
		 	url: `${state.HTTPS_URL}/event/radar`,
		 	method: 'POST',
		 	header: {
		 		'Content-Type': 'application/json'
		 	},
		 	data: {
		 		sellerUserid: newdata.userid, 
		 		sellerName: newdata.cardName,
		 		userid: getCode.userId,
		 		userName: getUserinfo.nickName,
		 		userImgUrl: getUserinfo.avatarUrl,
		 		optionType: type
		 	},
		 	success:function(res){
		 		console.log('记录用户行为', res)
		 	}
		 })
	 }
}