<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import fatChart from '~/mixins/fatChart'

export default {
  mixins: [monthChart, fatChart],
  computed: {
    ...mapGetters('chart', ['monthFatData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthFatData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getMonthFatData', this.$utils.thisMonth)
  }
}
</script>
