<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  mixins: [Pie, reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
