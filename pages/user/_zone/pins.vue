<template>
  <image-flow-list :user-zone="zone"/>
</template>

<script>
import ImageFlowList from '~/components/flow/list/ImageFlowList'

export default {
  name: 'UserImage',
  async asyncData({ store, params }) {
    await store.dispatch('flow2/initData', {
      func: 'getUserImage',
      type: 'page',
      sort: 'news',
      id: params.zone
    })
  },
  components: {
    ImageFlowList
  },
  computed: {
    zone() {
      return this.$route.params.zone
    }
  }
}
</script>
