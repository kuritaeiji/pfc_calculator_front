<template>
  <v-radio-group v-model="setChartType" class="ml-5">
    <v-radio
      v-for="radio in radios"
      :key="`radio-${radio.label}`"
      :label="radio.label"
      :value="radio.value"
    />
  </v-radio-group>
</template>

<script>
export default {
  props: {
    chartType: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      radios: [
        { label: '1日毎のグラフ', value: 'date' },
        { label: '1月毎のグラフ', value: 'month' }
      ]
    }
  },
  computed: {
    setChartType: {
      get () {
        return this.chartType
      },
      set (newVal) {
        this.$emit('update:chart-type', newVal)
      }
    }
  }
}
</script>
