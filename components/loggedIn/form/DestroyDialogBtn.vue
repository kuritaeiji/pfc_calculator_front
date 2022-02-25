<template>
  <v-btn icon large class="ma-0">
    <v-icon @click="open">
      mdi-delete
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    open () {
      this.$emit('open')
    }
  }
}
</script>
