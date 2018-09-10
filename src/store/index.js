import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import vux_store from './modules/vux_store'
import getters from './getters'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    vux_store,
  },
  getters,
  // plugins: [createPersistedState()]
})

// store.registerModule('vux', { // 名字自己定义
//   state: {
//     isLoading: false
//   },
//   mutations: {
//     updateLoadingStatus (state, payload) {
//       state.isLoading = payload.isLoading
//     }
//   }
// })

export default store
