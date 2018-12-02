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
