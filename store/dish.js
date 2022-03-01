export const state = () => ({
  dishes: []
})

export const getters = {
  dishes (state) {
    return state.dishes
  }
}

export const mutations = {
  setDishes (state, dishes) {
    state.dishes = dishes
  },
  createDish (state, dish) {
    state.dishes.push(dish)
  },
  updateDish (state, dish) {
    const index = state.dishes.findIndex(d => d.id === dish.id)
    state.dishes.splice(index, 1, dish)
  },
  destroyDish (state, id) {
    state.dishes = state.dishes.filter(d => d.id !== id)
  }
}

const formattedDish = dish => ({
  ...dish,
  calory: Number(dish.calory),
  protein: Number(dish.protein),
  fat: Number(dish.fat),
  carbonhydrate: Number(dish.carbonhydrate)
})

export const actions = {
  async getDishes ({ commit }, date) {
    const response = await this.$axios.$get(`/api/v1/days/${date}/dishes`)
    commit('setDishes', response.dishes.map(dish => formattedDish(dish)))
  },
  async createDish ({ commit }, params) {
    const response = await this.$axios.$post(`/api/v1/days/${params.dish.day.date}/dishes`, params)
    commit('createDish', formattedDish(response.dish))
  },
  async updateDish ({ commit }, params) {
    const response = await this.$axios.$put(`/api/v1/dishes/${params.dish.id}`, params)
    commit('updateDish', formattedDish(response.dish))
  },
  async destroyDish ({ commit }, dish) {
    await this.$axios.$delete(`/api/v1/dishes/${dish.id}`)
    commit('destroyDish', dish.id)
  }
}
