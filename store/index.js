import { getPageData } from '~/api2/carouselApi'

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
  async nuxtServerInit({ commit }) {
    const data = await getPageData(this)
    commit('SET_PAGE_DATA', data)
  }
}
