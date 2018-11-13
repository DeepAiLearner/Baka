import BaseApi from './_baseApi'

export default class extends BaseApi {
  getPageData({ refer }) {
    return this.http.get('door/data', {
      params: { refer }
    })
  }

  getLoginUser() {
    return this.http.post('door/refresh')
  }

  sendMessage({ phone_number, type, geetest }) {
    return this.http.post('door/message', {
      phone_number,
      type,
      geetest
    })
  }

  login({ access, secret, remember, geetest }) {
    return this.http.post('door/login', {
      access,
      secret,
      remember,
      geetest
    })
  }

  register({ access, secret, nickname, authCode, inviteCode }) {
    return this.http.post('door/register', {
      access,
      secret,
      nickname,
      authCode,
      inviteCode
    })
  }

  logout() {
    return this.http.post('door/logout')
  }

  getUserInfo({ zone }) {
    return this.http.get(`user/${zone}/show`)
  }

  settingProfile(params) {
    return this.http.post('user/setting/profile', params)
  }

  followBangumis(zone) {
    return this.http.get(`user/${zone}/followed/bangumi`)
  }

  replyPosts({ zone, take, page }) {
    return this.http.get(`user/${zone}/posts/reply`, {
      params: { take, page }
    })
  }

  settingImage({ type, url }) {
    return this.http.post('user/setting/image', { type, url })
  }

  feedback({ type, desc, ua }) {
    return this.http.post('user/feedback', { type, desc, ua })
  }

  daySign() {
    return this.http.post('user/daySign')
  }

  getNotificationCount() {
    return this.http.get('user/notification/count')
  }

  getNotifications({ minId }) {
    return this.http.get('user/notification/list', {
      params: { minId }
    })
  }

  readMessage(id) {
    return this.http.post('user/notification/read', { id })
  }

  readAllMessage() {
    return this.http.post('user/notification/clear')
  }

  resetPassword({ method, access, authCode, secret }) {
    return this.http.post('door/reset', {
      method,
      access,
      authCode,
      secret
    })
  }

  report({ id, type, model, message }) {
    return this.http.post('report/send', {
      id,
      type,
      model,
      message
    })
  }

  recommended() {
    return this.http.get('user/recommended')
  }

  getUserCard({ id }) {
    return this.http.get('user/card', {
      params: { id }
    })
  }
}
