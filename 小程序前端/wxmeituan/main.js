import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 引入vuex文件
import store from 'store/store.js'
Vue.prototype.$store = store

//引入loading
import homeload from './element/loading.vue'
Vue.component('home-load',homeload)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
