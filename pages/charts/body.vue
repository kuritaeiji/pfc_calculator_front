<template>
  <v-container>
    <ui-title :title="title" class="justify-center" />

    <div class="d-flex align-center flex-column flex-md-row justify-md-center">
      <v-card flat tile max-width="500" class="pa-3 mb-5 mb-md-0 mr-md-5">
        <chart-date-weight-line :end-date="date" />
      </v-card>

      <v-card flat tile max-width="500" class="pa-3">
        <chart-date-percentage-line :end-date="date" />
      </v-card>
    </div>

    <v-card-actions class="justify-center justify-md-start">
      <v-menu offset-y close-on-content-click>
        <template #activator="{ attrs, on }">
          <v-btn
            large
            depressed
            color="btnPrimary"
            class="white--text font-weight-bold mt-5"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-1">
              mdi-calendar
            </v-icon>
            日付を選択する
          </v-btn>
        </template>
        <v-date-picker
          :value="date"
          :max="today"
          locale="ja-jp"
          first-day-of-week="1"
          :day-format="date => new Date(date).getDate()"
          @change="selectDate"
        />
      </v-menu>
    </v-card-actions>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import pageTitle from '~/mixins/pageTitle'

export default {
  mixins: [pageTitle],
  data () {
    const today = this.$utils.formatDate(new Date())
    return {
      date: today,
      today
    }
  },
  methods: {
    ...mapActions('chart', ['getDateWeightData', 'getDatePercentageData']),
    async selectDate (date) {
      this.date = date
      await Promise.all([this.getDateWeightData(date), this.getDatePercentageData(date)])
    }
  }
}
</script>
