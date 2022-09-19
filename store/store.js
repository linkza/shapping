import Vue from 'vue'
import Vuex from 'vuex'
import modulecart from '@/store/cart.js'
import moduleuser from '@/store/user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_cart':modulecart,
		'm_user':moduleuser
	}
})

export default store