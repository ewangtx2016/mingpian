<template>
	<view class="message">
		<view class="message_list">
			<view class="one" @tap="gokefu(0)">
				<image class="img" src="../../static/images/touxiang.jpg" mode="aspectFill"></image>
				<view class="mes">
					<view class="title">
						<view class="name">
							名称姓名
						</view>
						<view class="time">
							2018/09/12 12:12
						</view>
					</view>
					<view class="p">
						这是一段话
					</view>
				</view>
			</view>
			
			<view class="one">
				<image class="img" src="../../static/images/touxiang.jpg" mode="aspectFill"></image>
				<view class="mes">
					<view class="title">
						<view class="name">
							时间名字
						</view>
						<view class="time">
							2018/09/12 12:12
						</view>
					</view>
					<view class="p">
						这是一段话
					</view>
				</view>
			</view>
			
			
			<view class="one">
				<image class="img" src="../../static/images/touxiang.jpg" mode="aspectFill"></image>
				<view class="mes">
					<view class="title">
						<view class="name">
							名称
						</view>
						<view class="time">
							2018/09/12 12:12
						</view>
					</view>
					<view class="p">
						这是一段话
					</view>
				</view>
			</view>
			
			
		</view>	
		
		<!-- 底部导航 -->
		<ld-menu></ld-menu>
	</view>
</template>

<script>
	import ld_menu from '../../components/ldmenu.vue' 
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	export default {
		data(){
			return {
				
			}
		},
		components:{
			'ldMenu': ld_menu
		},
		computed: {
			...mapState([
				'HTTPS_URL'
			])
		},
		mounted(){
			
		},
		methods:{
			gokefu(id){
				uni.navigateTo({
					url: `/pages/kefu/kefu?uid=${id}`
				})
			},
			
		},
	}
</script>

<style lang="less">
	.message_list{
		.one{
			display: flex;
			padding: 20px 0;
			border-bottom: 1px solid #EDEDED;
			margin: 20px;
			
			.img{
				width: 120px;
				height: 120px;
				border-radius: 1000px;
				background: #EDEDED;
				box-shadow: 0 0 20px rgba(0,0,0,0.2);
				margin-right: 20px;
			}
			
			.mes{
				flex: 1;
				
				.title{
					overflow:hidden;
					
					.name{
						float: left;
						font-size: 35px;
						color: #373737;
					}
					
					.time{
						float: right;
						font-size: 25px;
						color: #AAAAAA;
						margin-top: 15px;
					}
				}
				
				
				.p{
					color: #AAAAAA;
					margin-top: 20px;
					font-size: 30px;
				}
			}
			
		}
	}
</style>
