<template>
  <v-btn icon large class="ma-0" @click="open">
    <v-icon>
      mdi-pencil
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
