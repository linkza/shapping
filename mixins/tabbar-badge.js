import {
	mapGetters
} from 'vuex'
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		if(this.total) this.setBadge()
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2,
				text: this.total + ''
			})
		},
		removeBadge(){
			uni.removeTabBarBadge({
				index:2
			})
		}
	},
	watch: {
		total: {
			handler(newVal) {
				if(!this.total) {
					this.removeBadge()
					return
				}
				this.setBadge()
			},
			immediate: true
		}
	}
}
