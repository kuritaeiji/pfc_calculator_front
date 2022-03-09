<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import carbonhydrateChart from '~/mixins/carbonhydrateChart'

export default {
  mixins: [dateChart, carbonhydrateChart],
  computed: {
    ...mapGetters('chart', ['dateCarbonhydrateData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.dateCarbonhydrateData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getDateCarbonhydrateData', this.$utils.today)
  }
}
</script>
