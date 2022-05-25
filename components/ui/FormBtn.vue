<template>
  <v-btn
    large
    block
    depressed
    color="btnPrimary"
    class="white--text font-weight-bold"
    :disabled="isLoading"
    :loading="isLoading"
    @click="click"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '送信する'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
