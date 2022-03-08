<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import weightChart from '~/mixins/weightChart'

export default {
  mixins: [dateChart, weightChart],
  props: {
    endDate: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('chart', ['dateWeightData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.dateWeightData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    const today = this.$utils.formatDate(new Date())
    await this.$store.dispatch('chart/getDateWeightData', today)
  }
}
</script>
