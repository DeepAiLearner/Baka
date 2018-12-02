<template>
  <div id="bangumi-post-flow">
    <flow-list
      :id="info.id"
      func="getBangumiPost"
      type="seenIds"
      sort="active"
    >
      <ul slot-scope="{ flow }">
        <post-flow-item
          v-for="item in flow"
          :key="item.id"
          :bangumi-id="info.id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import PostFlowItem from '~/components/flow/item/PostFlowItem'

export default {
  name: 'BangumiPostFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow2/initData', {
      id: params.id,
      func: 'getBangumiPost',
      type: 'seenIds',
      sort: 'active'
    })
  },
  components: {
    PostFlowItem
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    }
  }
}
</script>
