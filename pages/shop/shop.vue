<template>
	<view>
		<web-view :src="websrc" bindload="xiaoqiang"></web-view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'

	export default {
		data(){
			return {
				websrc: 'http://aidou.51play.com/shop/shop.shtml' 
			}
		},
		computed: {
			...mapGetters([
				'GET_CODE',
			]),
			...mapState([
				'HTTPS_URL'
			])
		},
		mounted(){
			this.setUrl()
		},
		methods: {
			// VUEX - function
			...mapMutations([
				'UPDATA_USER_RADAR'
			]),
			xiaoqiang(){
				console.log('hahahahahhahahaha')
			},
			setUrl(){
				let storage = wx.getStorageSync('CODE')
				let tt_token = storage.tt_token
				let ticket = storage.ticket
				this.websrc = `${this.websrc}?tt_token=${tt_token}&ticket=${ticket}`
				console.log('web地址', this.websrc)
			}
		}
	}
</script>

<style lang="less">
	
</style>
