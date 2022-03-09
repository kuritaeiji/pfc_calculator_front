<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import carbonhydrateChart from '~/mixins/carbonhydrateChart'

export default {
  mixins: [monthChart, carbonhydrateChart],
  computed: {
    ...mapGetters('chart', ['monthCarbonhydrateData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthCarbonhydrateData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getMonthCarbonhydrateData', this.$utils.thisMonth)
  }
}
</script>
