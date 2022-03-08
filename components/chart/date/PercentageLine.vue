<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
            label: this.$t('model.attributes.body.percentage'),
            data: this.datePercentageData,
            lineTension: 0,
            fill: false,
            borderColor: 'Blue',
            backgroundColor: 'Blue'
          }
        ]
      }
    },
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        labels.unshift(this.$moment(this.endDate).subtract(i, 'days').format('M/D'))
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
              return ` ${data}${self.$t('unit.percentage')}`
            }
          }
        }
      }
    }
  },
  async beforeCreate () {
    const today = this.$utils.formatDate(new Date())
    await this.$store.dispatch('chart/getDatePercentageData', today)
  }
}
</script>
