import prepareDaysPage from '~/middleware/prepareDaysPage'

describe('middleware/prepareDaysPage', () => {
  const mockAxios = { $post: jest.fn() }
  const params = { date: '2022-01-01' }
  const mockStore = { dispatch: jest.fn() }

  it('axiosは/api/v1/daysに$postする', () => {
    prepareDaysPage({ $axios: mockAxios, params })
    expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/days', { day: params })
  })

  it('storeはcreateBodyをdispatchする', async () => {
    await prepareDaysPage({ $axios: mockAxios, params, store: mockStore })
    expect(mockStore.dispatch).toHaveBeenCalledWith('body/createBody', params.date)
  })
})
