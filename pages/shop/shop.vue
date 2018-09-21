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
			xiaoqiang(){
				console.log('hahahahahhahahaha')
			},
			setUrl(){
				let storage = JSON.parse(wx.getStorageSync('CODE'))
				console.log(storage)
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
