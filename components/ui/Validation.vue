<template>
  <v-alert
    v-if="validation.isShow"
    dense
    outlined
    color="error"
    class="mb-5"
  >
    <div v-for="(msg, i) of validation.messages" :key="`validation-${i}`" class="d-flex">
      <div>
        <v-icon color="error">
          mdi-circle-small
        </v-icon>
      </div>
      <div>
        {{ msg }}
      </div>
    </div>
  </v-alert>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters('validation', ['validation']),
  beforeDestroy () {
    this.resetValidation()
  },
  methods: mapActions('validation', ['resetValidation'])
}
</script>
