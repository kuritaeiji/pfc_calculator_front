<template>
  <v-snackbar
    :value="snackbar.isShow"
    app
    top
    color="deep-purple lighten-2"
    elevation="0"
    timeout="-1"
  >
    {{ snackbar.message }}
    <template #action="{ attrs }">
      <v-btn text v-bind="attrs" @click="resetSnackbar">
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters('snackbar', ['snackbar']),
  methods: mapActions('snackbar', ['resetSnackbar'])
}
</script>
