<template>
	<view class="a">
		131321132132132132
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getSwiperList()
		},
		methods: {
			async getSwiperList() {
				const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
	
.a{
	color: aqua;
}
</style>
