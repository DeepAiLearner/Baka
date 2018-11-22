import Vue from 'vue'
import Time from '~/assets/js/timeago'
import NotSSR from '~/assets/js/notssr'
import Hr from '~/components/common/Hr'
import Header from '~/components/layouts/Header'
import Dialog from '~/components/common/Dialog'
import Layout from '~/components/layouts/Layout'
import ImageLazyLoad from '~/components/common/ImageLazyLoad'
import VueClipboards from 'vue-clipboards'
import Affix from '~/components/common/Affix'
import Share from '~/components/common/Share'
import AvaDialog from '~/components/common/AvaDialog'
import LoadMoreBtn from '~/components/common/LoadMoreBtn'
import UserCard from '~/components/user/UserCard'
import NoContent from '~/components/NoContent'

Vue.use(VueClipboards)
Vue.use(ImageLazyLoad, {})
Vue.component(NotSSR.name, NotSSR)
Vue.component(Header.name, Header)
Vue.component(Layout.name, Layout)
Vue.component(Time.name, Time)
Vue.component(Hr.name, Hr)
Vue.component(Dialog.name, Dialog)
Vue.component(Affix.name, Affix)
Vue.component(Share.name, Share)
Vue.component(AvaDialog.name, AvaDialog)
Vue.component(LoadMoreBtn.name, LoadMoreBtn)
Vue.component(UserCard.name, UserCard)
Vue.component(NoContent.name, NoContent)
