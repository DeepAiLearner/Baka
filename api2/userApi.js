import http from 'create-http'

export const getRecommendedUsers = () => {
  return http.get('user/recommended')
}
