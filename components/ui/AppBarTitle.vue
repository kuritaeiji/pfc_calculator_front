<template>
  <nuxt-link to="/" class="text-decoration-none">
    <v-toolbar-title class="font-weight-bold greenText--text text-h5 text-no-wrap">
      {{ appName }}
    </v-toolbar-title>
  </nuxt-link>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName
    }
  }
}
</script>

<style scoped>
.v-app-bar-title__content{
  text-overflow: clip;
  overflow: visible;
}
</style>
