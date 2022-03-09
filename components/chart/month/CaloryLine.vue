<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import caloryChart from '~/mixins/caloryChart'

export default {
  mixins: [monthChart, caloryChart],
  computed: {
    ...mapGetters('chart', ['monthCaloryData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthCaloryData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getMonthCaloryData', this.$utils.thisMonth)
  }
}
</script>
