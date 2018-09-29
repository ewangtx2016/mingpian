<template>
	<view class="sho_menu">
		<view class="footer_menu">
			<navigator url="/pages/radar/radar">
				<view class="mp">
					<image v-if="pagename == 'radar' || pagename == 'radar_p' || pagename == 'radar_x' || pagename == 'radar_x_page'" src="/static/images/icon_ld_hover.png" mode="aspectFit"></image>
					<image v-else src="/static/images/icon_ld.png" mode="aspectFit"></image>
				</view>
			</navigator>
			<navigator  url="/pages/message/message">
				<view class="shop">
					<image v-if="pagename == 'message' || pagename == 'messagepage'" src="/static/images/icon_xx_hover.png" mode="aspectFit"></image>
					<image v-else src="/static/images/icon_xx.png" mode="aspectFit"></image>  
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>	
	
	export default {
		data(){
			return {
				pagename: 'page'
			}
		},
		methods: {
			getPage(){
				let pages = getCurrentPages()
				let url = pages[pages.length - 1].route.split('/')
				return url[url.length - 1]
			}
		},
		onLoad:function(){
			this.pagename = this.getPage()
		},
		mounted(event){
			
		}
	}
</script>

<style lang="less">
	.sho_menu{
		height: 120px;
	}
	
	.footer_menu{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		height: 110px;
		width: 100%;
		display: flex;
		background: #fff;
		box-shadow: 0 0 20px rgba(0,0,0,0.2);
		
		navigator{
			flex: 1;
			height: 100%;
			
			> view{
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				padding: 5% 0;
			}
			
			image{
				height: 100%;
				width: 100%;
			}
		}
		
	}
</style>
