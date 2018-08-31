import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/views/IndexPage'
import HelloFromVux from '@/views/HelloFromVux'


Vue.use(Router)

export default new Router({
  base:'/mobilefront/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: IndexPage,
      redirect: '/index',
      name: 'aa',
    },
    {
      path: '/index',
      name: 'index',
      component: IndexPage,
      // base:'/mobilefront/'
    },
    {
      path: '/afterAuth',
      name: 'afterAuth',
      component: HelloFromVux,
    }
  ]
  
})
