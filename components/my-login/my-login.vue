<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile"> 一键登录</button>
		<view class="tips-text">
			登录后享用更多权益
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-login",

		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserinfo', 'updateToken', 'updateRedirectInfo']),
			getUserProfile() {
				const that = this
				uni.getUserProfile({
					desc: '完善个人资料',
					success(res) {
						that.updateUserinfo(res.userInfo)
						that.getToken(res)
					},
					fail(res) {
						uni.$showMsg('您取消了授权')
					}
				})
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const a = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				// if(loginResult.meta.status!==200) return uni.$showMsg('登录失败')
				// console.log(a)
				uni.$showMsg('登录成功')
				this.updateToken('123')
				this.navigateBack()
			},
			navigateBack() {
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					const that= this
					uni.switchTab({
						url: that.redirectInfo.from,
						complete() {
							that.updateRedirectInfo(null)
						}
					})
				}
			}
		},
		computed: {
			...mapState('m_user', ['redirectInfo'])
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}
	}
</style>
