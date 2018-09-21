export default {
	// 获取code 
	GET_CODE: (state)=>{
		return {
			code: state.CODE,
			tt_token: state.TT_TOKEN,
			ticket: state.TICKET
		}
	},
	// 获取用户信息 
	GET_USERINFO: (state)=>{
		return state.USERINFO
	}
}