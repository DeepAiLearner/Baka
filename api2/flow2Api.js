const getFlowList = (
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

/**
 * 所有的函数能接受到的有如下参数，根据情况使用
 * ctx
 * id
 * max_id
 * seen_ids
 * page
 * order_by
 * count
 */

/* ---------- world ---------- */

export const getWorldPost = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'post',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldImage = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'image',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldScore = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'score',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getWorldQAQ = ({ ctx, seen_ids, count, max_id, order_by }) => {
  return getFlowList(ctx, {
    type: 'question',
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

/* ---------- bangumi ---------- */

export const getBangumiPost = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'post',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiImage = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'image',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiScore = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'score',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

export const getBangumiQAQ = ({
  ctx,
  id,
  seen_ids,
  count,
  max_id,
  order_by
}) => {
  return getFlowList(ctx, {
    type: 'question',
    bangumiId: id,
    sort: order_by,
    seenIds: seen_ids,
    minId: max_id,
    take: count
  })
}

/* ---------- user ---------- */

export const getUserPost = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'post',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserImage = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'image',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserScore = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'score',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}

export const getUserQAQ = ({ ctx, id, page, count, order_by }) => {
  return getFlowList(ctx, {
    type: 'question',
    userZone: id,
    sort: order_by,
    take: count,
    page
  })
}
