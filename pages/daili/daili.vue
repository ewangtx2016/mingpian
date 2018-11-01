<template>
	<view class="daili">
		<view class="share">
			<view class="txt">
				<view class="p">
					{{HTTP_DAILI}}
				</view>
				<view class="p">
					(分享链接给需要开通代理的好友）
				</view>
			</view>
			<button class="fx ubtn" open-type='share'>分享名片</button>
		</view>
		
		<view class="from">
			<view class="p1">
				<view class="span">*</view>
				<view class="txt" >
					OpenID
				</view>
				<view class="input">
					<input type="text" v-model="formsg.openid" value="" />
				</view>
			</view>
			
			<view class="p1">
				<view class="span">*</view>
				<view class="txt">
					姓名
				</view>
				<view class="input">
					<input type="text"  v-model="formsg.name" value="" />
				</view>
			</view>
			
			<view class="p1">
				<view class="span">*</view>
				<view class="txt">
					绑定微信手机号
				</view>
				<view class="input">
					<input type="text"  v-model="formsg.bindtel" value="" />
				</view>
			</view>
			
			<view class="p2">
				<text>
					此号将作开通的代理名片身份和统计分销佣金的账号，绑定后不可修改请准确填写
				</text>
			</view>
			
			<view class="p1">
				<view class="span">*</view>
				<view class="txt">
					名片展示手机号
				</view>
				<view class="input">
					<input type="text"  v-model="formsg.showtel" value="" />
				</view>
			</view>
			
			
			<view class="button">
				<button class="ubtn" @tap="submit">保 存</button>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	
	export default {
		data(){
			return {
				formsg: {
					openid: '',
					name: '',
					bindtel: '',
					showtel:''
				}
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
				'HTTP_DAILI',
			])
		},
		methods:{
			//表单验证
			submit(){
				var telregx = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				
				if(!this.formsg.openid || !this.formsg.name || !this.formsg.bindtel || !this.formsg.showtel){
					uni.showToast({
						title: '内容不能为空',
						icon: 'none'
					})
					return
				}else if(!telregx.test(this.formsg.bindtel)){
					uni.showToast({
						title: '绑定微信手机号格式错误',
						icon: 'none'
					})
					return
				}else if(!telregx.test(this.formsg.showtel)){
					uni.showToast({
						title: '名片展示手机号格式错误',
						icon: 'none'
					})
					return
				}
				
				// 提交表单
				this.toAjax()
				
			},
			// 表单提交
			toAjax(){
				console.log('请求ajax--------------------------')
			}
		},
		// 转发功能
		onShareAppMessage: function (res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
			}
			
			// 转发自定义内容
			return {
				title: `成为代理-获取OPENID`,
				path: `/pages/webshare/webshare`, 
				imageUrl: ``
			}
			
		}
	}
</script>

<style lang="less">

	
	.daili{
		
		padding: 20px;
		
		
		.share{
			display:flex;	
					
			
			.txt{
				flex: 1;
				font-size: 20px;
				overflow: hidden;
				
				.p{
					width: 100%;
					height: 30px;
					line-height: 30px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 30px;
					margin: 10px 0;
				}
			}
			
			.fx{
				width: 200px;
				margin-left: 30px;
				height: 70px;
				line-height: 70px;
				margin-top: 20px;
				border-radius: 5px;
			}
		}
		
		
		
		
		.from{
			margin: 50px 0;
			
			.p2{
				font-size: 20px;
				color: #939393;
				margin-bottom: 50px;
			}
			
			.button{
				margin-top: 100px;
			}
			
			.p1{
				display: flex;
				overflow: hidden;
				margin: 30px 0;
				
				.span{
					width: 20px;
					height: 80px;
					line-height: 80px;
					color: rgba(255,32,32,1);
					font-size: 40px;
				}
				
				.txt{
					width: 250px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 30px;
					height: 80px;
					line-height: 80px;
				}
				
				.input{
					flex: 1;
					
					input{
						height: 80px;
						line-height: 80px;
						border: 2px solid rgba(74,119,176,1);
						border-radius: 10px;
						font-size: 30px;
						padding: 0 20px;
					}
				}
			}
		}
		
		
	}
	
	
	.ubtn{
		background: rgba(74,119,176,1);
		color: #fff;
		font-size: 30px;
		border-radius: 20px;
		height: 86px;
		line-height: 86px;
		border-radius:10px; 
		
		&:after{
			border: none;
		}
	}
</style>
