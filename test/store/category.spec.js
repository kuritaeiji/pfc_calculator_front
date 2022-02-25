import { getters, mutations, actions } from '~/store/category'

const defaultCategories = [
  { id: 1, title: '1' },
  { id: 2, title: '2' }
]

describe('getters', () => {
  it('categories', () => {
    const result = getters.categories({ categories: defaultCategories })
    expect(result).toEqual(defaultCategories)
  })
})

describe('mutations', () => {
  const _state = () => ({
    categories: [...defaultCategories]
  })

  let state
  beforeEach(() => {
    state = _state()
  })

  it('setCategories', () => {
    const newCategories = [{ id: 3, title: 'newCategories' }]
    mutations.setCategories(state, newCategories)
    expect(state.categories).toEqual(newCategories)
  })

  it('createCategory', () => {
    const newCategory = { id: 3, title: 'newCategory' }
    mutations.createCategory(state, newCategory)
    expect(state.categories).toEqual([...defaultCategories, newCategory])
  })

  it('updateCategory', () => {
    const updatedCategory = { id: 1, title: 'udpatedCategory' }
    mutations.updateCategory(state, updatedCategory)
    expect(state.categories[0]).toEqual(updatedCategory)
  })

  it('destroyCategory', () => {
    const id = defaultCategories[0].id
    mutations.destroyCategory(state, id)
    expect(state.categories).toEqual([defaultCategories[1]])
  })
})

describe('actions', () => {
  const commit = jest.fn()
  const mockAxios = {
    $get: jest.fn(),
    $post: jest.fn(),
    $put: jest.fn(),
    $delete: jest.fn()
  }
  const stubAxios = {
    $get () {
      return new Promise(resolve => resolve({ categories: defaultCategories }))
    },
    $post () {
      return new Promise(resolve => resolve({ category: defaultCategories[0] }))
    },
    $put () {
      return new Promise(resolve => resolve({ category: defaultCategories[0] }))
    },
    $delete () {}
  }

  describe('getCategories', () => {
    it('axiosは/api/v1/categoriesパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getCategories({ commit })
      expect(mockAxios.$get).toHaveBeenCalledWith('/api/v1/categories')
    })

    it('apiから返されたカテゴリーをcommitする', async () => {
      actions.$axios = stubAxios
      await actions.getCategories({ commit })
      expect(commit).toHaveBeenCalledWith('setCategories', defaultCategories)
    })
  })

  describe('createCategory', () => {
    const params = { category: defaultCategories[0] }

    it('axiosは/api/v1/categoriesパスに$postする', () => {
      actions.$axios = mockAxios
      actions.createCategory({ commit }, params)
      expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/categories', params)
    })

    it('apiから返されたカテゴリーをコミットする', async () => {
      actions.$axios = stubAxios
      await actions.createCategory({ commit }, params)
      expect(commit).toHaveBeenCalledWith('createCategory', params.category)
    })
  })

  describe('updateCategory', () => {
    const params = { category: defaultCategories[0] }

    it('axiosは/api/v1/categories/:idパスに$putする', () => {
      actions.$axios = mockAxios
      actions.updateCategory({ commit }, params)
      expect(mockAxios.$put).toHaveBeenCalledWith(`/api/v1/categories/${params.category.id}`, params)
    })

    it('apiから返されたカテゴリーをコミットする', async () => {
      actions.$axios = stubAxios
      await actions.updateCategory({ commit }, params)
      expect(commit).toHaveBeenCalledWith('updateCategory', params.category)
    })
  })

  describe('destroyCategory', () => {
    const destroyedCategory = defaultCategories[0]

    it('axiosは/api/v1/categories/:idパスに$deleteする', () => {
      actions.$axios = mockAxios
      actions.destroyCategory({ commit }, destroyedCategory)
      expect(mockAxios.$delete).toHaveBeenCalledWith(`/api/v1/categories/${destroyedCategory.id}`)
    })

    it('カテゴリーIDをコミットする', () => {
      actions.$axios = stubAxios
      actions.destroyCategory({ commit }, destroyedCategory)
      expect(commit).toHaveBeenCalledWith('destroyCategory', destroyedCategory.id)
    })
  })
})
