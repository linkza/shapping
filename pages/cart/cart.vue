<template>
	<view class="cart-container" v-if="cart.length!==0">
		<my-address></my-address>
		<view class="cart-title">
			
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(item,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
					<my-goods :goods="item" :showRadio="true" :showNum="true" @radio-change='radioChangeHandler'
						@num-change='numberChangeHandler'></my-goods>
				</uni-swipe-action-item>
				<view class="bottom">
				</view>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="@/static/cart_empty@2x.png" mode="" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}]
			};
		},
		methods: {
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			},
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById'])
		},
		computed: {
			...mapState('m_cart', ['cart'])
		}
	}
</script>

<style lang="scss">
	.cart-container {
		height: 100vh;
		overflow: auto;
	}
	.cart-container::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
	.bottom{
		height: 50px;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.empty-cart{
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.empty-img{
			width: 90px;
			height: 90px;
		}
		.tip-text{
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
