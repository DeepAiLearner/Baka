import parseToken from '~/assets/js/parseToken'
import UserApi from '~/api/userApi'

export const state = () => ({
  user: {},
  login: false,
  pageData: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.login = true
  },
  SET_PAGE_DATA(state, data) {
    state.pageData = data
  }
}

export const actions = {
  async initAuth({ state, commit }, ctx) {
    if (state.login) {
      return state.user
    }
    const token = parseToken(ctx)
    if (!token) {
      return
    }
    const api = new UserApi(ctx)
    const user = await api.getLoginUser()
    user && commit('SET_USER', user)
    return user
  },
  async initApp({ commit }, ctx) {
    const api = new UserApi(ctx)
    const data = await api.getPageData({
      refer: 'pc'
    })
    console.log(data)
    commit('SET_PAGE_DATA', data)
  }
}
