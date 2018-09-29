<template>
	<view class="radar_father">
			<view class="radar">
				<radar-menu></radar-menu>
			</view>
			
			<view class="check_time">
				<text>
					7天内被查看的行为统计
				</text>
				
				<view class="button" @tap="showDate">
					<image src="../../static/images/icon_rili.png" mode="aspectFit"></image>
				</view>
			</view>
			
			<!-- 日历插件 -->
				<my-date :datebool="datebool" @dateclick="dateclick"></my-date>
			<!-- 日历插件 -->	
			
			
			<view class="bg_white">
				<!-- 行为 -->
					<view class="pic_link">
							<view class="li">
								<view class="one" @tap="gotopage('visit_product')">
									<image src="../../static/images/icon_ld1.png" mode="scaleToFill"></image>
									<view class="txt">
										<view class="h">
											查看商品
										</view>
										<view class="p">
											{{listdata.visit_product}}
										</view>
									</view>
								</view>
								<view class="one"  @tap="gotopage('visit_business_card')">
									<image src="../../static/images/icon_ld2.png" mode="scaleToFill"></image>
									<view class="txt">
										<view class="h">
											查看名片
										</view>
										<view class="p">
											{{listdata.visit_business_card}}
										</view>
									</view>
								</view>
							</view>
							<view class="li">
								<view class="one"   @tap="gotopage('pay_success')">
									<image src="../../static/images/icon_ld3.png" mode="scaleToFill"></image>
									<view class="txt">
										<view class="h">
											购买次数
										</view>
										<view class="p">
											{{listdata.pay_success}}
										</view>
									</view>
								</view>
								<view class="one"   @tap="gotopage('forward_business_card')">
									<image src="../../static/images/icon_ld4.png" mode="scaleToFill"></image>
									<view class="txt">
										<view class="h">
											转发名片
										</view>
										<view class="p">
											{{listdata.forward_business_card}}
										</view>
									</view>
								</view>
							</view>
					</view>
					<!-- 行为 -->
					
					
					<view class="menu_list">
						<view class="li"    @tap="gotopage('consult')">
							<image src="../../static/images/icon_ld_1.png" mode="widthFix"></image>
							<view class="txt">
								咨询客服
							</view>
							<view class="nub">
								{{listdata.consult}}
							</view>
						</view>
						
						<view class="li"    @tap="gotopage('save_to_address_book')">
							<image src="../../static/images/icon_ld_2.png" mode="widthFix"></image>
							<view class="txt">
								保存电话
							</view>
							<view class="nub">
								{{listdata.save_to_address_book}}
							</view>
						</view>
						
						<view class="li">
							<image src="../../static/images/icon_ld_3.png" mode="widthFix"></image>
							<view class="txt">
								觉得靠谱
							</view>
							<view class="nub">
								0
							</view>
						</view>
						
						<view class="li"    @tap="gotopage('dial')">
							<image src="../../static/images/icon_ld_4.png" mode="widthFix"></image>
							<view class="txt">
								咨询电话
							</view>
							<view class="nub">
								{{listdata.dial}}
							</view>
						</view>
						
					</view>
					
					
			</view>
			
			<!-- 底部菜单 -->
			<ld-menu></ld-menu>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'

	import radar_menu from '../../components/radar_menu.vue'
	import my_date from '../../components/date.vue'
	import ld_menu from '../../components/ldmenu.vue'
	
	
	// 导入公共方法
	const PUBLIC = require('../../static/js/public.js')
	
	export default {
		data(){
			return {
				datebool: false,
				listdata: {}
			}
		},
		components:{
			'radarMenu': radar_menu,
			'myDate': my_date,
			'ldMenu': ld_menu
		},
		mounted(){
			this.getlist()
		},
		computed: {
			...mapState([
				'HTTPS_URL'
			])
		},
		methods:{
			toggle(obj){
				obj.bool = !obj.bool
			},
			// 显示日历
			showDate(){
				this.datebool = true
			},
			// 子传父
			dateclick(val){
				// 时间获取
				this.datebool = val.bool
				// 加载日期选择时间的列表数据
				this.stime = val.start
				this.etime = val.end
				this.getRadarList(PUBLIC.RETURN_NEWTIME(val.start), PUBLIC.RETURN_NEWTIME(val.end))
			},
			// 获取时间 雷达记录
			getlist(){
				let time = new Date().getTime()
				let newtime = time - (7 * 24 * 60 * 60 * 1000)
				let etime = PUBLIC.RETURN_NEWTIME()
				let stime = PUBLIC.RETURN_NEWTIME(newtime)
				
				this.etime = etime
				this.stime = stime 
				// 获取
				this.getRadarList(this.stime, this.etime)
			},
			// list
			getRadarList(stime,etime){
				let _this = this
				PUBLIC.GET({
					url: `${_this.HTTPS_URL}/event/radar/seller_radar_analyse`,
					data: {
						startDate: stime,
						endDate: etime
					}
				}).then((data)=> {
					_this.listdata = data.sellerRadarStatistics
				})
			},
			// 跳转详情列表
			gotopage(id){
				uni.navigateTo({
					url: `/pages/radar_x_page/radar_x_page?type=${id}`
				})
			}
		},
	}
