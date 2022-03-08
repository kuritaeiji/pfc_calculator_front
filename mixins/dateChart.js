export default {
  computed: {
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        labels.unshift(this.$moment(this.endDate).subtract(i, 'days').format('M/D'))
      }
      return labels
    }
  }
}
