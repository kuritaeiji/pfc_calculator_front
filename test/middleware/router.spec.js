import routerMiddleware from '~/middleware/router'

describe('middleware/router', () => {
  const createStore = (pageCount) => {
    return {
      dispatch: jest.fn(),
      getters: {
        'snackbar/snackbar': { pageCount }
      }
    }
  }

  it('snackbarのpageCountを1増やす', () => {
    const store = createStore()
    routerMiddleware({ store })
    expect(store.dispatch.mock.calls[0][0]).toEqual('snackbar/plusPageCount')
  })

  it('snackbarのpageCountが2以上の場合resetSnackbarを呼びだす', () => {
    const store = createStore(2)
    routerMiddleware({ store })
    expect(store.dispatch.mock.calls[1][0]).toEqual('snackbar/resetSnackbar')
  })

  it('snackbarのpageCountが2未満の場合resetSnackbarを呼び出さない', () => {
    const store = createStore(1)
    routerMiddleware({ store })
    expect(store.dispatch.mock.calls.length).toEqual(1)
  })
})
