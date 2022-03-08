export const state = () => ({
  dateWeightData: [],
  datePercentageData: [],
  monthWeightData: [],
  monthPercentageData: []
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
  }
}
