import activate from '~/middleware/activate'

describe('activate', () => {
  const query = { token: 'token' }

  describe('アカウントの有効化に成功する場合', () => {
    it('/api/v1/activateパスと通信する', () => {
      const $axios = {
        $put: jest.fn()
      }
      activate({ $axios, query })
      expect($axios.$put).toHaveBeenCalledWith('/api/v1/activate', { token: query.token })
    })
  })

  describe('アカウントの有効化に失敗する場合', () => {
    const store = { dispatch: jest.fn() }
    const msg = 'スナックバーメッセージ'
    const app = {
      i18n: {
        t () {
          return msg
        }
      }
    }
    const redirect = jest.fn()

    it('401エラーが返ってくるとスナックバーを作成し、ルートにリダイレクト', async () => {
      const $axios = {
        $put () {
          return new Promise((resolve, reject) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ response: { status: 401 } })
          })
        }
      }
      await activate({ $axios, store, app, query, redirect })

      expect(store.dispatch).toHaveBeenCalledWith('snackbar/setSnackbar', msg)
      expect(redirect).toHaveBeenCalledWith('/')
    })

    it('409エラーが返ってくるとスナックバーを作成し、ルートにリダイレクト', async () => {
      const $axios = {
        $put () {
          return new Promise((resolve, reject) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ response: { status: 409 } })
          })
        }
      }
      await activate({ $axios, query, store, app, redirect })

      expect(store.dispatch).toHaveBeenCalledWith('snackbar/setSnackbar', msg)
      expect(redirect).toHaveBeenCalledWith('/')
    })
  })
})
