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
	 }
}