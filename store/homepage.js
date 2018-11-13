import Api from '~/api/imageApi'

export const state = () => ({
  banners: []
})

export const mutations = {
  pushBanners(state, data) {
    state.banners = data
  }
}

export const actions = {
  async getBanners({ state, commit }, ctx) {
    if (state.banners.length) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getBanners()
    commit('pushBanners', data)
  }
}

export const getters = {}
