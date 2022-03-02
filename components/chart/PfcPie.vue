<template>
  <chart-pie :chart-data="chartData" :options="options" css-classes="chart-pfc-pie" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('day', ['day']),
    chartData () {
      return {
        labels: [this.$t('model.attributes.day.protein'), this.$t('model.attributes.day.fat'), this.$t('model.attributes.day.carbonhydrate')],
        datasets: [
          {
            data: [this.day.protein, this.day.fat, this.day.carbonhydrate],
            backgroundColor: ['Red', 'Yellow', 'Blue'],
            hoverBackgroundColor: ['Red', 'Yellow', 'Blue']
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
              const label = self.chartData.labels[index]
              const value = self.chartData.datasets[0].data[index]
              const pfcSum = self.day.protein + self.day.fat + self.day.carbonhydrate
              const percentage = Math.round(value / pfcSum * 100 * 10) / 10
              return ` ${label}: ${percentage}%`
            }
          }
        }
      }
    }
  }
}
</script>
