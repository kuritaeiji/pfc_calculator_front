import { getters, mutations, actions } from '~/store/snackbar'

const snackbar = {
  isShow: false,
  message: ''
}

describe('getters', () => {
  it('snackbar', () => {
    const result = getters.snackbar({ snackbar })
    expect(result).toEqual(snackbar)
  })
})

describe('mutations', () => {
  const _state = () => ({
    snackbar: { ...snackbar }
  })

  let state
  beforeEach(() => {
    state = _state
  })

  it('setSnackbar', () => {
    const newSnackbar = { isShow: true, message: 'message' }
    mutations.setSnackbar(state, newSnackbar)
    expect(state.snackbar).toEqual(newSnackbar)
  })

  it('resetSnackbar', () => {
    state.snackbar = { isShow: true, message: 'message' }
    mutations.resetSnackbar(state)
    expect(state.snackbar).toEqual(snackbar)
  })
})

describe('actions', () => {
  const commit = jest.fn()

  it('setSnackbar', () => {
    const newSnackbar = { isShow: true, message: 'message' }
    actions.setSnackbar({ commit }, newSnackbar.message)
    expect(commit).toHaveBeenCalledWith('setSnackbar', newSnackbar)
  })

  it('resetSnackbar', () => {
    actions.resetSnackbar({ commit })
    expect(commit).toHaveBeenCalled()
  })
})
