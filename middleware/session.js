import parseCookie from '~/assets/js/parseCookie'

export default ctx => {
  ctx.session = parseCookie(ctx.req)
}
