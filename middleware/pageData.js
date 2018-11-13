export default async ctx => {
  await ctx.store.dispatch('initAuth', ctx)
}
