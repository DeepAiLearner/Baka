import Vue from 'vue'
import Time from '~/assets/js/timeago'
import Hr from '~/components/common/Hr'
import Header from '~/components/layouts/Header'
import Dialog from '~/components/common/Dialog'
import Layout from '~/components/layouts/Layout'
import ImageLazyLoad from '~/components/common/ImageLazyLoad'
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)
Vue.use(ImageLazyLoad, {})
Vue.component(Header.name, Header)
Vue.component(Layout.name, Layout)
Vue.component(Time.name, Time)
Vue.component(Hr.name, Hr)
Vue.component(Dialog.name, Dialog)
