<template>
	<view class="my-sellet-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isfullCheck" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amount">{{checkedGoodsAmount}}</text>
		</view>
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3
			};
		},
		methods: {
			...mapMutations('m_user', ['updateRedirectInfo']),
			changeAllState() {
				this.updateAllGoodsState(!this.isfullCheck)
			},
			settlement() {
				if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品")
				if (!this.addstr) return uni.$showMsg("请选择地址")
				if (!this.token || this.token === '""') return this.delayNavigate()
				uni.requestPayment({
					provider: "wxpay",
					orderInfo: {
						appid: "wx8888888888888888",
						noncestr: "5K8264ILTKCH16CQ25025I8ZNMTM6package:",
						package: "sign = lXPay",
						partnerid: "1908008109",
						prepayid: "wX1217752501201407033233368018",
						sign: "C380BEC2BFD727A4B6845133519F3AD6",
						timestamp: "1412000000"
					},
					success: function(res) {
						console.log('success'+ JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail' + JSON.stringify(err))
					}
				})
			},
			delayNavigate() {
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						this.seconds = 3
						const that = this
						uni.switchTab({
							url: '/pages/my/my',
							success() {
								that.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后自动跳转到登录页',
					mask: true,
					duration: 1500
				})
			},
			...mapMutations('m_cart', ['updateAllGoodsState'])

		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			isfullCheck() {
				return this.checkedCount === this.total
			}
		}
	}
</script>

<style lang="scss">
	.my-sellet-container {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				font-weight: bold;
				color: #c00000;
			}
		}

		.btn-settle {
			background-color: #c00000;
			height: 50px;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
			min-width: 100px;
		}
	}
</style>
