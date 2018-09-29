<template>
	<view class="radar_father">
			<view class="radar">
				<radar-menu></radar-menu>
			</view>
			
			<!-- 日历插件 -->
				<my-date :datebool="datebool" @dateclick="dateclick"></my-date>
			<!-- 日历插件 -->	
			
			<!-- list -->
			<view class="radar_list">
				
				<view class="radar_one" v-for="(item, index) of datalist" :key="index">
					<view class="time">
						{{item.crTime}} 
					</view>
					<view class="list">
						<view class="one">
							<image :src="item.userImgUrl" mode="aspectFit"></image>
							<view class="meg">
								<view class="txt">
									{{item.userName}}正在
										<view v-if="item.optionType == 'visit_business_card' ">
											<text>查看</text>你的<text>名片</text>
										</view>
										<view v-if="item.optionType == 'forward_business_card' ">
											<text>转发</text>你的<text>名片</text>
										</view>
										<view v-if="item.optionType == 'save_business_card' ">
											<text>保存</text>你的<text>名片</text>
										</view>
										<view v-if="item.optionType == 'save_to_address_book' ">
											<text>保存</text>你的<text>通讯录</text>
										</view>
										<view v-if="item.optionType == 'click_like_business_card' ">
											给你<text>点赞</text>
										</view>
										<view v-if="item.optionType == 'visit_shopping_mall' ">
											<text>查看</text>你的<text>商城</text>
										</view>
										<view v-if="item.optionType == 'visit_product' ">
											<text>查看</text>你的<text>商品</text>
										</view>
										<view v-if="item.optionType == 'consult' ">
											<text>咨询</text>你的<text>问题</text>
										</view>
										<view v-if="item.optionType == 'dial' ">
											<text>拨打</text>你的<text>电话</text>
										</view>
										<view v-if="item.optionType == 'buying' ">
											<text>正在购买</text>你的<text>商品</text>
										</view>
										<view v-if="item.optionType == 'unpaid' ">
											<text>准备支付</text>你的<text>商品</text>
										</view>
										<view v-if="item.optionType == 'pay_success' ">
											<text>成功购买</text>你的<text>商品</text>
										</view>
									第{{item.optionCnt}}次。
								</view>
								
								
								<view class="title" v-if="item.optionCnt == 1">
									抓住机会沟通吧
								</view>
								<view class="title" v-if="item.optionCnt == 2">
									把握深度交流的机会
								</view>
								<view class="title" v-if="item.optionCnt == 3">
									有希望转化的潜在客户
								</view>
								<view class="title" v-if="item.optionCnt == 4">
									建议标注为重点客户
								</view>
								<view class="title" v-if="item.optionCnt >= 5">
									成交在望
								</view>
							</view>
							<!-- <view class="date">
								{{item.crTime}}
							</view> -->
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
	import ld_menu from '../../components/ldmenu.vue' 
	import my_date from '../../components/date.vue'
	
	// 导入公共方法
	const PUBLIC = require('../../static/js/public.js')
	
	
	export default {
		data(){
			return {
				datebool: false,
				type: 'visit_business_card',
				datalist: []
			}
		},
		components:{
			'radarMenu': radar_menu,
			'ldMenu': ld_menu,
			'myDate': my_date
		},
		mounted(){
			
		},
		computed: {
			...mapState([
				'HTTPS_URL'
			])
		},
		onLoad(query){
			this.type = query.type
			this.getlist(query.type)
		},
		methods:{
			// 子传父 - 时间获取
			dateclick(val){
				//隐藏日期选择框
				this.datebool = val.bool  
				// 加载日期选择时间的列表数据
				this.stime = val.start
				this.etime = val.end
				this.getRadarList(this.type, PUBLIC.RETURN_NEWTIME(val.start), PUBLIC.RETURN_NEWTIME(val.end))
			},
			// 获取时间 雷达记录
			getlist(type){
				let time = new Date().getTime()
				let newtime = time - (7 * 24 * 60 * 60 * 1000)
				let etime = PUBLIC.RETURN_NEWTIME()
				let stime = PUBLIC.RETURN_NEWTIME(newtime)
				
				this.etime = etime
				this.stime = stime
				// 获取
				this.getRadarList(type, this.stime, this.etime)
			},
			// list
			getRadarList(type,stime,etime){
				let _this = this
				PUBLIC.GET({
					url: `${_this.HTTPS_URL}/event/radar/seller_radar_event_detail`,
					data: {
						opt: type,
						startDate: stime,
						endDate: etime
					}
				}).then((data)=> {
					let newdata = data.userVisitSellerDetail
					for(let item of newdata){
						item.crTime = PUBLIC.RETURN_NEWTIME_X(item.crTime)
					}
					_this.datalist = newdata
				})
			}
		},
	}
</script>

<style lang="less">
	
	.radar_father{
		background: linear-gradient(to bottom, rgba(209,209,209,1) 30%, #fff 70%);
		min-height: 100%;
	}
	
	// 列表样式
	.radar_list{
		padding: 20px;
		
		.radar_one{
			margin: 10px 0;
			margin-bottom: 20px;
			
			.time{
				font-size: 30px;
				color: #373737;
				padding: 0 20px;
			}
			
			.list{
				.one{
					padding: 20px;
					margin: 10px 0;
					background: #fff;
					border-radius: 10px;
					box-shadow: 0 0 10px rgba(0,0,0,0.1);
					display:flex;
					
					
					> image{
						width: 120px;
						height: 120px;
						border-radius: 1000px;
						box-shadow: 0 0 10px rgba(0,0,0,0.1);
						margin-right: 20px;
					}
					
					.meg{
						flex: 1;
						align-items: center;
						
						.txt{
							margin-bottom: 20px;
							
							view{
								display: inline-block;
								
								text{
									color: #4A77B0;
								}
							}
						}
						
						.txt,.title{
							color: #373737;
							font-size: 30px;
							line-height: 35px;
						}
					}
					
					
					.date{
						width: 100px;
						color: #919191;
						font-size: 30px;
						text-align: center;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					
					
				}
			}
		}
	}
</style>
