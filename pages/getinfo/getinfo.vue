<template>
	<view class="getuserinfo">
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">获取用户授权</button>
	</view>
</template>

<script>	
	import { mapState, mapGetters, mapMutations } from 'vuex'

	
	export default {
		data(){
			return {
				
			}
		},
		computed: {
			...mapGetters([
				'GET_CODE',
				'GET_USERINFO'
			]),
			...mapState([
				'HTTPS_URL'
			])
		},
		methods: {
			...mapMutations([
				'SET_CODE'
			]),
			getuserinfo(info){
				if(info.detail.userInfo){
					let _this = this
					// 微信登录授权  
					wx.login({
						success: (res)=>{
							console.log(info.detail.userInfo)
							uni.setStorageSync('USERINFO', info.detail.userInfo)
							
							// 获取token
							uni.request({
								url: `${_this.HTTPS_URL}/businessCard/bind`,
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									cardId: '5ba39565b8a903b80c48ed46',
									code: res.code,
									user: JSON.stringify(info.detail)
								},
								success:function(data){
									if(data.data.status === 1){
										let L_CODE = {
											code: res.code,
											tt_token: data.data.data.tt_token,
											ticket: data.data.data.ticket
										}
										uni.setStorageSync('CODE', L_CODE)
										console.log('本地数据', uni.getStorageSync('CODE'))
										wx.reLaunch({
											url: '/pages/index/index'
										})
									}
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style lang="less">
	
</style>
