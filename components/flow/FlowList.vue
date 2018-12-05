<template>
  <div
    v-if="source"
    class="flow-list-container"
  >
    <slot :flow="source.list"/>
    <flow-state
      :auto="auto"
      :loading="source.loading"
      :no-more="source.noMore"
      :nothing="source.nothing"
      :error="source.error"
      :fetch="loadMore"
    >
      <slot
        slot="error"
        name="error"
      />
      <slot
        slot="nothing"
        name="nothing"
      />
      <slot
        slot="no-more"
        name="no-more"
      />
      <slot
        slot="loading"
        name="loading"
      />
    </flow-state>
  </div>
</template>

<script>
import FlowState from './FlowState'

export default {
  name: 'FlowList',
  components: {
    FlowState
  },
  props: {
    id: {
      type: [Number, String],
      default: ''
    },
    func: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String
    },
    sort: {
      required: true,
      type: String
    },
    changing: {
      type: String,
      default: 'id'
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    source() {
      return this.$store.getters['flow2/getFlow'](this.func, this.id, this.sort)
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('flow2/loadMore', {
        type: this.type,
        sort: this.sort,
        func: this.func,
        id: this.id,
        changing: this.changing
      })
    }
  }
}
</script>
