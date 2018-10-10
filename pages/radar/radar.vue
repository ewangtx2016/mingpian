<template>
	<view class="radar_father">
			<view class="radar">
				<radar-menu></radar-menu>
			</view>
			
			<!-- list -->
			<view class="radar_list">
				
				
				<view class="radar_one" v-for="(item, index) in datalist" :key="index">
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
	
	// 导入公共方法
	const PUBLIC = require('../../static/js/public.js')
	
	export default {
		data(){
			return {
				datalist: [],
				page: 1
			}
		},
		components:{
			'radarMenu': radar_menu,
			'ldMenu': ld_menu
		},
		computed: {
			...mapState([
				'HTTPS_URL'
			])
		},
		mounted(){
			let _this = this
			this.getList(this.page).then(()=>{
				_this.page++
				console.log(_this.page)
			})
		},
		// 上拉加载
		onReachBottom(){
			let _this = this
			_this.getList(_this.page).then(()=>{
				_this.page++
				console.log(_this.page)
			})
		},
		methods:{
			// 获取雷达数据 - 时间 数据
			getList(currentPage, pageSize, orderByClause){
				let _this = this
				
				currentPage = currentPage ? currentPage : 1
				pageSize = pageSize ? pageSize : 10
				orderByClause = orderByClause ? orderByClause : 'crTime,desc'
				
				return PUBLIC.GET({
					url: `${_this.HTTPS_URL}/event/radar/list`,
					data: {
						currentPage,
						pageSize,
						orderByClause
					}
				}).then((data)=>{
					let newData = data.events
					for(let item of newData){
						item.crTime = PUBLIC.RETURN_NEWTIME_X(item.crTime)
					}
					_this.datalist = _this.datalist.concat(newData)
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
