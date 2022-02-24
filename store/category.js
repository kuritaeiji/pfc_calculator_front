export const state = () => ({
  categories: []
})

export const getters = {
  categories (state) {
    return state.categories
  }
}

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  createCategory (state, category) {
    state.categories.push(category)
  },
  updateCategory (state, category) {
    const index = state.categories.findIndex(c => c.id === category.id)
    state.categories.splice(index, 1, category)
  },
  destroyCategory (state, id) {
    state.categories = state.categories.filter(category => category.id !== id)
  }
}

export const actions = {
  async getCategories ({ commit }) {
    const response = await this.$axios.$get('/api/v1/categories')
    commit('setCategories', response.categories)
  },
  async createCategory ({ commit }, params) {
    // params = { category: { title: 'new_title' } }
    const response = await this.$axios.$post('/api/v1/categories', params)
    commit('createCategory', response.category)
  },
  async updateCategory ({ commit }, params) {
    // params = { category: { id: 1, title: 'new_title' } }
    const response = await this.$axios.$put(`/api/v1/categories/${params.category.id}`, params)
    commit('updateCategory', response.category)
  },
  async destroyCategory ({ commit }, category) {
    await this.$axios.$delete(`/api/v1/categories/${category.id}`)
    commit('destroyCategory', category.id)
  }
}
