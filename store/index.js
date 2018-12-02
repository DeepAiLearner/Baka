import { getPageData } from '~/api2/carouselApi'
import { getLoginUser } from '~/api2/userApi'
import Cookies from 'js-cookie'

export const state = () => ({
  isAuth: false,
  user: null,
  login: false,
  pageData: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.login = !!user.id
    state.isAuth = true
  },
  SET_PAGE_DATA(state, data) {
    state.pageData = data
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const data = await getPageData(this)
    commit('SET_PAGE_DATA', data)
  },
  async initAuth({ state, commit }) {
    if (state.user) {
      return
    }
    if (!Cookies.get('JWT-TOKEN')) {
      commit('SET_USER', {})
      return
    }
    try {
      const data = await getLoginUser(this)
      commit('SET_USER', data)
    } catch (e) {
      commit('SET_USER', {})
    }
  },
  async getNotification() {
    console.log('getNotification')
  }
}
