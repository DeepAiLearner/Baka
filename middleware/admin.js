export default async ctx => {
  const user = await ctx.store.dispatch('initAuth', ctx)
  if (!user) {
    return ctx.error({
      statusCode: 401,
      message: '继续操作前请先登录'
    })
  }
  if (!user.is_admin) {
    return ctx.error({
      statusCode: 403,
      message: '没有权限访问该页面'
    })
  }
}
