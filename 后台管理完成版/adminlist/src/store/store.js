import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 取出商家标识
const opendata = {
	opening : localStorage.getItem("openid")
}

const state = {
	opendata
}

export default new Vuex.Store({
	state,
	mutations:{
		// 取出商家标识
		iddata(state){
			state.opendata = {
				opening:localStorage.getItem("openid")
			}
		},
	}
})
