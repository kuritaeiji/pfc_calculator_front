<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import percentageChart from '~/mixins/percentageChart'

export default {
  mixins: [dateChart, percentageChart],
  computed: {
    ...mapGetters('chart', ['datePercentageData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.datePercentageData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getDatePercentageData', this.$utils.today)
  }
}
</script>
