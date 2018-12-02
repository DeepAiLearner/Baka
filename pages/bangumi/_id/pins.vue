<template>
  <div id="bangumi-image-flow">
    <flow-list
      :id="info.id"
      func="getBangumiImage"
      type="seenIds"
      sort="active"
    >
      <image-waterfall-flow
        slot-scope="{ flow }"
        :bangumi-id="info.id"
        :list="flow"
      />
    </flow-list>
  </div>
</template>

<script>
import ImageWaterfallFlow from '~/components/image/ImageWaterfallFlow'

export default {
  name: 'BangumiImageFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow2/initData', {
      id: params.id,
      func: 'getBangumiImage',
      type: 'seenIds',
      sort: 'active'
    })
  },
  components: {
    ImageWaterfallFlow
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    }
  }
}
</script>
