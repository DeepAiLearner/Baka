export const getCartoonRoleInfo = (ctx, { id }) => {
  return ctx.$axios.get(`cartoon_role/${id}/show`)
}

export const getTodayActivity = ctx => {
  return ctx.$axios.get(
    `cartoon_role/list/today?t=${Date.now()}-${Math.random()
      .toString(36)
      .substring(3, 6)}`
  )
}

export const dalaoUsers = ctx => {
  return ctx.$axios.get('cartoon_role/list/dalao')
}

export const newbieUsers = ctx => {
  return ctx.$axios.get('cartoon_role/list/newbie')
}

export const star = (ctx, { id }) => {
  return ctx.$axios.post(`cartoon_role/${id}/star`)
}

export const fans = (ctx, { id, seenIds, minId, sort }) => {
  return ctx.$axios.get(`cartoon_role/${id}/fans`, {
    params: { seenIds, minId, sort }
  })
}

export const create = (ctx, { bangumi_id, name, intro, avatar, alias }) => {
  return ctx.$axios.post('cartoon_role/manager/create', {
    bangumi_id,
    name,
    intro,
    avatar,
    alias
  })
}

export const edit = (ctx, { id, bangumi_id, name, intro, avatar, alias }) => {
  return ctx.$axios.post('cartoon_role/manager/edit', {
    id,
    bangumi_id,
    name,
    intro,
    avatar,
    alias
  })
}
