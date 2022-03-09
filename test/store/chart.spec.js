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

  it('dateCaloryData', () => {
    const result = getters.dateCaloryData({ dateCaloryData: data })
    expect(result).toEqual(data)
  })

  it('dateProteinData', () => {
    const result = getters.dateProteinData({ dateProteinData: data })
    expect(result).toEqual(data)
  })

  it('dateFatData', () => {
    const result = getters.dateFatData({ dateFatData: data })
    expect(result).toEqual(data)
  })

  it('dateCarbonhydrateData', () => {
    const result = getters.dateCarbonhydrateData({ dateCarbonhydrateData: data })
    expect(result).toEqual(data)
  })

  it('monthCaloryData', () => {
    const result = getters.monthCaloryData({ monthCaloryData: data })
    expect(result).toEqual(data)
  })

  it('monthProteinData', () => {
    const result = getters.monthProteinData({ monthProteinData: data })
    expect(result).toEqual(data)
  })

  it('monthFatData', () => {
    const result = getters.monthFatData({ monthFatData: data })
    expect(result).toEqual(data)
  })

  it('monthCarbonhydrateData', () => {
    const result = getters.monthCarbonhydrateData({ monthCarbonhydrateData: data })
    expect(result).toEqual(data)
  })
})

describe('mutations', () => {
  const _state = () => ({
    dateWeightData: [],
    datePercentageData: [],
    monthWeightData: [],
    monthPercentageData: [],
    dateCaloryData: [],
    dateProteinData: [],
    dateFatData: [],
    dateCarbonhydrateData: [],
    monthCaloryData: [],
    monthProteinData: [],
    monthFatData: [],
    monthCarbonhydrateData: []
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

  it('setDateCaloryData', () => {
    mutations.setDateCaloryData(state, data)
    expect(state.dateCaloryData).toEqual(data)
  })

  it('setDateProteinData', () => {
    mutations.setDateProteinData(state, data)
    expect(state.dateProteinData).toEqual(data)
  })

  it('setDateFatData', () => {
    mutations.setDateFatData(state, data)
    expect(state.dateFatData).toEqual(data)
  })

  it('setDateCarbonhydrateData', () => {
    mutations.setDateCarbonhydrateData(state, data)
    expect(state.dateCarbonhydrateData).toEqual(data)
  })

  it('setMonthCaloryData', () => {
    mutations.setMonthCaloryData(state, data)
    expect(state.monthCaloryData).toEqual(data)
  })

  it('setMonthProteinData', () => {
    mutations.setMonthProteinData(state, data)
    expect(state.monthProteinData).toEqual(data)
  })

  it('setMonthFatData', () => {
    mutations.setMonthFatData(state, data)
    expect(state.monthFatData).toEqual(data)
  })

  it('setMonthCarbonhydrateData', () => {
    mutations.setMonthCarbonhydrateData(state, data)
    expect(state.monthCarbonhydrateData).toEqual(data)
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

  describe('getDateCaloryData', () => {
    it('axiosは/api/v1/charts/date_caloryパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getDateCaloryData({ commit }, endDate)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/date_calory?date=${endDate}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDateCaloryData({ commit }, endDate)
      expect(commit).toHaveBeenCalledWith('setDateCaloryData', formattedData)
    })
  })

  describe('getDateProteinData', () => {
    it('axiosは/api/v1/charts/date_proteinパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getDateProteinData({ commit }, endDate)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/date_protein?date=${endDate}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDateProteinData({ commit }, endDate)
      expect(commit).toHaveBeenCalledWith('setDateProteinData', formattedData)
    })
  })

  describe('getDateFatData', () => {
    it('axiosは/api/v1/charts/date_fatパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getDateFatData({ commit }, endDate)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/date_fat?date=${endDate}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getDateFatData({ commit }, endDate)
      expect(commit).toHaveBeenCalledWith('setDateFatData', formattedData)
    })
  })

  describe('getMonthCaloryData', () => {
    it('axiosは/api/v1/charts/month_caloryパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthCaloryData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_calory?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthCaloryData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthCaloryData', formattedData)
    })
  })

  describe('getMonthProteinData', () => {
    it('axiosは/api/v1/charts/month_proteinパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthProteinData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_protein?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthProteinData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthProteinData', formattedData)
    })
  })

  describe('getMonthFatData', () => {
    it('axiosは/api/v1/charts/month_fatパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthFatData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_fat?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthFatData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthFatData', formattedData)
    })
  })

  describe('getMonthCarbonhydrateData', () => {
    it('axiosは/api/v1/charts/month_carbonhydrateパスに$getする', () => {
      actions.$axios = mockAxios
      actions.getMonthCarbonhydrateData({ commit }, endMonth)
      expect(mockAxios.$get).toHaveBeenCalledWith(`/api/v1/charts/month_carbonhydrate?month=${endMonth}`)
    })

    it('commit', async () => {
      actions.$axios = stubAxios
      await actions.getMonthCarbonhydrateData({ commit }, endMonth)
      expect(commit).toHaveBeenCalledWith('setMonthCarbonhydrateData', formattedData)
    })
  })
})
