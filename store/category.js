export const state = () => ({
  categories: [],
  tab: null
})

export const getters = {
  categories (state) {
    return state.categories
  },
  tab (state) {
    return state.tab
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
  },
  setTab (state, id) {
    state.tab = id
  }
}

export const actions = {
  async getCategories ({ commit }) {
    const response = await this.$axios.$get('/api/v1/categories')
    commit('setCategories', response.categories)
    if (response.categories.length) {
      commit('setTab', response.categories[0].id)
    }
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
  },
  setTab ({ commit }, categoryId) {
    commit('setTab', categoryId)
  }
}
