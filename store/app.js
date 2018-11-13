import Api from '~/api/appApi'

export const state = () => ({
  download: {}
})

export const mutations = {
  SET_DOWNLOAD_URL(state, { data, os }) {
    state.download[os] = data
  }
}

export const actions = {
  async getDownloadUrl({ commit }, { type, os }) {
    const api = new Api()
    const data = await api.downloadUrl({
      type
    })
    commit('SET_DOWNLOAD_URL', { data, os })
  }
}
