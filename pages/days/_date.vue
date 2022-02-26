<template>
  <v-container>
    <v-row justify="center">
      <v-card flat color="transparent" width="80%" max-width="800">
        <ui-title :title="title" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth', 'createDate'],
  data () {
    return {
      title: this.$utils.formatDateJp(new Date(this.$route.params.date))
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>
