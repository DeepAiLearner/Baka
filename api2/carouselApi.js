import http from 'create-http'

export const getCarousel = () => {
  return http.get('cm/loop/list')
}

export const viewCarousel = ({ id }) => {
  return http.get('cm/loop/view', { id })
}

export const clickCarousel = ({ id }) => {
  return http.get('cm/loop/click', { id })
}
