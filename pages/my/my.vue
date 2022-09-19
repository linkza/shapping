<template>
	<view class="my-container">
		<my-login v-if="!token||flag"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState} from 'vuex'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token']),
			flag(){
				return this.token==='""'
			}
		}
	}
</script>

<style lang="scss">
page,.my-container{
	height: 100%;
}
</style>
