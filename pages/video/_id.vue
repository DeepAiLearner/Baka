<style lang="scss">
#video-show {
  $meta-height: 30px;
  $meta-margin-bottom: 8px;

  #video-header {
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    min-height: 30px;
    padding-right: 60px;

    .season-title {
      padding-bottom: 10px;
      margin-left: 10px;
    }
  }

  .video-info {
    padding-top: 60px;
    margin-bottom: 20px;

    .v-share {
      height: 40px;
      float: right;
    }

    .video-report {
      margin-right: 15px;
      margin-top: 2px;
    }
  }
}
</style>

<template>
  <div id="video-show">
    <v-header/>
    <div
      id="video-header"
      class="container"
    >
      <nav>
        <h1
          v-if="bangumi && video"
          class="breadcrumb"
        >
          <a
            :href="$alias.index"
            target="_blank"
          >主站</a>
          <a
            :href="$alias.bangumi(bangumi.id)"
            target="_blank"
            v-text="bangumi.name"
          />
          第{{ video.part }}话&nbsp;{{ video.name }}
        </h1>
      </nav>
      <template v-if="season && showAll">
        <div
          v-for="(items, idx) in list"
          :key="idx"
        >
          <h6
            class="season-title"
            v-text="season.name[idx]"
          />
          <v-part
            :list="items.data"
            :alias="$alias.video"
            :is-first="idx === 0"
            :force-all="true"
            :all-data="videos"
            v-model="showAll"
          >
            <template slot-scope="{ item }">
              <span>{{ item.part - items.base }}</span>{{ item.name }}
            </template>
          </v-part>
        </div>
      </template>
      <v-part
        v-else
        :list="videos"
        :all-data="videos"
        :alias="$alias.video"
        v-model="showAll"
      >
        <template slot-scope="{ item }">
          <span>{{ item.part }}</span>{{ item.name }}
        </template>
      </v-part>
    </div>
    <v-layout>
      <!-- 播放器 -->
      <v-video
        :source="computeVideoSrc"
        :other-src="useOtherSiteSource"
        :video="`${bangumi.name} 第 ${video.part} 话 ${video.name}`"
        :poster="$resize(video.poster, { width: 800 })"
        :next="nextPartVideo"
        :is-guest="isGuest"
        :blocked="info.ip_blocked"
        :must-reward="info.must_reward && !video.rewarded"
        :need-min-level="info.need_min_level"
        @playing="handlePlaying"
      />
      <!-- 视频底部 -->
      <div class="video-info">
        <social-panel
          :id="video.id"
          :is-creator="video.is_creator"
          :user-id="video.user_id"
          :liked="video.liked"
          :marked="video.marked"
          :rewarded="video.rewarded"
          :reward-users="video.reward_users"
          :like-users="video.like_users"
          :mark-users="video.mark_users"
          type="video"
          @reward-callback="handleRewardAction"
        />
        <v-share type="panel"/>
        <el-button
          type="warning"
          size="medium"
          class="video-report"
          round
          @click="handleVideoReportClick"
        >资源报错</el-button>
      </div>
      <!-- 评论区 -->
      <comment-main
        :id="id"
        :master-id="video.user_id"
        type="video"
      />
      <!-- 侧边栏 -->
      <template slot="aside">
        <v-bangumi-panel
          :id="bangumi.id"
          :name="bangumi.name"
          :avatar="bangumi.avatar"
          :summary="bangumi.summary"
          :followed="bangumi.followed"
          class="bangumi-panel"
          @follow="handleFollowAction"
        />
      </template>
    </v-layout>
  </div>
</template>

<script>
import vVideo from '~/components/Video'
import vPart from '~/components/lists/Parts'
import CommentMain from '~/components/comments/CommentMain'
import SocialPanel from '~/components/common/SocialPanel'
import { getVideoInfo, markPlaying } from '~/api2/videoApi'

export default {
  name: 'VideoShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  head() {
    let resultPart = this.video.part
    let season = ''
    let title = ''
    if (this.season) {
      this.list.forEach((videos, index) => {
        videos.data.forEach(video => {
          if (video.id === this.video.id) {
            resultPart = video.part - videos.base
            season = this.season.name[index]
          }
        })
      })
    }
    if (season) {
      if (season === this.video.name) {
        title = `${this.bangumi.name} : ${season} - 视频`
      } else {
        title = `${this.bangumi.name} : ${season} : 第${resultPart}话 ${
          this.video.name
        } - 视频`
      }
    } else {
      title = `${this.bangumi.name} : 第${resultPart}话 ${
        this.video.name
      } - 视频`
    }
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.bangumi.summary
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: `${this.bangumi.name}，第${this.video.part}话，${
            this.video.name
          }，在线观看 动画片大全 动漫在线播放 日本动漫 好看的动漫 二次元网站`
        }
      ]
    }
  },
  components: {
    vVideo,
    vPart,
    CommentMain,
    SocialPanel
  },
  async asyncData({ app, params, error }) {
    return getVideoInfo(app, {
      id: params.id
    })
      .then(data => {
        return {
          info: data,
          video: data.info,
          list: data.list.videos,
          bangumi: data.bangumi,
          season: data.season
        }
      })
      .catch(e => error(e))
  },
  async fetch({ store, params, query }) {
    await store.dispatch('comment/getMainComments', {
      id: params.id,
      type: 'video',
      seeReplyId: query['comment-id']
    })
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showAll: false,
      firstPlay: true,
      info: null,
      video: null,
      bangumi: null,
      season: null,
      list: []
    }
  },
  computed: {
    isGuest() {
      return !this.$store.state.login
    },
    videos() {
      if (!this.season) {
        return this.list[0].data
      }
      let result = []
      this.list.forEach(videos => {
        result = result.concat(videos.data)
      })
      return result
    },
    nextPartVideo() {
      let nextId = 0
      this.videos.forEach((video, index) => {
        if (video.id === this.id && index !== this.videos.length - 1) {
          nextId = this.videos[index + 1].id
        }
      })
      return nextId ? this.$alias.video(nextId) : ''
    },
    useOtherSiteSource() {
      return this.video.other_site
    },
    computeVideoSrc() {
      return this.video.src
    }
  },
  methods: {
    handlePlaying() {
      if (this.firstPlay) {
        this.firstPlay = false
        markPlaying(this, { id: this.id })
      }
    },
    handleVideoReportClick() {
      this.$channel.$emit('open-feedback', {
        type: 4,
        desc: `【PC】-《${this.bangumi.name}》视频有错误，视频 id：${
          this.id
        }：错误详情为：{?}`,
        placeholder: '请填写错误详情'
      })
    },
    handleFollowAction(result) {
      this.$store.commit('video/FOLLOW_ALBUM_BANGUMI', { result })
    },
    handleRewardAction() {
      if (this.info.must_reward) {
        window.location.reload()
      }
    }
  }
}
</script>
