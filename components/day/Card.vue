<template>
  <v-card flat tile max-width="570">
    <v-row no-gutters>
      <v-col cols="6" sm="3">
        <ui-title :title="$t('model.attributes.day.calory')" />
        <v-card-title class="pt-0 greyText--text text-h6 font-weight-bold">
          {{ day.calory }}{{ $t('unit.calory') }}
        </v-card-title>
      </v-col>

      <v-col cols="6" sm="3">
        <ui-title :title="$t('model.attributes.day.protein')" />
        <v-card-title class="pt-0 greyText--text text-h6 font-weight-bold">
          {{ day.protein }}{{ $t('unit.protein') }}
        </v-card-title>
      </v-col>

      <v-col cols="6" sm="3">
        <ui-title :title="$t('model.attributes.day.fat')" />
        <v-card-title class="pt-0 greyText--text text-h6 font-weight-bold">
          {{ day.fat }}{{ $t('unit.fat') }}
        </v-card-title>
      </v-col>

      <v-col cols="6" sm="3">
        <ui-title :title="$t('model.attributes.day.carbonhydrate')" />
        <v-card-title class="pt-0 greyText--text text-h6 font-weight-bold">
          {{ day.carbonhydrate }}{{ $t('unit.carbonhydrate') }}
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('day', ['day'])
}
</script>