</script>

<style lang="less">
	
	.bg_white{
		background: #fff;
		overflow: hidden;
		min-height: 100%;
	}
	
	
	// 菜单
	.menu_list{
		margin: 20px 0;
		padding: 0 40px;
		
		.li{
			display: flex;
			padding: 20px 0;
			border-bottom: 1px solid #C6C6C6;
			
			
			image{
				width: 80px;
				height: 80px;
			}
			
			.txt{
				flex: 1;
				font-size: 40px;
				color: #515151;
				margin: 0 30px;
				display: flex;
				align-items: center;
			}
			
			.nub{
				width: 60px;
				text-align: center;
				font-size: 35px;
				color: #515151;
				display: flex;
				align-items: center;
			}
		}
	}
	
	// 行为链接
	.pic_link{
		margin: 20px;
		border-radius: 20px;
		box-shadow: 0 0 30px rgba(0,0,0,0.4);
		padding:10px  20px;
		
		.li{
			display:flex;
			margin: 50px 0;
			
			.one{
				flex: 1;
				display: flex;
				
				image{
					width: 90px;
					height: 70px;
					margin-left: 20px;
				}
				
				.txt{
					flex: 1;
					text-align: center;
					align-items: center;
					justify-content: center;
					
					.h{
						font-size: 32px;
						color: #515151;
					}
					
					.p{
						font-size: 35px;
						font-weight: bold;
						color: #4A77B0;
					}
				}
			}
		}
	}
	
	.radar_father{
		background: linear-gradient(to bottom, rgba(209,209,209,1) 30%, #fff 70%);
		min-height: 100%;
	}
	
	.check_time{
		background: #fff;
		border-bottom: 1px solid #EDEDED;
		position: relative;
		height: 70px;
		line-height: 50px;
		padding: 0 20px;
		font-size: 25px;
		color: rgba(0,0,0,0.6);
		
		.button{
			position:absolute;
			right: 30px;
			top: 0px;
			
			image{
				height: 50px;
				width: 50px;
			}
		}
		
	}
	
	// 列表样式
	.radar_list{
		padding: 20px;
		
		.message_list{
			background: rgba(0,0,0,0.05);
			height: 0px;
			padding: 0px 20px;
			overflow: hidden;
			transition-duration: 0.5s;
			
			&.hover{
				height: auto;
				padding: 20px;
			}
			
			.li{
				font-size: 30px;
				margin: 10px 0;
				
				text{
					font-weight: bold;
				}
			}
		}
		
		.radar_one{
			margin: 10px 0;
			margin-bottom: 20px;
			background: #fff;
			border-radius: 10px;
			box-shadow: 0 0 10px rgba(0,0,0,0.1);
			
			
			.time{
				font-size: 30px;
				color: #373737;
				padding: 0 20px;
			}
			
			.list{
				.one{
					display:flex;
					padding: 20px;
					
					> image{
						width: 60px;
						height: 60px;
						border-radius: 1000px;
						box-shadow: 0 0 10px rgba(0,0,0,0.1);
						margin-right: 20px;
					}
					
					.meg{
						flex: 1;
						text-align: left;
						align-items: center;
						font-size: 30px;
						display: flex;
						
						.txt{
							margin-bottom: 20px;
							
							text{
								color: #4A77B0;
							}
						}
						
						.txt,.title{
							color: #373737;
							line-height: 35px;
						}
					}
					
					
					.date{
						width: 60px;
						color: #919191;
						font-size: 30px;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
						
						
						.jia{
							position: relative;
							border: 1px solid #ccc;
							border-radius: 100px;
							height: 50px;
							width: 50px;
							transition-duration: 0.5s;
							
							&.hover{
								transform: rotate(180deg);
								
								&:before{
									transform: rotate(0);
								}	
							}
							
							
							&:after{
								content: '';
								position: absolute;
								left: 10px;
								top: 25px;
								width: 30px;
								height: 5px;
								background: #ccc;
							}
							
							&:before{
								content: '';
								position: absolute;
								left: 10px;
								top: 25px;
								width: 30px;
								height: 5px;
								background: #ccc;
								transform: rotate(-90deg);
								transition-duration: 0.5s;
							}
						}
					}
					
					
				}
			}
		}
	}
</style>
