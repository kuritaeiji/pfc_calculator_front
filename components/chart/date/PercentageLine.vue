<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import percentageChart from '~/mixins/percentageChart'

export default {
  mixins: [dateChart, percentageChart],
  props: {
    endDate: {
      type: String,
      required: true
    }
  },
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
    const today = this.$utils.formatDate(new Date())
    await this.$store.dispatch('chart/getDatePercentageData', today)
  }
}
</script>
