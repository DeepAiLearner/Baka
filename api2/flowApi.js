import http from 'create-http'

export const getFlowList = ({
  sort,
  type,
  take,
  page,
  minId,
  seenIds,
  bangumiId,
  userZone
}) => {
  return http.get('flow/list', {
    sort,
    type,
    take,
    page,
    minId,
    seenIds,
    bangumiId,
    userZone
  })
}

export const getFlowMeta = ({ type }) => {
  return http.get('flow/meta', { type })
}
