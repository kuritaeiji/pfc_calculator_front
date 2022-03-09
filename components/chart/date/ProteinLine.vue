<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import dateChart from '~/mixins/dateChart'
import proteinChart from '~/mixins/proteinChart'

export default {
  mixins: [dateChart, proteinChart],
  computed: {
    ...mapGetters('chart', ['dateProteinData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.dateProteinData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getDateProteinData', this.$utils.today)
  }
}
</script>
