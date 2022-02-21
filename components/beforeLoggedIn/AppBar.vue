<template>
  <v-app-bar app absolute flat color="white">
    <ui-app-bar-title />

    <v-spacer />

    <v-btn dark depressed color="light-blue lighten-2" to="/login">
      {{ $t('title.login') }}
    </v-btn>
    <v-btn dark outlined color="light-blue lighten-2" class="ml-3" to="/signup">
      {{ $t('title.signup') }}
    </v-btn>
  </v-app-bar>
</template>
