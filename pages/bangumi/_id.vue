<style lang="scss">
</style>

<template>
  <section class="bangumi-layout">
    <v-header
      type="mask"
      height="400px"
      banner="https://image.calibur.tv/FlYFzNsrfQNRofSRpZMrZZuNvncK"
    />
    <v-layout>
      tab-container
      <nuxt-child/>
      <template slot="aside">
        bangumi-layout
      </template>
    </v-layout>
  </section>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
