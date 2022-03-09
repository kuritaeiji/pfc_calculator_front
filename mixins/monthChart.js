export default {
  props: {
    endMonth: {
      type: String,
      required: true
    }
  },
  computed: {
    labels () {
      const labels = []
      for (let i = 0; i < 10; i++) {
        labels.unshift(this.$moment(new Date(this.endMonth)).subtract(i, 'month').format('YYYY年M月'))
      }
      return labels
    }
  }
}
