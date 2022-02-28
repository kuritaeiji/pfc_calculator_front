// foods = [{ id: 1, title: 'フード', category: { id: 1, title: 'カテゴリー'} }]

export const state = () => ({
  foods: []
})

export const getters = {
  foods (state) {
    return state.foods
  },
  foodsByCategory (state) {
    return categoryId => state.foods.filter(f => f.category.id === categoryId)
  },
  foodById (state) {
    return id => state.foods.find(food => food.id === id)
  }
}

export const mutations = {
  setFoods (state, foods) {
    state.foods = foods
  },
  createFood (state, food) {
    state.foods.push(food)
  },
  updateFood (state, food) {
    const index = state.foods.findIndex(f => f.id === food.id)
    state.foods.splice(index, 1, food)
  },
  destroyFood (state, id) {
    state.foods = state.foods.filter(f => f.id !== id)
  }
}

export const actions = {
  async getFoods ({ commit }) {
    const response = await this.$axios.$get('/api/v1/foods')
    commit('setFoods', response.foods)
  },
  async createFood ({ commit }, params) {
    const response = await this.$axios.$post('/api/v1/foods', params)
    commit('createFood', response.food)
  },
  async updateFood ({ commit }, params) {
    const response = await this.$axios.$put(`/api/v1/foods/${params.food.id}`, params)
    commit('updateFood', response.food)
  },
  async destroyFood ({ commit }, food) {
    await this.$axios.$delete(`/api/v1/foods/${food.id}`)
    commit('destroyFood', food.id)
  }
}
