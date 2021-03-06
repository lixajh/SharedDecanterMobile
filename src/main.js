// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
// import Home from './components/HelloFromVux'
import { WechatPlugin,XButton,ToastPlugin,TransferDom   } from 'vux'
import router from './router'

Vue.use(VueRouter)
Vue.use(WechatPlugin)
Vue.component('x-button', XButton)
Vue.use(ToastPlugin, {position: 'middle',type: 'text',time: '2000'})
Vue.directive('transfer-dom', TransferDom)//https://doc.vux.li/zh-CN/directives/v-transfer-dom.html

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
