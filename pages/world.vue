<style lang="scss">
</style>

<template>
  <section class="world-layout">
    <v-header type="pure"/>
    <v-layout :left="false">
      <template slot="aside">
        <ul>
          <nuxt-link to="/world/post">帖子</nuxt-link>
          <nuxt-link to="/world/pins">相册</nuxt-link>
          <nuxt-link to="/world/review">漫评</nuxt-link>
          <nuxt-link to="/world/qaq">问答</nuxt-link>
        </ul>
      </template>
      world layout
      <nuxt-child/>
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
