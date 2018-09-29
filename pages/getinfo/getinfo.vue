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
		onLoad(query){
			this.type = query.type
			this.cardId = query.cardid || ''
			
			// this.getBy(this.cardId)
			this.getBy(this.cardId)
		},
		onShow(query){
			console.log('哈哈哈哈哈', query)
		},
		methods: {
			...mapMutations([
				'SET_CODE'
			]),
			// 授权登录
			getBy(carid){
				let _this = this
				let storage = uni.getStorageSync('CODE')
				
				return new Promise((res, reject)=>{
					uni.request({
						url: `${_this.HTTPS_URL}/businessCard/bind`,
						method: 'GET',
						header: {
							'Cookie': `ticket=${storage.ticket}`
						},
						data: {
							cardId: `${carid}`
						},
						success:function(data){
							if(data.data.errorCode === 'USER_NOT_LOGIN'){
								// 未登录
								
							}else{
								// 已登录
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}
							// 成功
							res(data)
						}
					})
				})
			},
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
								url: `${_this.HTTPS_URL}/businessCard/login`,
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									code: res.code,
									user: JSON.stringify(info.detail)
								},
								success:function(data){
									if(data.data.status === 1){
										let L_CODE = {
											code: res.code,
											tt_token: data.data.data.tt_token,
											ticket: data.data.data.ticket,
											userId: data.data.data.userId
										}
										uni.setStorageSync('CODE', L_CODE)
										
										// 登录之后跳转
										_this.getBy()
										
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
