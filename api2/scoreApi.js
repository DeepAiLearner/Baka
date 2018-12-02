export const getScoreInfo = (ctx, { id }) => {
  return ctx.$axios.get(`score/${id}/show`)
}

export const getScoreEditData = (ctx, { id }) => {
  return ctx.$axios.get(`score/${id}/edit`)
}

export const checkHasReviewed = (ctx, { id }) => {
  return ctx.$axios.get('score/check', {
    params: { id }
  })
}

export const createScore = (ctx, params) => {
  return ctx.$axios.post('score/create', params)
}

export const getScoreDrafts = ctx => {
  return ctx.$axios.get('score/drafts')
}

export const updateScore = (ctx, params) => {
  return ctx.$axios.post('score/update', params)
}

export const deleteScore = (ctx, { id }) => {
  return ctx.$axios.post('score/delete', { id })
}

export const bangumiScore = (ctx, { id }) => {
  return ctx.$axios.get('score/bangumis', {
    params: { id }
  })
}
