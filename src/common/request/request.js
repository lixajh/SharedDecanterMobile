import Vue from 'vue'
import store from '@/store'
import { AjaxPlugin} from 'vux'


Vue.use(AjaxPlugin)
// 创建axios实例
const service = Vue.http.create({
    baseURL: 'http://peake.mynatapp.cc/server/mobile',
    timeout:60000,
    headers: {
        'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        'user_type':'member',
    }
  })

// request拦截器
service.interceptors.request.use(request => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }

  return request
}, error => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * resultCode为FAIL是抛错
  */
    const res = response.data
    

     if (res.code == 401) {
      // store.commit('SET_LOGIN_STATUS', -1)
      // store.dispatch('FedLogOut').then(() => {
      //   location.reload()// 为了重新实例化vue-router对象 避免bug
      // })
      //   return Promise.resolve()
      alert("您已登录超时，请重新扫码或打开链接");
      }

 
      if (res.code == 401) { 
        // store.commit('SET_LOGIN_STATUS', -1)
        //     store.dispatch('FedLogOut').then(() => {
        //       location.reload()// 为了重新实例化vue-router对象 避免bug
        //     })
        // return Promise.reslove()
        
      }

      if (res.code == 400) { 
        // 显示文字
        Vue.$vux.toast.show({
          text: res.message,
          // time : '12s',
        })
        // Message({
        //   message: res.message,
        //   type: 'error',
        //   duration: 2 * 1000
        // })
        return Promise.reject('error')
        
      }
      if (res.code == 404) { 
       
        Vue.$vux.toast.text(res.message, 'top')
        return Promise.reject('error')
        
      }

      return Promise.resolve(response)
    
  },
  error => {
    console.log('err' + error.code)// for debug
    Vue.$vux.toast.text(res.message, 'top')
    return Promise.reject(error)
  }
)
// service.defaults.withCredentials = false
export default service
