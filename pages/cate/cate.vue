<template>
	<view>
		<my-search @click="gotosearch"></my-search>
		<view class="scroll-view-container">
			<scroll-view scroll-y="true" class="left-scroll-view" :style="{height:wh+'px'}">
				<view :class="['left-scroll-view-item',index===active?'active':'']" 
				v-for="(item,index) in catelist" 
				:key="index"
				@click="activeChanged(index)"
				>{{item.cat_name}}</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-scroll-view"  :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in catelevel2" :key="index2">
					<view class="cate-lv2-title">{{item2.cat_name}}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3.cat_id)">
							<image :src="item3.cat_icon.replace('dev','web')" mode=""></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
					</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				catelist:[],
				catelevel2:[],
				active:0,
				wh:0,
				scrollTop:0
			}
		},
		onLoad() {
			const info=uni.getWindowInfo()
			this.wh=info.windowHeight-50
			this.getCateList()
		},
		methods: {
			async getCateList(){
				const {data:res}=await uni.$http.get('/api/public/v1/categories')
				this.catelist=res.message
				this.catelevel2=res.message[0].children
			},
			activeChanged(i){
				this.active=i
				this.catelevel2=this.catelist[i].children
				this.scrollTop=!this.scrollTop
			},
			gotoGoodsList(id){
				uni.navigateTo({
					url:'/subpkg/good_list/good_list?cid='+id
				})
			},
			gotosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 240rpx;
		.left-scroll-view-item{
			position: relative;
			background-color: #f7f7f7;
			line-height: 120rpx;
			text-align: center;
			font-size: 24rpx;
			&.active{
				background-color: #ffffff;
				&::before{
					content: '';
					display: block;
					width: 6rpx;
					height: 60rpx;
					background-color: #c00000;
					position: absolute;
					top:25%;
					left: 0;
				}
			}
		}

	}
	.right-scroll-view{
		width: 510rpx;
		.cate-lv2-title{
			font:{
				size:24rpx;
				weight:bold;
			}
			text-align:center;
			padding:30rpx 0 ;
		}
		.cate-lv3-list{
			display: flex;
			flex-wrap: wrap;
			.cate-lv3-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 33.3%;
				image{
					width: 120rpx;
					height: 120rpx;
				}
				text{
					font-size: 24rpx;
				}
			}
		}
	}

}
</style>
