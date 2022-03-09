export default {
  data () {
    return {
      defaultDataset: {
        label: this.$t('model.attributes.day.carbonhydrate'),
        fill: false,
        lineTension: 0,
        backgroundColor: 'Blue',
        borderColor: 'Blue'
      }
    }
  },
  computed: {
    options () {
      const self = this
      return {
        tooltips: {
          callbacks: {
            label (tooltipItem) {
              const index = tooltipItem.index
              const data = self.chartData.datasets[0].data[index]
              return ` ${data}${self.$t('unit.carbonhydrate')}`
            }
          }
        }
      }
    }
  }
}
