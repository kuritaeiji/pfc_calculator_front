export const state = () => ({
  day: {}
})

export const getters = {
  day (state) {
    return state.day
  }
}

export const mutations = {
  setDay (state, day) {
    state.day = day
  }
}

const formattedDay = day => ({
  ...day,
  calory: Number(day.calory),
  protein: Number(day.protein),
  fat: Number(day.fat),
  carbonhydrate: Number(day.carbonhydrate)
})

export const actions = {
  async getDay ({ commit }, date) {
    const response = await this.$axios.$get(`/api/v1/days/${date}`)
    commit('setDay', formattedDay(response.day))
  },
  async createDay ({ commit }, params) {
    const response = await this.$axios.$post('/api/v1/days', params)
    commit('setDay', formattedDay(response.day))
  }
}
