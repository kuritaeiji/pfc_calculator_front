export const state = () => ({
  dateWeightData: [],
  datePercentageData: []
})

export const getters = {
  dateWeightData (state) {
    return state.dateWeightData
  },
  datePercentageData (state) {
    return state.datePercentageData
  }
}

export const mutations = {
  setDateWeightData (state, data) {
    state.dateWeightData = data
  },
  setDatePercentageData (state, data) {
    state.datePercentageData = data
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
  }
}
