<template>
  <v-card-title class="greyText--text font-weight-bold">
    {{ title }}
  </v-card-title>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
