<template>
	<view class="kefu">
		
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
			<input type="text"  value="" v-model="inputvalue"  />
			<button type="primary" @tap="subMessage">发送</button>
		</view>
		
	</view> 
</template>

<script>
	const { Realtime, TextMessage } = require('../../static/js/realtime.weapp.min.js')
	
	const PUBLIC = require('../../static/js/public.js')
	
	
	export default {
		data(){
			return {
				thisList: [],
				inputvalue: '',
				nowTime: PUBLIC.RETURN_NEWTIME_X(new Date().getTime())
			}
		},
		mounted(){
			
		},
		onLoad:function(query){
			let storage = uni.getStorageSync('CODE')
			let userinfo = uni.getStorageSync('USERINFO')
			this.userinfo = userinfo
			this.ke_id = `KE_${query.userid}`
			this.zhu_id = `ZHU_${storage.userId}`
			this.setSocket()
			this.addMessage({
				msg: '首发消息'
			})
		},
		methods:{
			// 发送消息
			subMessage(){
				console.log(this.inputvalue)
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
			addMessage({msg}){
				let _this = this
				_this.realtime.createIMClient(_this.zhu_id).then(function(tom) {
					return tom.createTemporaryConversation({
						members: [_this.ke_id],
					});
				}).then(function(conversation) {
						return conversation.send(new TextMessage(msg));
				}).then((data)=>{
						console.log('消息发送成功', data)
						let mess = {
							mesg: msg,
							time: PUBLIC.RETURN_NEWTIME_X(new Date().getTime()),
							type: 'zhu',
							imgurl: _this.userinfo.avatarUrl
						}
						_this.thisList.push(mess)
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
