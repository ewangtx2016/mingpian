<template>
	<view class="sho_menu">
		<view class="footer_menu">
			<navigator url="/pages/index/index">
				<view class="mp">
					<image v-if="pagename == 'page'" src="/static/images/icon_mp_hover.png" mode="aspectFit"></image>
					<image v-else src="/static/images/icon_mp.png" mode="aspectFit"></image>
				</view>
			</navigator>
					
			<navigator  url="/pages/shop/shop">
				<view class="shop">
					<image v-if="pagename == 'shop'" src="/static/images/icon_shop_hover.png" mode="aspectFit"></image>
					<image v-else src="/static/images/icon_shop.png" mode="aspectFit"></image>
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
				let nowpage = pages[pages.length - 1]
				let route = nowpage.route
				let txt = 'pages/page/'
				let routename = route.substring(txt.length, route.length)
				return routename
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
