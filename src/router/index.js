import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloFromVux from '@/components/HelloFromVux'


Vue.use(Router)

export default new Router({
  base:'/mobilefront/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      // base:'/mobilefront/'
    },
    {
      path: '/afterAuth',
      name: 'afterAuth',
      component: HelloFromVux,
    }
  ]
  
})
