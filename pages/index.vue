<template>
  <v-container class="align-center">
    <v-card-title class="justify-center">
      {{ $config.appName }}
    </v-card-title>

    <v-card-text class="text-center">
      {{ message }}
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const message = await $axios.$get('/api/v1/users')
    return { message }
  }
}
</script>
