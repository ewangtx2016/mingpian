<template>
	<view class="mess_list">
		<view class="message" :animation="animation" @tap="gotolink('/pages/radar_p/radar_p')">
			<image class="img" src="/static/images/touxiang.jpg" mode="aspectFit"></image>
			<view class="txt">
				<view class="title">
					<text v-if="mesage.action == 'visit_business_card' ">
						查看名片
					</text>
					<text v-if="mesage.action == 'forward_business_card' ">
						转发名片
					</text>
					<text v-if="mesage.action == 'save_business_card' ">
						保存名片
					</text>
					<text v-if="mesage.action == 'save_to_address_book' ">
						保存通讯录
					</text>
					<text v-if="mesage.action == 'click_like_business_card' ">
						点赞
					</text>
					<text v-if="mesage.action == 'visit_shopping_mall' ">
						查看商城
					</text>
					<text v-if="mesage.action == 'visit_product' ">
						查看商品
					</text>
					<text v-if="mesage.action == 'consult' ">
						咨询
					</text>
					<text v-if="mesage.action == 'dial' ">
						拨打电话
					</text>
					<text v-if="mesage.action == 'buying' ">
						正在购买
					</text>
					<text v-if="mesage.action == 'unpaid' ">
						待支付
					</text>
					<text v-if="mesage.action == 'pay_success' ">
						购买成功
					</text>
				</view>
				<view class="mesg">
					{{mesage.body}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	import { mapState, mapGetters, mapMutations } from 'vuex'
	// 导入公共方法
	const PUBLIC = require('../static/js/public.js')

	
	export default {
		data(){
			return {
				mesage: {},
				animation: {}
			}
		},
		computed: {
			...mapState([
				'HTTPS_URL',
				'WSS_URL'
			])
		},
		methods: {
			// 跳转
			gotolink(url){
				uni.navigateTo({
					url: `${url}`, 
				})
			},
			getPage(){
				let pages = getCurrentPages()
				let nowpage = pages[pages.length - 1]
				let route = nowpage.route
				let txt = 'pages/page/'
				let routename = route.substring(txt.length, route.length)
				return routename
			},
			// 动画 显示
			show(){
				let ani =  wx.createAnimation({
				  duration: 500,
				  timingFunction: 'ease',
				})
				this.ani = ani
				ani.opacity(1).translateY(0).step()
				this.animation = ani.export()
				
				setTimeout(function(){
					this.hide()
				}.bind(this), 4000)
			},
			// 动画 隐藏
			hide(){
				let ani =  wx.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.ani = ani
				ani.opacity(0).translateY('-200px').step()
				this.animation = ani.export()
				
			},
			// 建立socket链接
			getSocketLine(){
					let _this = this
					let L_CODE = uni.getStorageSync('CODE') ?  uni.getStorageSync('CODE') : ''
					
					_this.socketOne = wx.connectSocket({
						url: `${_this.WSS_URL}/websocket`,
						header: {
							'cookie': `ticket=${L_CODE.ticket}` //c97a1774ff734db5925c0b4db5502c59
						},
						success:function(data){
							console.log('链接建立成功')
						}
					})
					
					_this.socketOne.onOpen(()=>{
						console.log('已经成功了')
					})
					
					_this.socketOne.onClose(()=>{
						console.log('socket, 已经断开')
						_this.getSocketLine()
					})
					
					_this.socketOne.onError(()=>{
						console.log('socket, 已经失败')
						_this.socketOne.close()
					})
					
					_this.socketOne.onMessage((data)=>{
						_this.mesage = JSON.parse(data.data)
						_this.show()
					})
			}
		},
		onLoad:function(){
			let _this = this
			_this.pagename = this.getPage()
			
			// 建立websocket 链接 
			_this.getSocketLine()
			
		},
		mounted(){
			
		}
	}
</script>

<style lang="less">
	.message{
		position: fixed;
		opacity: 0;
		transform: translateY(-200px);
		width: 96%;
		left: 2%; 
		top: 10px;
		border-radius: 10px;
		background: #fff;
		box-shadow: 0 0 20px rgba(0,0,0,0.1);
		min-height: 50px;
		display: flex;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
		
		.img{
			width: 70px;
			height: 70px;
			margin-right: 20px;
		}
		
		.txt{
			flex: 1;
			
			.title{
				font-size: 30px;
				color: #454647;
			}
			
			.mesg{
				font-size: 25px;
				color: #919191;					
			}
			
		}
	}
</style>
