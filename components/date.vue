<template>
	<view class="date_fater" v-show="datebool">
		<view class="date_box">
			<view class="date_c">
				<view class="date_one">
					 <picker mode="date" value="" @change="getStartTime">
						<view class="picker_one">
						   {{startTime}}
						</view>
					  </picker>
				</view>
				<view class="date_one">
					<picker mode="date" value="" @change="getEndTime">
						<view class="picker_one">
							{{endTime}}
						</view>
					</picker>
				</view>
			</view>
			<view class="date_btn">
				<button @tap="hide" type="default">取消</button>
				<button @tap="sub" type="primary">确定</button>
			</view>
		</view>
	</view>
</template>

<script>	
	
	export default {
		data(){
			return {
				startTime: '开始时间',
				endTime: '结束时间'
			}
		},
		props: ['datebool'],
		methods: {
			// 获取开始时间
			getStartTime(e){
				console.log(e.detail.value)
				this.startTime = e.detail.value
			},
			// 获取结束时间
			getEndTime(e){
				console.log(e.detail.value)
				this.endTime = e.detail.value
			},
			hide(){
				// 子传父
				this.$emit('dateclick', {
					bool: false,
					start: '',
					end: ''
				})
				
			},
			// 确定时间
			sub(){
				if(this.startTime == '开始时间' || this.endTime == '结束时间'){
					uni.showToast({
						icon: 'none',
						title: '请选择时间'
					})
					return
				}else if(new Date(this.endTime).getTime() < new Date(this.startTime).getTime()){
					uni.showToast({
						icon: 'none',
						title: '开始时间不能大于结束时间'
					})
					return 
				}
				
				// 子传父
				this.$emit('dateclick', {
					bool: false,
					start: this.startTime,
					end: this.endTime
				})
			}
		},
		onLoad:function(){
			
		},
		mounted(event){
			
		}
	}
</script>

<style lang="less">
	.date_fater{
		position: fixed;
		left:  0 ;
		top: 0 ;
		height: 100%;
		width: 100%;
		background: #fff;
		z-index: 999;
	}
	
	.date_box{
		padding: 20px;
	}
	
	.date_one{
		margin: 20px 0;
		
		.picker_one{
			font-size: 30px;
			border-radius: 10px;
			background: #EDEDED;
			padding: 20px 20px;
			
		}
	}
	
	
	.date_btn{
		display: flex;
		
		button{
			flex: 1;
			margin: 20px 0;
			
			&:first-child{
				margin-right: 20px;
			}
		}
	}
	
</style>
