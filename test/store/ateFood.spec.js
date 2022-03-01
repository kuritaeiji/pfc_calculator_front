import { getters, mutations, actions } from '~/store/ateFood'

const defaultAteFoods = [
  { id: 1, amount: 100, calory: 120, protein: 100, fat: 10, carbonhydrate: 10, food: { id: 1 }, day: { id: 1 } },
  { id: 2, amount: 100, calory: 120, protein: 100, fat: 10, carbonhydrate: 10, food: { id: 1 }, day: { id: 1 } }
]

describe('getters', () => {
  it('ateFoods', () => {
    const result = getters.ateFoods({ ateFoods: defaultAteFoods })
    expect(result).toEqual(defaultAteFoods)
  })
})

describe('mutations', () => {
  const _state = () => ({ ateFoods: [...defaultAteFoods] })
  let state
  beforeEach(() => {
    state = _state()
  })

  it('setAteFoods', () => {
    mutations.setAteFoods(state, [defaultAteFoods[1], defaultAteFoods[0]])
    expect(state.ateFoods.length).toEqual(2)
    expect(state.ateFoods[0]).toEqual(defaultAteFoods[1])
    expect(state.ateFoods[1]).toEqual(defaultAteFoods[0])
  })

  it('createAteFood', () => {
    const ateFood = { id: 3, amount: 3000 }
    mutations.createAteFood(state, ateFood)
    expect(state.ateFoods[2]).toEqual(ateFood)
  })

  it('updateAteFood', () => {
    const ateFood = { id: 1, amount: 0 }
    mutations.updateAteFood(state, ateFood)
    expect(state.ateFoods[0]).toEqual(ateFood)
    expect(state.ateFoods[1]).toEqual(defaultAteFoods[1])
  })

  it('destroyAteFood', () => {
    const id = 1
    mutations.destroyAteFood(state, id)
    expect(state.ateFoods.length).toEqual(1)
    expect(state.ateFoods[0]).toEqual(defaultAteFoods[1])
  })
})

describe('actions', () => {
  const ateFoods = [
    { id: 1, amount: '100.0' },
    { id: 2, amount: '0.0' }
  ]
  const mockAxios = {
    $get: jest.fn(),
    $post: jest.fn(),
    $put: jest.fn(),
    $delete: jest.fn()
  }
  const stubAxios = {
    $get () {
      return { ate_foods: ateFoods }
    },
    $post () {
      return { ate_food: ateFoods[0] }
    },
    $put () {
      return { ate_food: ateFoods[0] }
    },
    $delete () {}
  }
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  describe('getAteFoods', () => {
    const date = '2020-02-02'

    it('axiosは/api/v1/days/:day_date/ate_foodsパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getAteFoods({ commit }, date)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/days/${date}/ate_foods`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getAteFoods({ commit }, date)
      expect(commit).toHaveBeenCalledWith('setAteFoods', [{ id: 1, amount: 100 }, { id: 2, amount: 0 }])
    })
  })

  describe('createAteFood', () => {
    const params = { ate_food: { amount: 10, food_id: 5, day: { date: '2020-01-01' } } }

    it('axiosは/api/v1/days/:day_date/ate_foodsパスに$postする', () => {
      actions.$axios = mockAxios
      actions.createAteFood({ commit }, params)
      expect(mockAxios.$post).toHaveBeenCalledWith(`/api/v1/days/${params.ate_food.day.date}/ate_foods`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.createAteFood({ commit }, params)
      expect(commit).toHaveBeenCalledWith('createAteFood', { id: 1, amount: 100 })
    })
  })

  describe('updateAteFood', () => {
    const params = { ate_food: { id: 1, amount: 10, food_id: 5 } }

    it('axiosは/api/v1/ate_foods/:idパスに$putする', () => {
      actions.$axios = mockAxios
      actions.updateAteFood({ commit }, params)
      expect(mockAxios.$put).toHaveBeenCalledWith(`/api/v1/ate_foods/${params.ate_food.id}`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.updateAteFood({ commit }, params)
      expect(commit).toHaveBeenCalledWith('updateAteFood', { id: 1, amount: 100 })
    })
  })

  describe('destroyAteFood', () => {
    const ateFood = { id: 1, amount: 10, food_id: 5 }

    it('axiosは/api/v1/ate_foods/:idパスに$deleteする', () => {
      actions.$axios = mockAxios
      actions.destroyAteFood({ commit }, ateFood)
      expect(mockAxios.$delete).toHaveBeenCalledWith(`/api/v1/ate_foods/${ateFood.id}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.destroyAteFood({ commit }, ateFood)
      expect(commit).toHaveBeenCalledWith('destroyAteFood', ateFood.id)
    })
  })
})
