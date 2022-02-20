const defaultValidation = {
  isShow: false,
  messages: []
}

export const state = () => ({
  validation: { ...defaultValidation }
})

export const getters = {
  validation (state) {
    return state.validation
  }
}

export const mutations = {
  setValidation (state, payload) {
    state.validation = payload
  },
  resetValidation (state) {
    state.validation = { ...defaultValidation }
  }
}

export const actions = {
  setValidation ({ commit }, messages) {
    commit('setValidation', { isShow: true, messages })
  },
  resetValidation ({ commit }) {
    commit('resetValidation')
  }
}
