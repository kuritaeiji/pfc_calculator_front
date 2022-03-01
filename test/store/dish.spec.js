import { getters, mutations, actions } from '~/store/dish'

const defaultDishes = [
  { id: 1, title: '1', calory: 100, protein: 100, fat: 10, carbonhydrate: 1, day: { id: 1, date: '2020-02-02' } },
  { id: 2, title: '2', calory: 100, protein: 100, fat: 10, carbonhydrate: 1, day: { id: 1, date: '2020-02-02' } }
]

describe('getters', () => {
  it('dishes', () => {
    const result = getters.dishes({ dishes: defaultDishes })
    expect(result).toEqual(defaultDishes)
  })
})

describe('mutations', () => {
  let state
  beforeEach(() => {
    state = {
      dishes: [...defaultDishes]
    }
  })

  it('setDishes', () => {
    const dishes = [defaultDishes[1], defaultDishes[0]]
    mutations.setDishes(state, dishes)
    expect(state.dishes).toEqual(dishes)
  })

  it('createDish', () => {
    const dish = { id: 3, title: '3' }
    mutations.createDish(state, dish)
    expect(state.dishes[2]).toEqual(dish)
  })

  it('updateDish', () => {
    const dish = { id: 1, title: 'new_title' }
    mutations.updateDish(state, dish)
    expect(state.dishes[0]).toEqual(dish)
  })

  it('destroyDish', () => {
    mutations.destroyDish(state, 1)
    expect(state.dishes.length).toEqual(1)
    expect(state.dishes[0].id).toEqual(2)
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
      return { dishes: defaultDishes }
    },
    $post () {
      return { dish: defaultDishes[0] }
    },
    $put () {
      return { dish: defaultDishes[0] }
    },
    $delete () {}
  }
  let commit
  beforeEach(() => {
    commit = jest.fn()
  })

  describe('getDishes', () => {
    const date = '2020-02-02'
    it('axiosは/api/v1/days/:days_date/dishesに$getする', () => {
      actions.$axios = mockAxios
      actions.getDishes({ commit }, date)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/days/${date}/dishes`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDishes({ commit }, date)
      expect(commit).toHaveBeenCalledWith('setDishes', defaultDishes)
    })
  })

  describe('createDish', () => {
    const params = { dish: { title: '3', day: { date: '2020-02-02' } } }
    it('axiosは/api/v1/days/:days_date/dishesに$postする', () => {
      actions.$axios = mockAxios
      actions.createDish({ commit }, params)
      expect(mockAxios.$post).toHaveBeenCalledWith(`/api/v1/days/${params.dish.day.date}/dishes`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.createDish({ commit }, params)
      expect(commit).toHaveBeenCalledWith('createDish', defaultDishes[0])
    })
  })

  describe('updateDish', () => {
    const params = { dish: { id: 3, title: '3' } }

    it('axiosは/api/v1/dishes/:idに$putする', () => {
      actions.$axios = mockAxios
      actions.updateDish({ commit }, params)
      expect(mockAxios.$put).toHaveBeenCalledWith(`/api/v1/dishes/${params.dish.id}`, params)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.updateDish({ commit }, params)
      expect(commit).toHaveBeenCalledWith('updateDish', defaultDishes[0])
    })
  })

  describe('destroyDishes', () => {
    const dish = { id: 1 }

    it('axiosは/api/v1/dishes/:idに$deleteする', () => {
      actions.$axios = mockAxios
      actions.destroyDish({ commit }, dish)
      expect(mockAxios.$delete).toHaveBeenCalledWith(`/api/v1/dishes/${dish.id}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.destroyDish({ commit }, dish)
      expect(commit).toHaveBeenCalledWith('destroyDish', dish.id)
    })
  })
})
