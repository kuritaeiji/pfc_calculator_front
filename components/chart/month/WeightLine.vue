<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
            label: this.$t('model.attributes.body.weight'),
            data: this.monthWeightData,
            fill: false,
            lineTension: 0,
            backgroundColor: 'Red',
            borderColor: 'Red'
          }
        ]
      }
    },
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        labels.unshift(this.$moment(new Date(this.endMonth)).subtract(i, 'month').format('YYYY年M月'))
      }
      return labels
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
