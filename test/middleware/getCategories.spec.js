import getCategories from '~/middleware/getCategories'

describe('getCategories', () => {
  it('vuexのgetCategoriesアクションを呼び出し、カテゴリー一覧を取得', () => {
    const store = { dispatch: jest.fn() }
    getCategories({ store })
    expect(store.dispatch).toHaveBeenCalledWith('category/getCategories')
  })
})
