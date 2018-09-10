import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// import IndexPage from '@/views/IndexPage'
// import Working from '@/views/Working'
const IndexPage = () => import('@/views/IndexPage.vue').then(m => m.default)
const Working = () => import('@/views/Working.vue').then(m => m.default)

Vue.use(Router)

var router =  new Router({
  base:'/mobilefront/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   path: '/',
    //   component: IndexPage,
    //   redirect: '/index',
    //   name: 'aa',
    // },
    {
      path: '/index',
      name: 'index',
      component: IndexPage,

    },
    {
      path: '/working',
      name: 'working',
      component: Working,
    }
  ]
  
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
