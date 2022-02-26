import { getters, mutations, actions } from '~/store/food'

const defaultFoods = [
  { id: 1, title: '肉', par: 100, unit: 'g', calory: 100, protein: 100, fat: 10, carbonhydrate: 1, category: { id: 1, title: 'カテゴリー1' } },
  { id: 2, title: '魚', par: 100, unit: 'g', calory: 100, protein: 100, fat: 10, carbonhydrate: 1, category: { id: 2, title: 'カテゴリー2' } }
]

describe('getters', () => {
  it('foods', () => {
    const result = getters.foods({ foods: defaultFoods })
    expect(result).toEqual(defaultFoods)
  })

  it('foodsByCategory', () => {
    const result = getters.foodsByCategory({ foods: defaultFoods })(1)
    expect(result).toEqual([defaultFoods[0]])
  })
})

describe('mutations', () => {
  const _state = () => ({
    foods: [...defaultFoods]
  })

  let state
  beforeEach(() => {
    state = _state()
  })

  it('setFoods', () => {
    const foods = [{ id: 10 }, { id: 11 }]
    mutations.setFoods(state, foods)
    expect(state.foods).toEqual(foods)
  })

  it('createFood', () => {
    const food = { id: 10 }
    mutations.createFood(state, food)
    expect(state.foods).toEqual([...defaultFoods, food])
  })

  it('updateFood', () => {
    const food = { id: 1, title: 'updatedFood' }
    mutations.updateFood(state, food)
    expect(state.foods).toEqual([food, defaultFoods[1]])
  })

  it('destroyFood', () => {
    const id = 1
    mutations.destroyFood(state, id)
    expect(state.foods).toEqual([defaultFoods[1]])
  })
})

describe('actions', () => {
  const mockAxios = {
    $get: jest.fn(),
    $post: jest.fn(),
    $put: jest.fn(),
    $delete: jest.fn()
  }

  const stubAxios = {
    $get () {
      return new Promise(resolve => resolve({ foods: defaultFoods }))
    },
    $post () {
      return new Promise(resolve => resolve({ food: defaultFoods[0] }))
    },
    $put () {
      return new Promise(resolve => resolve({ food: defaultFoods[0] }))
    },
    $delete () {}
  }

  const commit = jest.fn()

  describe('getFoods', () => {
    it('axiosは/api/v1/foodsパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getFoods({ commit })
      expect(mockAxios.$get).toHaveBeenCalledWith('/api/v1/foods')
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getFoods({ commit })
      expect(commit).toHaveBeenCalledWith('setFoods', defaultFoods)
    })
  })

  describe('createFood', () => {
    const params = { food: { title: 'newFood' } }

    it('axiosは/api/v1/foodsパスに$postする', () => {
      actions.$axios = mockAxios
      actions.createFood({ commit }, params)
      expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/foods', params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.createFood({ commit }, params)
      expect(commit).toHaveBeenCalledWith('createFood', defaultFoods[0])
    })
  })

  describe('updateFood', () => {
    const params = { food: { id: 1, title: 'newFood' } }

    it('axiosは/api/v1/foods/:idパスに$putする', () => {
      actions.$axios = mockAxios
      actions.updateFood({ commit }, params)
      expect(mockAxios.$put).toHaveBeenCalledWith(`/api/v1/foods/${params.food.id}`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.updateFood({ commit }, params)
      expect(commit).toHaveBeenCalledWith('updateFood', defaultFoods[0])
    })
  })

  describe('destroyFood', () => {
    const food = { id: 1 }

    it('axiosは/api/v1/foods/:idパスに$deleteする', () => {
      actions.$axios = mockAxios
      actions.destroyFood({ commit }, food)
      expect(mockAxios.$delete).toHaveBeenCalledWith(`/api/v1/foods/${food.id}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.destroyFood({ commit }, food)
      expect(commit).toHaveBeenCalledWith('destroyFood', food.id)
    })
  })
})
