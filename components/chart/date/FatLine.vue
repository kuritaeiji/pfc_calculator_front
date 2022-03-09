<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import fatChart from '~/mixins/fatChart'

export default {
  mixins: [dateChart, fatChart],
  computed: {
    ...mapGetters('chart', ['dateFatData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.dateFatData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getDateFatData', this.$utils.today)
  }
}
</script>
