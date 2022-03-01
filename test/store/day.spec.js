import { getters, mutations, actions } from '~/store/day'

const defaultDay = { id: 1, date: '2020-02-02', calory: 100, protein: 100, fat: 100, carbonhydrate: 100 }

describe('getters', () => {
  it('day', () => {
    const result = getters.day({ day: defaultDay })
    expect(result).toEqual(defaultDay)
  })
})

describe('mutations', () => {
  let state
  beforeEach(() => {
    state = {
      day: { ...defaultDay }
    }
  })

  it('setDay', () => {
    const day = { id: 2 }
    mutations.setDay(state, day)
    expect(state.day).toEqual(day)
  })
})

describe('actions', () => {
  const mockAxios = {
    $get: jest.fn(),
    $post: jest.fn()
  }
  const stubAxios = {
    $get () {
      return { day: defaultDay }
    },
    $post () {
      return { day: defaultDay }
    }
  }
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  describe('getDay', () => {
    const date = '2020-02-02'
    it('$axiosは/api/v1/days/:dateに$getする', () => {
      actions.$axios = mockAxios
      actions.getDay({ commit }, date)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/days/${date}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDay({ commit }, date)
      expect(commit).toHaveBeenCalledWith('setDay', defaultDay)
    })
  })

  describe('createDay', () => {
    const params = { day: { date: '2020-02-02' } }
    it('$axiosは/api/v1/daysに$postする', () => {
      actions.$axios = mockAxios
      actions.createDay({ commit }, params)
      expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/days', params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.createDay({ commit }, params)
      expect(commit).toHaveBeenCalledWith('setDay', defaultDay)
    })
  })
})
