<template>
  <v-alert
    :value="snackbar.isShow"
    dark
    tile
    dismissible
    :color="snackbar.color"
    class="font-weight-bold"
    @input="closeSnackbar"
  >
    {{ snackbar.message }}
  </v-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters('snackbar', ['snackbar']),
  methods: {
    ...mapActions('snackbar', ['resetSnackbar']),
    closeSnackbar () {
      this.resetSnackbar()
    }
  }
}
</script>
