<template>
	<view class="mess_list">
		<view class="message" :animation="animation">
			<image class="img" src="/static/images/touxiang.jpg" mode="aspectFit"></image>
			<view class="txt">
				<view class="title">
					{{mesage.title}}
				</view>
				<view class="mesg">
					{{mesage.mesg}}
				</view>
			</view>
		</view>
		<view class="message" :animation="animation">
			<image class="img" src="/static/images/touxiang.jpg" mode="aspectFit"></image>
			<view class="txt">
				<view class="title">
					{{mesage.title}}
				</view>
				<view class="mesg">
					{{mesage.mesg}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	
	export default {
		data(){
			return {
				mesage: {
					title: '消息内容',
					mesg: '您有一条消息体'
				},
				animation: {}
			}
		},
		methods: {
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
			}
		},
		onLoad:function(){
			this.pagename = this.getPage()
		},
		mounted(event){
			this.show()
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
		box-shadow: 0 0 20px rgba(0,0,0,0.4);
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
