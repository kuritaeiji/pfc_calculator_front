<template>
  <nuxt-link to="/" class="text-decoration-none">
    <v-app-bar-title class="font-weight-bold greenText--text text-h5">
      {{ appName }}
    </v-app-bar-title>
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
