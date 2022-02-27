import prepareDaysPage from '~/middleware/prepareDaysPage'

describe('middleware/prepareDaysPage', () => {
  it('axiosは/api/v1/daysに$postする', () => {
    const mockAxios = { $post: jest.fn() }
    const params = { date: '2022-01-01' }
    prepareDaysPage({ $axios: mockAxios, params })
    expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/days', { day: params })
  })
})
