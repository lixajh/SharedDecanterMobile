const app = {
  state: {
    sidebar: {
      // opened: !+Cookies.get('sidebarStatus')
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {

      state.sidebar.opened = !state.sidebar.opened
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
