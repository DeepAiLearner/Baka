import http from 'create-http'

export const getRecommendedBangumis = () => {
  return http.get('bangumi/recommended')
}

export const getReleasedBangumis = () => {
  return http.get('bangumi/released')
}

export const getAllBangumiTag = () => {
  return http.get('bangumi/tags')
}

export const getCategoryBangumis = ({ tags, page, take }) => {
  return http.get('bangumi/category', { id: tags, page, take })
}

export const getBangumiVideos = ({ id }) => {
  return http.get(`bangumi/${id}/videos`)
}

export const getBangumiScore = ({ id }) => {
  return http.get('score/bangumis', { id })
}
