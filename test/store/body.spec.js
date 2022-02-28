import { getters, actions, mutations } from '~/store/body'

const defaultBody = {
  id: 1,
  weight: 50,
  percentage: 20,
  day: {
    id: 10,
    date: '2020-01-01'
  }
}

describe('getters', () => {
  it('body', () => {
    const result = getters.body({ body: defaultBody })
    expect(result).toEqual(defaultBody)
  })
})

describe('mutations', () => {
  const _state = () => ({
    body: { ...defaultBody }
  })

  let state
  beforeEach(() => {
    state = _state()
  })

  it('setBody', () => {
    const body = { id: 2 }
    mutations.setBody(state, body)
    expect(state.body).toEqual(body)
  })
})

describe('actions', () => {
  const mockAxios = {
    $post: jest.fn(),
    $put: jest.fn()
  }
  const commit = jest.fn()
  const stubAxios = {
    $post () {
      return {
        body: {
          id: 10,
          weight: '0.0',
          percentage: '0.0'
        }
      }
    },
    $put () {
      return {
        body: {
          id: 10,
          weight: 50,
          percentage: 20
        }
      }
    }
  }

  describe('createBody', () => {
    const date = '2020-02-02'
    it('axiosは/api/v1/days/:day_date/bodiesに$postする', () => {
      actions.$axios = mockAxios
      actions.createBody({ commit }, date)
      expect(mockAxios.$post).toHaveBeenCalledWith(`/api/v1/days/${date}/bodies`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.createBody({ commit }, date)
      expect(commit).toHaveBeenCalledWith('setBody', { id: 10, weight: 0, percentage: 0 })
    })
  })

  describe('updateWeight', () => {
    const params = { body: { id: 10, weight: 100 } }

    it('axiosは/api/v1/bodies/:id/weightパスに$putする', () => {
      actions.$axios = mockAxios
      actions.updateWeight({ commit }, params)
      expect(mockAxios.$put).toHaveBeenCalledWith(`/api/v1/bodies/${params.body.id}/weight`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.updateWeight({ commit }, params)
      expect(commit).toHaveBeenCalledWith('setBody', { id: 10, weight: 50, percentage: 20 })
    })
  })
})
