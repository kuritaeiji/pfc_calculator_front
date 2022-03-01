export const state = () => ({
  ateFoods: []
})

export const getters = {
  ateFoods (state) {
    return state.ateFoods
  }
}

export const mutations = {
  setAteFoods (state, ateFoods) {
    state.ateFoods = ateFoods
  },
  createAteFood (state, ateFood) {
    state.ateFoods.push(ateFood)
  },
  updateAteFood (state, ateFood) {
    const index = state.ateFoods.findIndex(food => food.id === ateFood.id)
    state.ateFoods.splice(index, 1, ateFood)
  },
  destroyAteFood (state, id) {
    state.ateFoods = state.ateFoods.filter(food => food.id !== id)
  }
}

const formattedAteFood = ateFood => ({ ...ateFood, amount: Number(ateFood.amount) })

export const actions = {
  async getAteFoods ({ commit }, date) {
    const response = await this.$axios.$get(`/api/v1/days/${date}/ate_foods`)
    commit('setAteFoods', response.ate_foods.map(f => formattedAteFood(f)))
  },
  async createAteFood ({ commit }, params) {
    const response = await this.$axios.$post(`/api/v1/days/${params.ate_food.day.date}/ate_foods`, params)
    commit('createAteFood', formattedAteFood(response.ate_food))
  },
  async updateAteFood ({ commit }, params) {
    const response = await this.$axios.$put(`/api/v1/ate_foods/${params.ate_food.id}`, params)
    commit('updateAteFood', formattedAteFood(response.ate_food))
  },
  async destroyAteFood ({ commit }, ateFood) {
    await this.$axios.$delete(`/api/v1/ate_foods/${ateFood.id}`)
    commit('destroyAteFood', ateFood.id)
  }
}
