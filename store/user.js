export default {
	namespaced: true,
	state: () => ({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
		redirectInfo:null
	}),
	mutations: {
		updateAddress(state,address){
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserinfo(state,userinfo){
			state.userinfo=userinfo
			this.commit('m_user/saveUserinfo')
		},
		saveUserinfo(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveToken')
		},
		saveToken(state){
			uni.setStorageSync('token',JSON.stringify(state.token))
		},
		updateRedirectInfo(state,redirectInfo){
			state.redirectInfo=redirectInfo
		}
	},
	getters: {
		addstr(state){
			if(!state.address.provinceName) {return ''}
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}
