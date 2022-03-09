<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import caloryChart from '~/mixins/caloryChart'

export default {
  mixins: [dateChart, caloryChart],
  computed: {
    ...mapGetters('chart', ['dateCaloryData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.dateCaloryData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getDateCaloryData', this.$utils.today)
  }
}
</script>
