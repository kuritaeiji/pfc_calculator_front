export const defaultSnackbar = {
  isShow: false,
  pageCount: 0,
  color: 'info',
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
  },
  plusPageCount (state) {
    state.snackbar.pageCount += 1
  }
}

export const actions = {
  setSnackbar ({ commit }, { message, color }) {
    if (color === undefined) { color = defaultSnackbar.color }
    commit('setSnackbar', { message, color, isShow: true, pageCount: 0 })
  },
  resetSnackbar ({ commit }) {
    commit('resetSnackbar')
  },
  plusPageCount ({ commit }) {
    commit('plusPageCount')
  }
}
