const defaultSnackbar = {
  isShow: false,
  message: ''
}

export const state = () => ({
  snackbar: { ...defaultSnackbar }
})

export const getters = {
  snackbar (state) {
    return state.snackbar
  }
}

export const mutations = {
  setSnackbar (state, payload) {
    state.snackbar = payload
  },
  resetSnackbar (state) {
    state.snackbar = { ...defaultSnackbar }
  }
}

export const actions = {
  setSnackbar ({ commit }, message) {
    commit('setSnackbar', { message, isShow: true })
  },
  resetSnackbar ({ commit }) {
    commit('resetSnackbar')
  }
}
