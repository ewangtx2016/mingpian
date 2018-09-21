<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				xiaoqiang: '123123'
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
			soctket(){
				let _this = this
				let L_CODE = uni.getStorageSync('CODE') ?  uni.getStorageSync('CODE') : ''
				console.log('L_CODE', L_CODE)
				wx.connectSocket({
					url: `${_this.WSS_URL}/websocket`,
					header: {
						'cookie': `ticket=${L_CODE.ticket}` //c97a1774ff734db5925c0b4db5502c59
					},
					success:function(){
						_this.sockteSuccess()
					}
				})
			},
			sockteSuccess(){
				wx.onSocketOpen((res)=>{
					console.log('链接成功')
				})
				
				wx.onSocketMessage((res)=>{
					console.log('收到服务器内容：' + res.data)
				})
				
				wx.onSocketError((res)=>{ 
					console.log('WebSocket连接打开失败')
					
					this.timeDing()
				})
				
				wx.onSocketClose((res)=> {
					console.log('WebSocket 已关闭！')
					
					this.timeDing()
				})
			},
			timeDing(){
				this.sockTime = setTimeout(function(){
					this.soctket()
				}.bind(this), 5000)
			},
			timeSocket(){
				// this.timesocket = 
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
			
			let one = 'pages/index/'
			let pathname = Event.path.substring(one.length,Event.path.length)
			console.log(pathname)
			
			
			this.soctket()
			this.getsetting()
		},
		onHide: function () {
		},
		
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
