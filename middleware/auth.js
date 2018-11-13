export default async ctx => {
  await ctx.store.dispatch('initApp', ctx)
}
