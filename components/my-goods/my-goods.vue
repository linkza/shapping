<template>
		<view class="goods-item">
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo||defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="goods-price">
						￥{{goods.goods_price |tofixed}}
					</view>
					<uni-number-box :min="1" :value="goods.goods_count" @change="numberChangeHandler" v-if="showNum"></uni-number-box>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name: "my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {

			}
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			numberChangeHandler(val) {
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +val
				})
			}
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0s;

		.goods-item-left {
			margin-right: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 26rpx;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.goods-price {
					color: #c00000;
					font-size: 32rpx;

				}
			}
		}

	}
</style>
