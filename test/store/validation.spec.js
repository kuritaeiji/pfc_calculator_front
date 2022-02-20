import { getters, mutations, actions } from '~/store/validation'

const validation = {
  isShow: false,
  messages: []
}

describe('getters', () => {
  it('validation', () => {
    const result = getters.validation({ validation })
    expect(result).toEqual(validation)
  })
})

describe('mutations', () => {
  const _state = () => ({
    validation: { ...validation }
  })

  let state
  beforeEach(() => {
    state = _state
  })

  it('setValidation', () => {
    const newValidation = { isShow: true, messages: ['message'] }
    mutations.setValidation(state, newValidation)
    expect(state.validation).toEqual(newValidation)
  })

  it('resetValidation', () => {
    state.validation = { isShow: true, messages: ['message'] }
    mutations.resetValidation(state)
    expect(state.validation).toEqual(validation)
  })
})

describe('actions', () => {
  const commit = jest.fn()

  it('setValidation', () => {
    const newValidation = { isShow: true, messages: ['message'] }
    actions.setValidation({ commit }, newValidation.messages)
    expect(commit).toHaveBeenCalledWith('setValidation', newValidation)
  })

  it('resetValidation', () => {
    actions.resetValidation({ commit })
    expect(commit).toHaveBeenCalled()
  })
})
