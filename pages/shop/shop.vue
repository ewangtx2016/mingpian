<template>
	<view class="web_url">
		<navigator class="web_link" url="/pages/index/index">返回名片</navigator>
		<web-view :src="websrc" bindload="xiaoqiang"></web-view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'

	export default {
		data(){
			return {
				websrc: 'https://static-shop-jt.51play.com/shop/shop.shtml' 
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
	.web_url{
		position: relative;
		
		.web_link{
			position: fixed;
			right: 0;
			bottom: 50%;
			z-index: 999;
			background: rgba(10, 203, 122, 1);
			padding: 20px 50px;
			border-radius: 30px 0 0 30px;
			color: #fff;
		}
	}
</style>
