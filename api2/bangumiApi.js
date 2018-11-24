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
