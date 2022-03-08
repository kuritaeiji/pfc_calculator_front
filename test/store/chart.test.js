import { getters, mutations, actions } from '~/store/chart'

const data = [0, 0, '30.0', '30.0']
const formattedData = [0, 0, 30, 30]

describe('getters', () => {
  it('dateWeightData', () => {
    const result = getters.dateWeightData({ dateWeightData: data })
    expect(result).toEqual(data)
  })

  it('datePercentageData', () => {
    const result = getters.datePercentageData({ datePercentageData: data })
    expect(result).toEqual(data)
  })

  it('monthWeightData', () => {
    const result = getters.monthWeightData({ monthWeightData: data })
    expect(result).toEqual(data)
  })

  it('monthPercentageData', () => {
    const result = getters.monthPercentageData({ monthPercentageData: data })
    expect(result).toEqual(data)
  })
})

describe('mutations', () => {
  const _state = () => ({
    dateWeightData: [],
    datePercentageData: [],
    monthWeightData: [],
    monthPercentageData: []
  })

  let state
  beforeEach(() => {
    state = _state()
  })

  it('setDateWeightData', () => {
    mutations.setDateWeightData(state, data)
    expect(state.dateWeightData).toEqual(data)
  })

  it('setDatePercentageData', () => {
    mutations.setDatePercentageData(state, data)
    expect(state.datePercentageData).toEqual(data)
  })

  it('setMonthWeightData', () => {
    mutations.setMonthWeightData(state, data)
    expect(state.monthWeightData).toEqual(data)
  })

  it('setMonthPercentageData', () => {
    mutations.setMonthPercentageData(state, data)
    expect(state.monthPercentageData).toEqual(data)
  })
})

describe('actions', () => {
  let mockAxios
  let commit
  beforeEach(() => {
    mockAxios = {
      $get: jest.fn()
    }
    commit = jest.fn()
  })
  const stubAxios = {
    $get () {
      return {
        chart: data
      }
    }
  }
  const endDate = '2020-01-01'
  const endMonth = '2020-01'

  describe('getDateWeightData', () => {
    it('axiosは/api/v1/charts/date_weightパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getDateWeightData({ commit }, endDate)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/date_weight?date=${endDate}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDateWeightData({ commit }, endDate)
      expect(commit).toHaveBeenCalledWith('setDateWeightData', formattedData)
    })
  })

  describe('getDatePercentageData', () => {
    it('axiosは/api/v1/charts/date_percentageパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getDatePercentageData({ commit }, endDate)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/date_percentage?date=${endDate}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDatePercentageData({ commit }, endDate)
      expect(commit).toHaveBeenCalledWith('setDatePercentageData', formattedData)
    })
  })

  describe('getMonthWeightData', () => {
    it('axiosは/api/v1/charts/month_weightパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthWeightData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_weight?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthWeightData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthWeightData', formattedData)
    })
  })

  describe('getMonthPercentagetData', () => {
    it('axiosは/api/v1/charts/month_percentageパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthPercentageData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_percentage?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthPercentageData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthPercentageData', formattedData)
    })
  })
})
