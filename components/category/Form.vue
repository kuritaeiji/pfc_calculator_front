<template>
  <v-text-field
    v-model="setTitle"
    outlined
    label="カテゴリー名"
    :rules="rules"
  />
</template>

<script>
import { presence, shorter } from '~/validators'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      rules: [presence, shorter(20)]
    }
  },
  computed: {
    setTitle: {
      get () {
        return this.title
      },
      set (newValue) {
        this.$emit('update:title', newValue)
      }
    }
  }
}
</script>
