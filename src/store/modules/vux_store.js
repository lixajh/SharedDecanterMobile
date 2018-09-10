// import Cookies from 'js-cookie'

const vux_store = {
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
}

export default vux_store
