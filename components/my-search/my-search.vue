<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	background-color: #c00000;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	.my-search-box{
		width: 100%;
		height: 72rpx;
		background-color: #fff;
		border-radius: 36rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.placeholder{
			font-size: 30rpx;
		}
	}
}
</style>