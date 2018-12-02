<template>
  <div id="bangumi-video-flow">
    <section v-if="source.total">
      <div v-if="source.has_season">
        <div
          v-for="season in source.videos"
          :key="season.name"
        >
          <h3
            class="celltitle"
            v-text="season.name"
          />
          <ul>
            <video-flow-item
              v-for="video in season.data"
              :key="video.id"
              :item="video"
              :bangumi-id="info.id"
            />
          </ul>
        </div>
      </div>
      <ul v-else>
        <video-flow-item
          v-for="video in source.videos[0].data"
          :key="video.id"
          :item="video"
          :bangumi-id="info.id"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import { getBangumiVideos } from '~/api2/bangumiApi'
import VideoFlowItem from '~/components/flow/item/VideoFlowItem'

export default {
  name: 'BangumiVideo',
  async asyncData({ params, app }) {
    const source = await getBangumiVideos(app, {
      id: params.id
    })
    return { source }
  },
  components: {
    VideoFlowItem
  },
  data() {
    return {
      source: null
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    }
  },
  mounted() {
    if (!this.info.has_video) {
      this.$router.replace({
        name: 'bangumi-id-post',
        params: {
          id: this.info.id
        }
      })
    }
  }
}
</script>
