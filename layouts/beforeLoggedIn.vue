<template>
  <v-app>
    <before-logged-in-app-bar />
    <v-main class="main-background-color">
      <ui-snackbar />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>
