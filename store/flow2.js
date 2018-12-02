import { merge } from 'lodash'
import * as API from '~/api2/flow2Api'

const defaultListObj = {
  list: [],
  page: 0,
  total: 0,
  noMore: false,
  nothing: false,
  loading: false,
  error: false,
  init: false
}

const defaultState = {
  id: '', // 请求的 unique_id 的 value 是什么
  type: '', // 请求的类型，如：lastId, page, seenIds
  changing: '', // 在变化的是哪一个，如：seenIds 里面是 slug list 还是 id list
  func: '', // 请求的函数名是什么
  sort: '', // 请求的列表顺序是什么？如：active，news，hot，top_at，comment_at...
  count: 12, // 每次获取的数据个数
  data: {} // defaultListObj 都存到这个里面
}

export const state = () => merge({}, defaultState)

export const actions = {
  // 1. 先检测当前列表是否有数据，如果有数据，清除
  // 2. 如果当前 list 没有初始化，就初始化
  // 3. 修改状态，获取数据
  // 4. 装填数据，修改状态
  async initData(
    { state, commit },
    {
      id = '',
      type, // required
      func, // required
      changing = 'id',
      count = 12,
      sort,
      refresh = true,
      force = false
    }
  ) {
    // 在前端，这个列表已经请求过了，然后切换 tab 再次发请求时，如果 error 了，就不再请求
    const fieldName = `${func}-${sort}`
    if (state.data[fieldName] && state.data[fieldName].error && !force) {
      return
    }
    // 这个列表已经请求过了
    if (state.data[fieldName] && state.data[fieldName].init) {
      if (!refresh) {
        return
      }
      commit('RESET_STATE')
    }
    commit('INIT_STATE', { func, sort })
    commit('SET_LOADING', { func, sort })
    commit('INIT_FETCH_PARAMS', {
      id,
      type,
      func,
      changing,
      count,
      sort
    })
    const params = { count, ctx: this }
    if (type === 'page') {
      params.page = 1
    } else if (type === 'seenIds') {
      params.seen_ids = ''
    } else if (type === 'maxId') {
      params.max_id = ''
    }
    if (id) {
      params.id = id
    }
    if (sort) {
      params.order_by = sort
    }
    try {
      const data = await API[func](params)
      data && commit('SET_DATA', { data, func, sort })
    } catch (e) {
      commit('SET_ERROR', { func, sort })
    }
  },
  // 1.检测数据是否初始化，如果未初始化，报错，如果已初始化，检测参数，不匹配，报错
  // 2.设置 loading，计算请求参数，发请求
  // 3.set store，设置 loading
  async loadMore(
    { state, commit },
    { type, changing = 'id', id = '', func, sort }
  ) {
    if (!type || !func || !sort) {
      console.error('请求参数错误')
      return
    }
    if (
      state.func !== func || // 不同的请求函数
      state.changing !== changing || // 不同的列表
      state.id !== id || // 两个不同用户
      state.type !== type // 不同的请求类型
    ) {
      console.error('错误的列表请求')
      return
    }
    const fieldName = `${func}-${sort}`
    const field = state.data[fieldName]
    if (field.loading || field.noMore) {
      return
    }
    commit('SET_LOADING', { func, sort })
    const params = {
      count: state.count,
      ctx: this
    }
    if (type === 'page') {
      params.page = field.page
    } else if (type === 'lastId') {
      const lastData = field.list[field.list.length - 1]
      let result
      if (!/\./.test(changing)) {
        result = lastData[changing]
      } else {
        result = lastData
        changing.split('.').forEach(key => {
          result = result[key]
        })
      }
      params.max = result
    } else if (type === 'seenIds') {
      params.seen_ids = field.list
        .map(_ => {
          if (!/\./.test(changing)) {
            return _[changing]
          }
          let result = _
          changing.split('.').forEach(key => {
            result = result[key]
          })
          return result
        })
        .toString()
    }
    if (id) {
      params.id = id
    }
    if (sort) {
      params.order_by = sort
    }
    try {
      const data = await API[func](params)
      data && commit('SET_DATA', { data, func, sort })
    } catch (e) {
      commit('SET_ERROR', { func, sort })
    }
  }
}

export const mutations = {
  SET_ERROR(state, { func, sort }) {
    const fieldName = `${func}-${sort}`
    state.data[fieldName].error = true
    state.data[fieldName].loading = false
  },
  // eslint-disable-next-line
  RESET_STATE(state) {
    state = merge({}, defaultState)
  },
  INIT_STATE(state, { func, sort }) {
    const result = Object.assign({}, state.data)
    result[`${func}-${sort}`] = merge({}, defaultListObj)
    state.data = result
  },
  SET_LOADING(state, { func, sort }) {
    state.data[`${func}-${sort}`].loading = true
  },
  INIT_FETCH_PARAMS(state, params) {
    state = merge(state, params)
  },
  SET_DATA(state, { func, sort, data }) {
    const fieldName = `${func}-${sort}`
    if (!state.data[fieldName]) {
      return
    }
    if (state.data[fieldName].init) {
      state.data[fieldName].list = state.data[fieldName].list.concat(data.list)
    } else {
      state.data[fieldName].init = true
      state.data[fieldName].list = data.list
      state.data[fieldName].nothing = data.total === 0
    }
    state.data[fieldName].page++
    state.data[fieldName].noMore = data.noMore
    state.data[fieldName].total = data.total
    state.data[fieldName].loading = false
    state.data[fieldName].error = false
  }
}

export const getters = {
  getFlow: state => (func, sort) => {
    return state.data[`${func}-${sort}`]
  }
}
