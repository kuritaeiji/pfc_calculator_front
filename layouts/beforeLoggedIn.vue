<template>
  <v-app>
    <before-logged-in-app-bar />
    <ui-snackbar />
    <v-main class="main-background-color">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
}
</script>
