import prepareDaysPage from '~/middleware/prepareDaysPage'

describe('middleware/prepareDaysPage', () => {
  const params = { date: '2022-01-01' }
  const mockStore = { dispatch: jest.fn() }

  it('storeはcreateDayをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('day/createDay', { day: { date: params.date } })
  })

  it('storeはcreateBodyをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('body/createBody', params.date)
  })

  it('storeはgetAteFoodsをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('ateFood/getAteFoods', params.date)
  })

  it('storeはgetCategoriesをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('category/getCategories')
  })

  it('storeはgetFoodsをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('food/getFoods')
  })

  it('storeはgetDishesをdispatchする', async () => {
    await prepareDaysPage({ params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('dish/getDishes', params.date)
  })
})
