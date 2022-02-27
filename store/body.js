export const state = () => ({
  body: {}
})

export const getters = {
  body (state) {
    return state.body
  }
}

export const mutations = {
  setBody (state, body) {
    state.body = body
  }
}

const formatedBody = body => ({ ...body, weight: Number(body.weight), percentage: Number(body.percentage) })

export const actions = {
  async createBody ({ commit }, date) {
    // 特定の日付のbodyを{ weight: 0, percentage: 0 }で初期作成
    const response = await this.$axios.$post(`/api/v1/days/${date}/bodies`)
    commit('setBody', formatedBody(response.body))
  },
  async updateWeight ({ commit }, params) {
    const response = await this.$axios.$put(`/api/v1/bodies/${params.body.id}/weight`, params)
    commit('setBody', formatedBody(response.body))
  },
  async updatePercentage ({ commit }, params) {
    const response = await this.$axios.$put(`/api/v1/bodies/${params.body.id}/percentage`, params)
    commit('setBody', formatedBody(response.body))
  }
}
