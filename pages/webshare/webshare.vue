<template>
	<view class="webview">
		<web-view :src="HTTP_DAILI"></web-view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	
	export default {
		data(){
			return {
				
			}
		},
		components:{
			
		},
		onLoad(query){
			
		},
		mounted(){
			
		},
		computed: {
			...mapState([
				'HTTP_DAILI'
			])
		},
		methods:{
			
		}		
	}
</script>

<style lang="less">
	
</style>
