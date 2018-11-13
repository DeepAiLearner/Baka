export const state = () => ({
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  search: {
    bangumis: []
  },
  device: 'desktop'
})

export const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      // Cookies.set('sidebarStatus', 1)
    } else {
      // Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  }
}

export const actions = {
  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  }
}

export const getters = {}
