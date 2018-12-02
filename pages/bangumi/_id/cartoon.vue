<template>
  <div id="bangumi-cartoon-flow">
    <flow-list
      :id="info.id"
      func="getBangumiCartoon"
      type="page"
      sort="asc"
    >
      <ul slot-scope="{ flow }">
        <cartoon-flow-item
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
import CartoonFlowItem from '~/components/flow/item/CartoonFlowItem'

export default {
  name: 'BangumiCartoonFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow2/initData', {
      id: params.id,
      func: 'getBangumiCartoon',
      type: 'page',
      sort: 'asc'
    })
  },
  components: {
    CartoonFlowItem
  },
  computed: {
    info() {
      return this.$store.state.bangumi.show
    }
  },
  mounted() {
    if (!this.info.has_cartoon) {
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
