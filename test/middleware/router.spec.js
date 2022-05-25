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

  describe('routeがindexでログイン済みの場合', () => {
    const route = { name: 'index' }
    const $auth = { loggedIn: true }

    it('カウントアップしない', () => {
      const store = createStore()
      routerMiddleware({ store, route, $auth })
      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('カウントアップする場合', () => {
    const route = { name: 'not-index' }
    const $auth = { loggedIn: true }

    it('snackbarのpageCountを1増やす', () => {
      const store = createStore()
      routerMiddleware({ store, route, $auth })
      expect(store.dispatch.mock.calls[0][0]).toEqual('snackbar/plusPageCount')
    })

    it('snackbarのpageCountが2以上の場合resetSnackbarを呼びだす', () => {
      const store = createStore(2)
      routerMiddleware({ store, route, $auth })
      expect(store.dispatch.mock.calls[1][0]).toEqual('snackbar/resetSnackbar')
    })

    it('snackbarのpageCountが2未満の場合resetSnackbarを呼び出さない', () => {
      const store = createStore(1)
      routerMiddleware({ store, route, $auth })
      expect(store.dispatch.mock.calls.length).toEqual(1)
    })
  })
})
