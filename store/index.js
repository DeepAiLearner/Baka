import { getLoginUser } from '~/api2/userApi'
import { getPageData } from '~/api2/carouselApi'
import parseCookie from '~/assets/js/parseCookie'

export const state = () => ({
  user: null,
  login: false,
  pageData: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.login = !!user.id
  },
  SET_PAGE_DATA(state, data) {
    state.pageData = data
  }
}

export const actions = {
  async initAuth({ state, commit }) {
    if (state.login) {
      return
    }
    const session = parseCookie()
    if (!session) {
      commit('SET_USER', {})
      return
    }
    const user = await getLoginUser({ session })
    commit('SET_USER', user || {})
  },
  async nuxtServerInit({ commit }) {
    const data = await getPageData()
    commit('SET_PAGE_DATA', data)
  }
}
