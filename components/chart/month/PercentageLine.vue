<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import percentageChart from '~/mixins/percentageChart'

export default {
  mixins: [monthChart, percentageChart],
  computed: {
    ...mapGetters('chart', ['monthPercentageData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthPercentageData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    const thisMonth = this.$utils.formatMonth(new Date())
    await this.$store.dispatch('chart/getMonthPercentageData', thisMonth)
  }
}
</script>
