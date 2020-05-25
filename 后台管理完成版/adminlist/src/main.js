// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//全局引入css文件
import '../style/reset.css'

// 全局对象提示框
import Titles from './api/title.js'
Vue.prototype.mytitle = Titles

// 全局对象formdata
import referto from './api/formdata.js'
Vue.prototype.myreferto = referto

//引入vuex文件
import store from './store/store.js'


Vue.prototype.$goEasy = new GoEasy({
    host: "hangzhou.goeasy.io", //应用所在的区域地址: 【hangzhou.goeasy.io | singapore.goeasy.io】
    appkey: "BC-854f6d5d26f347b2a9382b0b8bbe12fc", //替换为您的应用appkey
    onConnected: function() {
        console.log('连接成功！')
    },
    onDisconnected: function() { 
        console.log('连接断开！')
    },
    onConnectFailed: function(error) {
        console.log('连接失败或错误！')
    }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
