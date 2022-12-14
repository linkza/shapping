import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from '@/store/store.js'

uni.$showMsg=function(title='数据加载失败',duration=1500)
{uni.showToast({title,duration,icon:'none'})}

uni.$http=$http
$http.baseUrl='https://api-ugo-web.itheima.net'
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中'
	})
}
$http.afterRequest=function(options){
	uni.hideLoading()
	if(options.data.meta.status!==200) uni.$showMsg()
}


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif