import http from 'create-http'

export const getRecommendedUsers = () => {
  return http.get('user/recommended')
}

export const getLoginUser = ({ session }) => {
  return http.post('door/refresh', { session })
}
