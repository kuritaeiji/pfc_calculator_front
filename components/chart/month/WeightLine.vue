<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import weightChart from '~/mixins/weightChart'

export default {
  mixins: [monthChart, weightChart],
  props: {
    endMonth: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('chart', ['monthWeightData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthWeightData,
            ...this.defaultDataset
          }
        ]
      }
    },
    options () {
      const self = this
      return {
        tooltips: {
          callbacks: {
            label (tooltipItem) {
              const index = tooltipItem.index
              const data = self.chartData.datasets[0].data[index]
              return ` ${data}${self.$t('unit.weight')}`
            }
          }
        }
      }
    }
  },
  async beforeCreate () {
    const thisMonth = this.$utils.formatMonth(new Date())
    await this.$store.dispatch('chart/getMonthWeightData', thisMonth)
  }
}
</script>
