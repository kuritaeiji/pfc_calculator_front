<template>
  <v-app-bar app absolute>
    <v-spacer />
    <v-btn @click="logout">
      ログアウト
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
      if (this.$route.name === 'index') {
        location.reload()
      }
    }
  }
}
</script>
