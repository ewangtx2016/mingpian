<script>
// 	const AV = require('./static/js/av-weapp-min.js')
// 	const { Realtime, TextMessage } = require('./static/js/realtime.weapp.min.js')
	
	import { mapState, mapGetters, mapMutations } from 'vuex'
	const PUBLIC = require('./static/js/public.js')
	


	
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters([
				'GET_CODE',
				'GET_USERINFO'
			]),
			...mapState([
				'HTTPS_TOKEN_RUL',
				'WSS_URL'
			])
		},
		methods:{
			initSocket(){
				
			},
			getsetting(){
					let _this = this
					// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
					wx.getSetting({
						success(res) {
							if (!res.authSetting['scope.userInfo']) {
								// 未授权跳转到授权页面
								 uni.navigateTo({
								 	url: '/pages/getinfo/getinfo',
								 })
							}
						}
					})
			}
		},
		onLaunch: function (Event) {

		},
		onShow: function (Event) {
			this.getsetting()
		},
		onHide: function () {
		}
		
	}
</script>

<style>
	/*每个页面公共css */
	page{
		height: 100%;
	}
	
	.txtover{
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
