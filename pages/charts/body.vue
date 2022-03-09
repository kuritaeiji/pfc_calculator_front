<template>
  <v-container>
    <ui-title :title="title" class="justify-center" />

    <div class="d-flex align-center flex-column flex-md-row justify-md-center">
      <v-card flat tile max-width="500" class="pa-3 mb-5 mb-md-0 mr-md-5">
        <chart-date-weight-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-weight-line v-if="chartType === 'month'" :end-month="month" />
      </v-card>

      <v-card flat tile max-width="500" class="pa-3">
        <chart-date-percentage-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-percentage-line v-if="chartType === 'month'" :end-month="month" />
      </v-card>
    </div>

    <v-card-actions class="justify-center">
      <chart-date-picker v-if="chartType === 'date'" :date="date" @change="selectDate" />
      <chart-month-picker v-if="chartType === 'month'" :month="month" @change="selectMonth" />

      <chart-radio :chart-type.sync="chartType" />
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
    const thisMonth = this.$utils.formatMonth(new Date())
    return {
      date: today,
      month: thisMonth,
      chartType: 'date'
    }
  },
  methods: {
    ...mapActions('chart', ['getDateWeightData', 'getDatePercentageData', 'getMonthWeightData', 'getMonthPercentageData']),
    async selectDate (date) {
      this.date = date
      await Promise.all([this.getDateWeightData(date), this.getDatePercentageData(date)])
    },
    async selectMonth (month) {
      this.month = month
      await Promise.all([this.getMonthWeightData(month), this.getMonthPercentageData(month)])
    }
  }
}
</script>
