<style lang="scss" module>
.layout-default {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .main-view {
    flex-grow: 1;
  }
}
</style>

<template>
  <div :class="$style.layoutDefault">
    <router-view :class="$style.mainView"/>
    <v-footer/>
    <v-music/>
    <no-ssr>
      <side-tools/>
    </no-ssr>
  </div>
</template>

<script>
import vFooter from '~/components/layouts/Footer'
import vMusic from '~/components/layouts/Music'
import SideTools from '~/components/layouts/SideTools'

export default {
  name: 'DefaultLayout',
  components: {
    vFooter,
    SideTools,
    vMusic
  }
}
</script>
