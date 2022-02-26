import createDate from '~/middleware/createDate'

describe('middleware/createDate', () => {
  it('axiosは/api/v1/daysに$postする', () => {
    const mockAxios = { $post: jest.fn() }
    const params = { date: '2022-01-01' }
    createDate({ $axios: mockAxios, params })
    expect(mockAxios.$post).toHaveBeenCalledWith('/api/v1/days', { day: params })
  })
})
