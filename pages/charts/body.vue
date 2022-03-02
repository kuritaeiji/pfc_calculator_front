<template>
  <v-container>
    <ui-title :title="title" class="pl-0" />

    <v-card flat tile max-width="500" class="pa-3">
      <chart-date-weight-line />
    </v-card>
  </v-container>
</template>

<script>
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle]
}
</script>
