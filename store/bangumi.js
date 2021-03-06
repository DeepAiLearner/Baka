import Api from '~/api/bangumiApi'
import ScoreApi from '~/api/scoreApi'
import { getAllBangumi, getBangumiInfo } from '~/api2/bangumiApi'

export const state = () => ({
  show: null,
  follows: null,
  category: {
    data: [],
    noMore: false,
    page: 0,
    take: 10
  },
  tags: [],
  info: null,
  videos: {
    id: 0,
    list: [],
    total: 0,
    has_season: false,
    fetched: false
  },
  cartoon: {
    id: 0,
    page: 0,
    take: 12,
    sort: 'desc',
    total: 0,
    list: [],
    noMore: false
  },
  topPosts: [],
  topFetchedId: 0,
  score: null,
  scoreFetchId: 0,
  hots: [],
  all: []
})

export const mutations = {
  SET_ALL_BANGUMI(state, data) {
    state.all = data
  },
  FETCH_SOCIAL_USERS(state, { type, result }) {
    const prefix = state.info[`${type}_users`]
    state.info[`${type}_users`].list = prefix.list.concat(result.list)
    state.info[`${type}_users`].total = result.total
    state.info[`${type}_users`].noMore = result.noMore
  },
  SET_ROLES(state, { data, bangumiId }) {
    state.roles.data = state.roles.data.concat(data)
    state.roles.noMore = true
    state.roles.id = bangumiId
  },
  selectTag(state, index) {
    const tag = state.tags[index]
    tag.selected = !tag.selected
    state.tags[index] = tag
  },
  SET_FOLLOW(state, { result }) {
    state.info.followed = result
    result ? state.info.follow_users.total++ : state.info.follow_users.total--
  },
  SET_TAGS(state, { tags, id }) {
    const ids = id ? id.split('-') : undefined
    tags.forEach((tag, index) => {
      tags[index].selected = ids ? ids.indexOf(tag.id.toString()) !== -1 : false
    })
    state.tags = tags
  },
  SET_CATEGORY(state, data) {
    state.category.data = state.category.data.concat(data.list)
    state.category.noMore = data.list.length < state.category.take
    state.category.page++
  },
  SET_TOP_POST(state, { data, id }) {
    state.topPosts = data
    state.topFetchedId = id
  },
  SET_BANGUMI_DATA(state, data) {
    state.show = data
  },
  SET_VIDEOS(state, { data, id }) {
    state.videos = {
      id,
      list: data.videos,
      total: data.total,
      has_season: data.has_season,
      fetched: true
    }
  },
  SET_BANGUMI_INFO(state, { key, value }) {
    state.info[key] = value
  },
  SET_BANGUMI_CARTOON(state, { data, bangumiId }) {
    state.cartoon.id = bangumiId
    state.cartoon.list = state.cartoon.list.concat(data.list)
    state.cartoon.noMore = data.noMore
    state.cartoon.total = data.total
    state.cartoon.page = state.cartoon.page + 1
  },
  REVERSE_CARTOON(state, { sort }) {
    state.cartoon.list = state.cartoon.list.reverse()
    state.cartoon.sort = sort
  },
  RESET_CARTOON(state, { sort }) {
    state.cartoon = {
      id: 0,
      page: 0,
      take: 12,
      sort,
      total: 0,
      list: [],
      noMore: false
    }
  },
  SET_BANGUMI_SCORE(state, { id, data }) {
    state.score = data
    state.scoreFetchId = id
  }
}

export const actions = {
  async getAllBangumi({ state, commit }) {
    let needLoad = true
    try {
      const lastLoadAt = sessionStorage.getItem('all-bangumi-load-at')
      if (lastLoadAt && Date.now() - lastLoadAt < 3600000) {
        const list = JSON.parse(sessionStorage.getItem('all-bangumi-list'))
        list && commit('SET_ALL_BANGUMI', list)
        needLoad = !(list && list.length)
      }
    } catch (e) {}
    if (state.all.length || !needLoad) {
      return
    }
    const data = await getAllBangumi(this)
    commit('SET_ALL_BANGUMI', data)
    try {
      sessionStorage.setItem('all-bangumi-load-at', Date.now())
      sessionStorage.setItem('all-bangumi-list', JSON.stringify(data))
    } catch (e) {}
  },
  async getTags({ state, commit }, { id, ctx }) {
    if (state.tags.length) {
      return
    }
    const api = new Api(ctx)
    const tags = await api.tags()
    commit('SET_TAGS', { tags, id })
  },
  async getBangumiInfo({ commit }, { id }) {
    const data = await getBangumiInfo(this, { id })
    data && commit('SET_BANGUMI_DATA', data)
  },
  async getVideos({ state, commit }, { id, ctx }) {
    if (state.videos.id && state.videos.id === id) {
      return
    }
    const api = new Api(ctx)
    const data = await api.videos(id)
    commit('SET_VIDEOS', { data, id })
  },
  async follow({ commit, rootState }, { ctx, id }) {
    const api = new Api(ctx)
    const followed = await api.follow(id)
    commit('SET_FOLLOW', {
      followed,
      self: {
        id: rootState.user.id,
        zone: rootState.user.zone,
        avatar: rootState.user.avatar,
        nickname: rootState.user.nickname
      }
    })
    return followed
  },
  async getCategory({ state, commit }, { id, ctx }) {
    const api = new Api(ctx)
    const data = await api.category({
      id,
      page: state.category.page,
      take: state.category.take
    })
    commit('SET_CATEGORY', data)
  },
  async getCartoons({ state, commit }, { ctx, bangumiId, init = false }) {
    if (init && state.cartoon.id === bangumiId) {
      return
    }
    const api = new Api(ctx)
    const data = await api.cartoon({
      bangumiId,
      page: state.cartoon.page,
      take: state.cartoon.take,
      sort: state.cartoon.sort
    })
    data && commit('SET_BANGUMI_CARTOON', { data, bangumiId })
  },
  async changeCartoonSort({ state, commit }, { ctx, bangumiId, sort }) {
    if (state.cartoon.noMore) {
      commit('REVERSE_CARTOON', { sort })
      return
    }
    commit('RESET_CARTOON', { sort })
    const api = new Api(ctx)
    const data = await api.cartoon({
      take: state.cartoon.take,
      page: 0,
      bangumiId,
      sort
    })
    data && commit('SET_BANGUMI_CARTOON', { data, bangumiId })
  },
  async getTopPosts({ state, commit }, { ctx, id }) {
    if (state.topFetchedId === id) {
      return
    }
    const api = new Api(ctx)
    const data = await api.getTopPosts({ id })
    commit('SET_TOP_POST', { data, id })
  },
  async getBangumiScore({ state, commit }, { ctx, id }) {
    if (state.score && state.scoreFetchId === id) {
      return
    }
    const api = new ScoreApi(ctx)
    const data = await api.bangumiScore(id)
    commit('SET_BANGUMI_SCORE', { data, id })
  }
}

export const getters = {}
