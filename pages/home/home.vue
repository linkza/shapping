<template>
	<view class="home-container">
		<view class="search-box">
			<my-search @click="gotosearch"></my-search>
		</view>

		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperlist" :key="index">
				<navigator :url="'/subpkg/good_detail/good_detail?goods_id='+item.goods_id" class="swiper-item">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navlist" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<view class="left-img-box">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width:item.product_list[0].image_width+'rpx'}"></image>
					</view>
					<view class="right-img-box">
						<view class="right-img-item" v-for="(item2,index2) in item.product_list.slice(1)" :key="index2">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperlist: [],
				navlist: [],
				floorList: []
			}
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				this.swiperlist = res.message
				console.log(uni)
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				this.navlist = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				this.floorList = res.message
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			gotosearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-container {
		height: 100vh;
		overflow: auto;
	}
	
	.home-container::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	.swiper-item {
		height: 300rpx;

		image {
			height: 100%;
			width: 100%;
		}
	}

	.nav-list {
		height: 140rpx;
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		margin-left: 12rpx;
		display: flex;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;

			.right-img-item {
				margin-left: 14rpx;
			}
		}
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
