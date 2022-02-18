<template>
  <v-app-bar app absolute flat color="white">
    <nuxt-link to="/" class="text-decoration-none">
      <v-app-bar-title class="font-weight-bold greenText--text text-h5">
        {{ appName }}
      </v-app-bar-title>
    </nuxt-link>

    <v-spacer />

    <v-btn dark depressed color="light-blue lighten-2" to="/login">
      {{ $t('title.login') }}
    </v-btn>
    <v-btn dark outlined color="light-blue lighten-2" class="ml-3" to="/signup">
      {{ $t('title.signup') }}
    </v-btn>
  </v-app-bar>
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
