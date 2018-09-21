<template>
	<view class="content">
		<!-- 
		<view class="xiaoming xiaoxiao">
			<text class="name">小明</text>
			<view class="list">
				<view class="li" v-for="(item,key) in mymess" :key="key">
					<view class="h1">
						{{item.text}}
					</view>
					<view class="date">
						{{item.updatedAt}}
					</view>
				</view>
			</view>
		</view>
		<view class="xiaohong xiaoxiao"> 
			<text class="name">小红</text>	
			<view class="list">
				<view class="li" v-for="(item,key) in youmess" :key="key">
					<view class="h1">
						{{item.text}}
					</view>
					<view class="date">
						{{item.updatedAt}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="submit">
			<input  v-model="xiaoxi"  placeholder="@xxx 聊天" />
			<button @tap="setMessage()" type="default">留言</button>
		</view> -->
	</view>
</template>

<script>
// 	import AV from '../../static/js/av-weapp-min.js'
// 	import {Realtime, TextMessage, Event} from '../../static/js/realtime.weapp.min.js' 
// 	
// 	// 初始化即时通讯 
// 	const realtime = new Realtime({
// 		appId: '2QYYLWusXmvGO7uE2CTL7J0j-gzGzoHsz',
// 		appKey: '0oRtHAr5HReVfjQEuf4fcrYN',
// 	});
// 	
// 	
// 	export default {
// 		data(){
// 			return {
// 				title: 'kefuxitong',
// 				mymess: [],
// 				youmess: [],
// 				xiaoxi: ''
// 			}
// 		},
// 		mounted(){
// 			this.soctket()
// 			this.getMessage()
// 		},
// 		methods:{
// 			soctket(){
// 					wx.connectSocket({
// 						url: 'ws://pusher.51play.com/websocket'
// 						
// 					})
// 					
// 					wx.onSocketOpen(function(res){
// 						console.log(res)
// 					})
// 			},
// 			getMessage(){
// 				let _this = this
// 				// Jerry 登录
// 				realtime.createIMClient('Jerry').then(function(jerry) {
// 				jerry.on(Event.MESSAGE, function(message, conversation) {
// 					_this.youmess.push(message)
// 				});
// 				}).catch(console.error);
// 			},
// 			setMessage(){
// 				let _this = this
// 				if(_this.xiaoxi == ''){
// 					uni.showToast({
// 						title: '聊天内容不能为空',
// 						duration: 2000
// 					})
// 					return
// 				}
// 				// Tom 用自己的名字作为 clientId，获取 IMClient 对象实例
// 				realtime.createIMClient('Tom').then(function(tom) {
// 				  // 创建与Jerry之间的对话
// 				  return tom.createConversation({
// 					members: ['Jerry'],
// 					name: 'Tom & Jerry',
// 				  });
// 				}).then(function(conversation) {
// 				  // 发送消息
// 				  return conversation.send(new TextMessage(`${_this.xiaoxi}`));
// 				}).then(function(mesg) {
// 				  _this.mymess.push(mesg)
// 				  _this.xiaoxi = ''
// 				}).catch(console.error);
// 			}
// 		},
// 	}
</script>

<style lang="less">
	.content { 
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
	
	.list{
		margin-top: 40px;
		margin-bottom: 20px;
		
		.li{
			font-size: 20px;
			
			.h1{}
			.date{
				font-size: 16px;
				color: #CCCCCC;
			}
		}
	}
	
	.xiaoxiao{
		background: #ededed;
		border-radius: 10px;
		margin: 10px;
		min-height: 200px;
		padding: 10px;
		position: relative;
	}
	
	.xiaoxiao{
		.name{
			position: absolute;
			width: 100%;
			height: 20px;
			line-height: 20px;
			text-align: center;
			color: #000;
			font-size: 22px;
			left: 0;
			top: 10px;
			border-bottom: 1px dashed #ccc;
			padding-bottom: 10px;
		}		
	}
	
	.xiaohong{
		background: #fff;
		border: 1px solid #EDEDED;
	}
	
	
	.submit{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		box-shadow: 0 0 3px rgba(0,0,0,0.2);
		
		input{
			flex: 1;
			font-size: 26px;
			height: 100%;
			padding: 20px;
		}
		button{
			width: 120px;
			font-size: 26px;
			
		}
	}
</style>
