<template>
  <bangumi-video-flow
    :videos="videos"
    :info="info"
  />
</template>

<script>
import BangumiVideoFlow from '~/components/bangumi/BangumiVideoFlow'
import { getBangumiVideos } from '~/api2/bangumiApi'

export default {
  name: 'BangumiVideo',
  async asyncData({ params }) {
    const data = await getBangumiVideos({
      id: params.id
    })
    if (data) {
      return {
        videos: data
      }
    }
  },
  components: {
    BangumiVideoFlow
  },
  data() {
    return {
      videos: []
    }
  },
  computed: {
    info() {
      return this.$store.state.bangumi.info
    }
  },
  mounted() {
    if (!this.info.has_video) {
      this.$router.replace({
        name: 'bangumi-post'
      })
    }
  }
}
</script>
