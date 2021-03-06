<style lang="scss">
#score-show {
  .score-header {
    .control-btn {
      float: right;
      margin-top: 3px;
      margin-right: 15px;
    }

    .total {
      float: right;
      font-weight: bold;
      font-size: 30px;
      letter-spacing: 1px;
      color: #ff9900;
      margin-right: 10px;
    }

    .title {
      overflow: hidden;
    }

    .sub-title {
      margin-top: 0;
    }

    .user {
      margin-bottom: 20px;
      line-height: 30px;

      .avatar {
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
    }

    .star-row {
      margin-bottom: 20px;
      @extend %clearfix;

      .star-item {
        float: left;
        margin-right: 58px;
        margin-bottom: 10px;

        &:nth-child(5n) {
          margin-right: 0;
        }

        .label {
          font-size: 13px;
          margin-bottom: 3px;
          color: $color-text-normal;
        }
      }
    }
  }

  .score-body {
    margin-bottom: 30px;
    font-size: 16px;
    color: #222;
    line-height: 30px;
    @extend %breakWord;
  }
}
</style>

<template>
  <div id="score-show">
    <v-header/>
    <v-layout v-if="info">
      <div class="score-header">
        <div>
          <div class="total">{{ info.total }}分</div>
          <template v-if="isMine">
            <el-button
              round
              plain
              type="danger"
              class="control-btn"
              size="mini"
              @click="deleteScore"
            >删除</el-button>
            <a :href="$alias.editScore(info.id)">
              <el-button
                round
                plain
                type="primary"
                class="control-btn"
                size="mini"
              >编辑</el-button>
            </a>
          </template>
          <div class="title">
            <h1
              class="sub-title"
              v-text="info.title"
            />
            <div class="user">
              作者：
              <user-card
                :id="user.id"
                :zone="user.zone"
              >
                <v-img
                  :src="user.avatar"
                  :avatar="true"
                  size="30"
                  class="avatar"
                />
                <span
                  class="name"
                  v-text="user.nickname"
                />
              </user-card>
              &nbsp;·&nbsp;
              发表于：
              <el-tooltip
                :content="info.published_at"
                placement="top"
                effect="dark"
              >
                <v-time v-model="info.published_at"/>
              </el-tooltip>
              <template v-if="info.like_count">
                &nbsp;·&nbsp;
                赞：{{ info.like_count }}
              </template>
              <template v-if="info.comment_count">
                &nbsp;·&nbsp;
                评论：{{ info.comment_count }}
              </template>
              &nbsp;·&nbsp;
              <report-dialog
                :id="info.id"
                type="score"
              >
                举报
              </report-dialog>
            </div>
          </div>
        </div>
        <div class="star-row">
          <div
            v-for="(item, index) in columns"
            :key="index"
            class="star-item"
          >
            <div
              class="label"
              v-text="labelMap[item]"
            />
            <el-tooltip
              :content="`${info[item] * 2}分`"
              placement="top"
              effect="dark"
            >
              <el-rate
                v-model="info[item]"
                disabled
                allow-half
              />
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="score-body">
        <json-content :content="info.content"/>
      </div>
      <social-panel
        :id="info.id"
        :is-creator="info.is_creator"
        :user-id="user.id"
        :liked="info.liked"
        :marked="info.marked"
        :rewarded="info.rewarded"
        :reward-users="info.reward_users"
        :mark-users="info.mark_users"
        :like-users="info.like_users"
        type="score"
      />
      <comment-main
        :id="info.id"
        :master-id="user.id"
        type="score"
      />
      <template slot="aside">
        <v-bangumi-panel
          :id="bangumi.id"
          :avatar="bangumi.avatar"
          :name="bangumi.name"
          :followed="bangumi.followed"
          :summary="bangumi.summary"
          @follow="handleBangumiFollow"
        />
      </template>
    </v-layout>
  </div>
</template>

<script>
import ScoreApi from '~/api/scoreApi'
import CommentMain from '~/components/comments/CommentMain'
import JsonContent from '~/components/jsonEditor/JsonContent'
import SocialPanel from '~/components/common/SocialPanel'
import { getScoreInfo } from '~/api2/scoreApi'

const labelMap = {
  lol: '笑点',
  cry: '泪点',
  fight: '燃点',
  moe: '萌点',
  sound: '音乐',
  vision: '画面',
  story: '情节',
  role: '人设',
  express: '内涵',
  style: '美感'
}
const columns = Object.keys(labelMap)

export default {
  name: 'ScoreShow',
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  asyncData({ app, params, error }) {
    return getScoreInfo(app, { id: params.id })
      .then(data => {
        const info = {}
        Object.keys(data).forEach(key => {
          const value = data[key]
          info[key] = columns.indexOf(key) !== -1 ? +value : value
        })
        return {
          user: data.user,
          bangumi: data.bangumi,
          info
        }
      })
      .catch(e => error(e))
  },
  async fetch({ store, query, params }) {
    await store.dispatch('comment/getMainComments', {
      id: params.id,
      type: 'score',
      seeReplyId: query['comment-id']
    })
  },
  components: {
    CommentMain,
    JsonContent,
    SocialPanel
  },
  head() {
    return {
      title: `${this.info.title} - 漫评`,
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: `calibur,漫评,天下漫友是一家,${this.info.title},${
            this.bangumi.name
          }`
        }
      ]
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      info: null,
      bangumi: null,
      user: null,
      labelMap,
      columns,
      loadingToggleLike: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.state.login ? this.$store.state.user.id : 0
    },
    isMine() {
      return this.currentUserId === this.user.id
    }
  },
  methods: {
    handleBangumiFollow(result) {
      this.$store.commit('score/FOLLOW_BANGUMI', () => {
        this.bangumi.followed = result
      })
    },
    deleteScore() {
      this.$confirm('删除后无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const api = new ScoreApi(this)
          try {
            await api.delete({
              id: this.info.id
            })
            this.$toast.success('操作成功')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } catch (e) {
            this.$toast.error(e)
          }
        })
        .catch(() => {})
    }
  }
}
</script>
