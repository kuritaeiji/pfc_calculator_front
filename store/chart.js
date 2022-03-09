export const state = () => ({
  dateWeightData: [],
  datePercentageData: [],
  monthWeightData: [],
  monthPercentageData: [],
  dateCaloryData: [],
  dateProteinData: [],
  dateFatData: [],
  dateCarbonhydrateData: [],
  monthCaloryData: [],
  monthProteinData: [],
  monthFatData: [],
  monthCarbonhydrateData: []
})

export const getters = {
  dateWeightData (state) {
    return state.dateWeightData
  },
  datePercentageData (state) {
    return state.datePercentageData
  },
  monthWeightData (state) {
    return state.monthWeightData
  },
  monthPercentageData (state) {
    return state.monthPercentageData
  },
  dateCaloryData (state) {
    return state.dateCaloryData
  },
  dateProteinData (state) {
    return state.dateProteinData
  },
  dateFatData (state) {
    return state.dateFatData
  },
  dateCarbonhydrateData (state) {
    return state.dateCarbonhydrateData
  },
  monthCaloryData (state) {
    return state.monthCaloryData
  },
  monthProteinData (state) {
    return state.monthProteinData
  },
  monthFatData (state) {
    return state.monthFatData
  },
  monthCarbonhydrateData (state) {
    return state.monthCarbonhydrateData
  }
}

export const mutations = {
  setDateWeightData (state, data) {
    state.dateWeightData = data
  },
  setDatePercentageData (state, data) {
    state.datePercentageData = data
  },
  setMonthWeightData (state, data) {
    state.monthWeightData = data
  },
  setMonthPercentageData (state, data) {
    state.monthPercentageData = data
  },
  setDateCaloryData (state, data) {
    state.dateCaloryData = data
  },
  setDateProteinData (state, data) {
    state.dateProteinData = data
  },
  setDateFatData (state, data) {
    state.dateFatData = data
  },
  setDateCarbonhydrateData (state, data) {
    state.dateCarbonhydrateData = data
  },
  setMonthCaloryData (state, data) {
    state.monthCaloryData = data
  },
  setMonthProteinData (state, data) {
    state.monthProteinData = data
  },
  setMonthFatData (state, data) {
    state.monthFatData = data
  },
  setMonthCarbonhydrateData (state, data) {
    state.monthCarbonhydrateData = data
  }
}

const formatData = data => data.map(value => Number(value))

export const actions = {
  async getDateWeightData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_weight?date=${endDate}`)
    commit('setDateWeightData', formatData(response.chart))
  },
  async getDatePercentageData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_percentage?date=${endDate}`)
    commit('setDatePercentageData', formatData(response.chart))
  },
  async getMonthWeightData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_weight?month=${endMonth}`)
    commit('setMonthWeightData', formatData(response.chart))
  },
  async getMonthPercentageData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_percentage?month=${endMonth}`)
    commit('setMonthPercentageData', formatData(response.chart))
  },
  async getDateCaloryData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_calory?date=${endDate}`)
    commit('setDateCaloryData', formatData(response.chart))
  },
  async getDateProteinData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_protein?date=${endDate}`)
    commit('setDateProteinData', formatData(response.chart))
  },
  async getDateFatData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_fat?date=${endDate}`)
    commit('setDateFatData', formatData(response.chart))
  },
  async getDateCarbonhydrateData ({ commit }, endDate) {
    const response = await this.$axios.$get(`/api/v1/charts/date_carbonhydrate?date=${endDate}`)
    commit('setDateCarbonhydrateData', formatData(response.chart))
  },
  async getMonthCaloryData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_calory?month=${endMonth}`)
    commit('setMonthCaloryData', formatData(response.chart))
  },
  async getMonthProteinData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_protein?month=${endMonth}`)
    commit('setMonthProteinData', formatData(response.chart))
  },
  async getMonthFatData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_fat?month=${endMonth}`)
    commit('setMonthFatData', formatData(response.chart))
  },
  async getMonthCarbonhydrateData ({ commit }, endMonth) {
    const response = await this.$axios.$get(`/api/v1/charts/month_carbonhydrate?month=${endMonth}`)
    commit('setMonthCarbonhydrateData', formatData(response.chart))
  }
}
