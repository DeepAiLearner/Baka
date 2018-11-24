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
  async nuxtServerInit({ commit }, { req }) {
    const arr = [getPageData()]
    const session = parseCookie(req)
    if (session) {
      arr.push(getLoginUser({ session }))
    }
    const data = await Promise.all(arr)
    commit('SET_PAGE_DATA', data[0])
    commit('SET_USER', session ? data[1] : {})
  }
}
