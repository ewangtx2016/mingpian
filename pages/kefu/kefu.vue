<template>
	<view class="kefu" id="j_page">
		
		<block v-for="(item, index) of thisList" :key="index">
			
			<view class="time" v-if="nowTime != item.time">
				<text>
					{{item.time}}
				</text>
			</view>
			
			<view :class="item.type == 'zhu' ? 'one' : 'one two' ">
				<view class="li">
					
				</view>
				<view class="mes">
					<!-- 未读 class="box noread" -->
					<view class="box" > 
						{{item.mesg}}
						<text class="jian"></text>
					</view>
				</view>
				<view class="li">
					<image :src="item.imgurl" mode="aspectFill"></image>
				</view>
			</view>
			
			
		</block>
		
		<!-- 聊天窗口 -->
		
		<view class="sub_box">
			<input type="text"  value="" v-model="inputvalue" @confirm="subMessage"  />
			<button type="primary" @tap="subMessage">发送</button>
		</view>
		
	</view> 
</template>

<script>
	const { Realtime, TextMessage, Message, Event } = require('../../static/js/realtime.weapp.min.js')
	
	const PUBLIC = require('../../static/js/public.js')
	
	
	export default {
		data(){
			return {
				thisList: [],
				inputvalue: '',
				nowTime: PUBLIC.RETURN_NEWTIME_X(new Date().getTime())
			}
		},
		created:function(){
			this.setSocket()
		},
		mounted(){
			
		},
		onLoad:function(query){
			let storage = uni.getStorageSync('CODE')
			let userinfo = uni.getStorageSync('USERINFO')
			this.userinfo = userinfo
			this.ke_id = `KE_${query.userid}`
			this.zhu_id = `ZHU_${storage.userId}`
			this.getHisList()
			this.getMessage()
		},
		methods:{
			// 发送消息
			subMessage(){
				if(this.inputvalue== ''){
					wx.showToast({
						title:'内容不能为空',
						icon: 'none'
					})
					return 
				}
				this.addMessage({
					msg: this.inputvalue
				})
			},
			setSocket(){
					// 初始化即时通讯 SDK
					this.realtime = new Realtime({
						appId: '99csVkB6vMSHk1XPuiuB8W3c-gzGzoHsz',
						appKey: 'mpo0IaNxiCBd3bgOT7Q5Gxpo',
					});
			},
			//滚动到底部
			scrollToBottom(){
				wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect){
					console.log('底部的江湖里，', rect, rect.bottom)
					// 使页面滚动到底部
					wx.pageScrollTo({
						scrollTop: (rect.height + 100)
					})
				}).exec()
			},
			// 获取历史纪录
			getHisList(){
				let _this = this
				wx.showLoading({
					title: '加载中，请稍等'
				})
				_this.realtime.createIMClient(_this.zhu_id).then(function(tom) {
					return tom.createTemporaryConversation({
						members: [_this.ke_id],
					});
				}).then(function(conversation) {
						conversation.queryMessages({
							limit: 10, // limit 取值范围 1~1000，默认 20
						}).then(function(messages) {
							// 最新的十条消息，按时间增序排列
							let newmess = []
							for(let one of messages){
								newmess.push(one.content)
							}
							_this.thisList = newmess
							_this.scrollToBottom()
							
							wx.hideLoading()
						})
				}).catch(console.error);

			},
			// 发送消息
			addMessage({msg}){
				let _this = this
				_this.realtime.createIMClient(_this.zhu_id).then(function(tom) {
					return tom.createTemporaryConversation({
						members: [_this.ke_id],
					});
				}).then(function(conversation) {
					return conversation.send(new Message({
						mesg: msg,
						time: PUBLIC.RETURN_NEWTIME_X(new Date().getTime()),
						imgurl: _this.userinfo.avatarUrl,
						type: 'zhu'
					}));
				}).then((data)=>{
						_this.inputvalue = ''
						_this.nowTime = PUBLIC.RETURN_NEWTIME_X(new Date().getTime())
						_this.thisList.push(data.content)
						_this.scrollToBottom()
				}).catch(console.error);
			},
			// 接受消息
			getMessage(){
				let _this = this
				console.log('现代人的时代是生贵', _this.zhu_id)
				_this.realtime.createIMClient(_this.zhu_id).then(function(tom) {
				  tom.on(Event.MESSAGE, function(message, conversation) {
					console.log('Message received: ' + message.text);
				  });
				}).catch(console.error);
			}
		}
	}
</script>

<style lang="less">
	.kefu{
		overflow: hidden;
		min-height: 100%;
		background: rgba(242,242,242,1);
		padding-bottom: 100px;
		
		.sub_box{
			position: fixed;
			bottom: 20px;
			left: 0;
			width: 100%;
			height: 70px;
			display:flex;
			padding: 0 20px;
			box-sizing:border-box;
			
			input{
				border-radius: 10px;
				border:2px solid rgba(145,145,145,0.5);
				background: #fff;
				flex: 1;
				height: 100%;
				padding: 0 20px;
			}
			
			button{
				width: 120px;
				height: 100%;
				padding: 0;
				background: #4A77B0;
				font-size: 35px;
				margin-left: 20px;
				line-height: 200%;
			}
		}
		
		.time{
			margin: 20px 0;
			text-align: center;
			
			text{
				background: rgba(153,153,153,1);
				color: #fff;
				border-radius: 100px;
				display: inline-block;
				margin: auto;
				font-size: 25px;
				text-align: center;
				padding: 10px 30px;
			}
		}
		
		.one{
			
			
			&.two{
				.mes{
					text-align: left;
					.box{
						background:#fff;
						border: 1px solid #EDEDED;
						color:#000000;
						
						&.noread{
							&:after{
								position: absolute;
								content: '未读';
								font-size: 25px;
								color: #4A77B0;
								left: auto;								
								right: -80px;
								top: 50%;
								margin-top: -20px;
							}
						}
						
						.jian{
							right: auto;
							left: -10px;
							background: #FFFFFF;
							border-left:1px solid #EDEDED;							
							border-bottom:1px solid #EDEDED;
						}
					}
				}
			}
			
			
			
			display: flex;
			margin: 30px 0;
			
			.li{
				width: 150px;
				text-align:center;
				image{
					width:120px;
					height: 120px;
					display: inline-block;
					border-radius: 1000px;
					background: #EDEDED;
					box-shadow: 0 0 20px rgba(0,0,0,0.2);
				}
			}
			
			.mes{
				flex: 1;
				text-align: right;
				
				.box{
					border-radius: 20px;
					background: #4A77B0;
					color: #fff;
					font-size: 30px;
					padding: 20px;
					display: inline-block;
					margin-right: 20px;
					margin-left: 20px;
					position: relative;
					text-align:left;
					
					
					&.noread{
						&:after{
							position: absolute;
							content: '未读';
							font-size: 25px;
							color: #4A77B0;
							left: -80px;
							top: 50%;
							margin-top: -20px;
						}
					}
					
					.jian{
						content: '';
						position: absolute;
						width: 20px;
						height: 20px;
						right: -10px;
						top: 20px;
						transform: rotate(45deg);
						background: #4A77B0;
					}
				}
			}
			
		}
		
	}
</style>
