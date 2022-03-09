export default {
  data () {
    return {
      defaultDataset: {
        label: this.$t('model.attributes.day.protein'),
        fill: false,
        lineTension: 0,
        backgroundColor: 'Red',
        borderColor: 'Red'
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
              return ` ${data}${self.$t('unit.protein')}`
            }
          }
        }
      }
    }
  }
}
