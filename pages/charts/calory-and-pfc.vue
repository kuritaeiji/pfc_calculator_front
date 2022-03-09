<template>
  <v-container>
    <ui-title :title="title" class="pl-0" />

    <chart-container class="mb-5">
      <chart-card>
        <chart-date-calory-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-calory-line v-if="chartType === 'month'" :end-month="month" />
      </chart-card>

      <chart-card>
        <chart-date-protein-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-protein-line v-if="chartType === 'month'" :end-month="month" />
      </chart-card>
    </chart-container>

    <chart-container>
      <chart-card>
        <chart-date-fat-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-fat-line v-if="chartType === 'month'" :end-month="month" />
      </chart-card>

      <chart-card>
        <chart-date-carbonhydrate-line v-if="chartType === 'date'" :end-date="date" />
        <chart-month-carbonhydrate-line v-if="chartType === 'month'" :end-month="month" />
      </chart-card>
    </chart-container>

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
    return {
      date: this.$utils.today,
      month: this.$utils.thisMonth,
      chartType: 'date'
    }
  },
  methods: {
    ...mapActions(
      'chart',
      [
        'getDateCaloryData', 'getDateProteinData', 'getDateFatData', 'getDateCarbonhydrateData',
        'getMonthCaloryData', 'getMonthProteinData', 'getMonthFatData', 'getMonthCarbonhydrateData'
      ]
    ),
    async selectDate (date) {
      this.date = date
      await Promise.all([
        this.getDateCaloryData(date),
        this.getDateProteinData(date),
        this.getDateFatData(date),
        this.getDateCarbonhydrateData(date)
      ])
    },
    async selectMonth (month) {
      this.month = month
      await Promise.all([
        this.getMonthCaloryData(month),
        this.getMonthProteinData(month),
        this.getMonthFatData(month),
        this.getMonthCarbonhydrateData(month)
      ])
    }
  }
}
</script>
