import { getters, mutations, actions, defaultSnackbar } from '~/store/snackbar'

describe('getters', () => {
  it('snackbar', () => {
    const result = getters.snackbar({ snackbar: defaultSnackbar })
    expect(result).toEqual(defaultSnackbar)
  })
})

describe('mutations', () => {
  const _state = () => ({
    snackbar: { ...defaultSnackbar }
  })

  let state
  beforeEach(() => {
    state = _state
  })

  it('setSnackbar', () => {
    const newSnackbar = { message: 'message', color: 'error', isShow: true, pageCount: 0 }
    mutations.setSnackbar(state, newSnackbar)
    expect(state.snackbar).toEqual(newSnackbar)
  })

  it('resetSnackbar', () => {
    state.snackbar = { isShow: true, message: 'message' }
    mutations.resetSnackbar(state)
    expect(state.snackbar).toEqual(defaultSnackbar)
  })

  it('plusPageCount', () => {
    mutations.plusPageCount(state)
    expect(state.snackbar.pageCount).toEqual(1)
  })
})

describe('actions', () => {
  const commit = jest.fn()

  it('setSnackbar', () => {
    const newSnackbar = { message: 'message', color: 'error' }
    actions.setSnackbar({ commit }, newSnackbar)
    expect(commit).toHaveBeenCalledWith('setSnackbar', { message: newSnackbar.message, color: newSnackbar.color, isShow: true, pageCount: 0 })
    const newSnackbar2 = { message: 'message' }
    actions.setSnackbar({ commit }, newSnackbar2)
    expect(commit.mock.calls[1][0]).toEqual('setSnackbar')
    expect(commit.mock.calls[1][1]).toEqual({ message: newSnackbar.message, color: defaultSnackbar.color, isShow: true, pageCount: 0 })
  })

  it('resetSnackbar', () => {
    actions.resetSnackbar({ commit })
    expect(commit).toHaveBeenCalled()
  })

  it('plusPageCount', () => {
    actions.plusPageCount({ commit })
    expect(commit).toHaveBeenCalled()
  })
})
