<template>
	<view class="radar_menu">
		<navigator :class="pagename == 'radar' ? 'hover' : ''" url="/pages/radar/radar">
			时间
		</navigator>
		<navigator :class="pagename == 'radar_x' || pagename == 'radar_x_page' ? 'hover' : ''" url="/pages/radar_x/radar_x">
			行为
		</navigator>
		<navigator :class="pagename == 'radar_p' ? 'hover' : ''" url="/pages/radar_p/radar_p">
			人
		</navigator>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				pagename: 'radar'
			}
		},
		mounted(){
			// 获取当前地址
			this.pagename = this.getPage_one()
		},
		methods:{
			// 获取当前router的名称
			getPage_one(){
				let pages = getCurrentPages()
				let nowpage = pages[pages.length - 1]
				let route = nowpage.route
				let newroute = route.split('/')
				let pagename = newroute[newroute.length - 1]
				return pagename
			}
		},
	}
</script>

<style lang="less">
	.radar_menu{
		background: #fff;
		box-shadow: 0 0 20px rgba(0,0,0,0.1);
		display: flex;
		
		navigator{
			flex: 1;
			margin: 30px 20px;
			border: 3px solid rgba(74,119,176,1);
			text-align: center;
			justify-content: center;
			align-items: center;
			font-size: 35px;
			color: #4A77B0;
			border-radius: 1120px;
			padding: 10px 0;
			
			&.hover{
					background: rgba(74,119,176,1);
					color: #fff;
			}
			
		}
	}
</style>
