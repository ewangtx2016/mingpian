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
			
			
			<!-- list -->
			<view class="radar_list">
				<view class="radar_one" v-for="(item, index) in listdata" :key="index">
					<view class="list">
						<view class="one">
							<image :src="item.userImgUrl" mode="aspectFit"></image>
							<view class="meg">
								{{item.userName}}
							</view>
							<view class="date">
								<view :class="item.bool ? 'jia hover' : 'jia'" @tap="toggle(item)">
								</view>
							</view>
						</view>
					</view>
					<view class="message_list" :class="item.bool ? 'hover' : ''">
						<view class="li" v-if="onepage.visit_business_card">
							<text>查看名片 ：</text>
							{{onepage.visit_business_card}}次
						</view>
						<view class="li" v-if="onepage.forward_business_card">
							<text>转发名片 ：</text>
							{{onepage.forward_business_card}}次
						</view>
						<view class="li" v-if="onepage.save_business_card">
							<text>保存名片 ：</text>
							{{onepage.save_business_card}}次
						</view>
						
						<view class="li" v-if="onepage.save_to_address_book">
							<text>保存通讯录 ：</text>
							{{onepage.save_to_address_book}}次
						</view>
						
						<view class="li" v-if="onepage.click_like_business_card">
							<text>点赞 ：</text>
							{{onepage.click_like_business_card}}次
						</view>
						
						<view class="li" v-if="onepage.visit_shopping_mall">
							<text>查看商城 ：</text>
							{{onepage.visit_shopping_mall}}次
						</view>
						
						<view class="li" v-if="onepage.visit_product">
							<text>查看商品 ：</text>
							{{onepage.visit_product}}次
						</view>
						
						<view class="li" v-if="onepage.consult">
							<text>咨询 ：</text>
							{{onepage.consult}}次
						</view>
						
						<view class="li" v-if="onepage.dial">
							<text>拨打电话 ：</text>
							{{onepage.dial}}次
						</view>
						
						
						<view class="li" v-if="onepage.buying">
							<text>正在购买 ：</text>
							{{onepage.buying}}次
						</view>
						
						<view class="li" v-if="onepage.unpaid">
							<text>待支付 ：</text>
							{{onepage.unpaid}}次
						</view>
						
						<view class="li" v-if="onepage.pay_success">
							<text>购买成功 ：</text>
							{{onepage.pay_success}}次
						</view>
					</view>
				</view>
				
				
				
			</view>
			<!-- list -->
			
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
				listdata: [],
				onepage: {} // 单挑数据
			}
		},
		components:{
			'radarMenu': radar_menu,
			'myDate': my_date,
			'ldMenu': ld_menu
		},
		onLoad(query){
			
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
			// 点击获取单条数据
			toggle(item){
				let _this = this
				for(let ite of _this.listdata){
					if(ite!=item){
						ite.bool = false
					}
				}
				
				item.bool = !item.bool
				_this.getOneMessage(item)
			},
			// 显示日历
			showDate(){
				this.datebool = true
			},
			// 子传父 - 时间获取
			dateclick(val){
				//隐藏日期选择框
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
			// 获取单个数据
			getOneMessage(item){
				let _this = this
				PUBLIC.GET({
					url: `${_this.HTTPS_URL}/event/radar/user_visit_detail_count`,
					data: {
						userId: item.userid,
						startDate: _this.stime,
						endDate: _this.etime
					}
				}).then((data)=> {
					_this.onepage = data.userVisitSellerDetail
				})
			},
			// list
			getRadarList(stime,etime){
				let _this = this
				PUBLIC.GET({
					url: `${_this.HTTPS_URL}/event/radar/user_visit_count`,
					data: {
						startDate: stime,
						endDate: etime
					}
				}).then((data)=> {
					for(let item of data.radarStatUserList){
						item.bool = false
					}
					_this.listdata = data.radarStatUserList
				})
			}
		}		
	}
</script>

<style lang="less">
	
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
