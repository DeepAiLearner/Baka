<style lang="scss" module>
.load-btn {
  text-align: center;
}
</style>

<template>
  <div :class="$style.loadBtn">
    <slot
      v-if="error"
      name="error"
    >
      error
    </slot>
    <slot
      v-else-if="nothing"
      name="nothing"
    >
      nothing
    </slot>
    <slot
      v-else-if="noMore"
      name="no-more"
    >
      no more
    </slot>
    <slot
      v-else-if="loading"
      name="loading"
    >
      加载中…
    </slot>
    <button
      v-else-if="!auto"
      @click="fetch"
    >
      点击加载更多
    </button>
  </div>
</template>

<script>
import Utils from '~/components/common/ImageLazyLoad/utils'

export default {
  name: 'LoadBtn',
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    noMore: {
      type: Boolean,
      default: false
    },
    nothing: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    fetch: {
      type: Function,
      required: true
    }
  },
  mounted() {
    if (this.auto) {
      this.onScroll()
    }
  },
  methods: {
    onScroll() {
      if (this.error) {
        return
      }
      if (Utils.checkInView(this.$el)) {
        this.fetch()
      }
      const id = Utils.on(
        document,
        ['scroll', 'resize'],
        this.$utils.throttle(() => {
          if (this.noMore || !this.auto) {
            Utils.off(id)
            return
          }
          if (Utils.checkInView(this.$el)) {
            this.fetch()
          }
        }, 200)
      )
    }
  }
}
</script>
