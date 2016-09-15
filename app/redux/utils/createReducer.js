import { propIs } from 'ramda'

export const createReducer = (handlers, initialState) =>
(state = initialState, action = {}) => {
  return propIs(Function, action.type, handlers)
  ? handlers[action.type](state, action)
  : state
}
