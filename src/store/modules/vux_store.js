// import Cookies from 'js-cookie'

const vux_store = {
  state: {
    isLoading: false,
    userInfo:{}
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateUserInfo (state, mUserInfo) {
      state.userInfo = mUserInfo
    }
  }
}

export default vux_store
