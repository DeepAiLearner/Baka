<template>
  <div id="bangumi-question-flow">
    <flow-list
      func="getBangumiQAQ"
      type="seenIds"
      sort="active"
    >
      <ul slot-scope="{ flow }">
        <question-flow-item
          v-for="item in flow"
          :key="item.id"
          :item="item"
        />
      </ul>
    </flow-list>
  </div>
</template>

<script>
import QuestionFlowItem from '~/components/flow/item/QuestionFlowItem'

export default {
  name: 'BangumiQuestionFlow',
  async asyncData({ store, params }) {
    await store.dispatch('flow2/initData', {
      id: params.id,
      func: 'getBangumiQAQ',
      type: 'seenIds',
      sort: 'active'
    })
  },
  components: {
    QuestionFlowItem
  }
}
</script>
