export const getRecommendedUsers = ctx => {
  return ctx.$axios.get('user/recommended')
}

export const getLoginUser = ctx => {
  return ctx.$axios.post('door/refresh')
}
