import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission"
import "./utils/init"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import api from "./api"
import "./utils/eventbus.js"
import dataMethod from './utils/data'
// import  echarts from "echarts"
// Vue.prototype.$echarts = echarts

Vue.prototype.$api = api;
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.use(dataMethod)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
