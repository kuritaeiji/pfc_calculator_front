import getFoods from '~/middleware/getFoods'

describe('middleware/getFoods', () => {
  it('ストアにgetFoodsをdispatchする', () => {
    const store = { dispatch: jest.fn() }
    getFoods({ store })
    expect(store.dispatch).toHaveBeenCalledWith('food/getFoods')
  })
})
