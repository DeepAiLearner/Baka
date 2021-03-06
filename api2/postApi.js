export const getPostInfo = (ctx, { id, only }) => {
  return ctx.$axios.get(`post/${id}/show`, {
    params: { only }
  })
}

export const createPost = (
  ctx,
  { title, bangumiId, content, images, desc, geetest, is_creator }
) => {
  return ctx.$axios.post('post/create', {
    title,
    bangumiId,
    content,
    images,
    desc,
    geetest,
    is_creator
  })
}

export const deletePost = (ctx, { id }) => {
  return ctx.$axios.post(`post/${id}/deletePost`)
}

export const setTop = (ctx, { id }) => {
  return ctx.$axios.post('post/manager/top/set', { id })
}

export const removeTop = (ctx, { id }) => {
  return ctx.$axios.post('post/manager/top/remove', { id })
}

export const setNice = (ctx, { id }) => {
  return ctx.$axios.post('post/manager/nice/set', { id })
}

export const removeNice = (ctx, { id }) => {
  return ctx.$axios.post('post/manager/nice/remove', { id })
}
