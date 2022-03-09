<template>
  <chart-line :chart-data="chartData" :options="options" />
</template>

<script>
import { mapGetters } from 'vuex'
import monthChart from '~/mixins/monthChart'
import proteinChart from '~/mixins/proteinChart'

export default {
  mixins: [monthChart, proteinChart],
  computed: {
    ...mapGetters('chart', ['monthProteinData']),
    chartData () {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.monthProteinData,
            ...this.defaultDataset
          }
        ]
      }
    }
  },
  async beforeCreate () {
    await this.$store.dispatch('chart/getMonthProteinData', this.$utils.thisMonth)
  }
}
</script>
