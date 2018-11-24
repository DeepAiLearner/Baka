import http from 'create-http'

export const getTodayActivity = () => {
  return http.get(
    `cartoon_role/list/today?t=${Date.now()}-${Math.random()
      .toString(36)
      .substring(3, 6)}`
  )
}

export const dalaoUsers = () => {
  return http.get('cartoon_role/list/dalao')
}

export const newbieUsers = () => {
  return http.get('cartoon_role/list/newbie')
}
