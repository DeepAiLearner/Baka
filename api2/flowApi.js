export const getFlowList = (
  ctx,
  { sort, type, take, page, minId, seenIds, bangumiId, userZone }
) => {
  return ctx.$axios.get('flow/list', {
    params: {
      sort,
      type,
      take,
      page,
      minId,
      seenIds,
      bangumiId,
      userZone
    }
  })
}

export const getFlowMeta = (ctx, { type }) => {
  return ctx.$axios.get('flow/meta', {
    params: { type }
  })
}
