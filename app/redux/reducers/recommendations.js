import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  items: Immutable([]),
}

const toFormat = (payload) =>
payload.items.map(({mangaid, score}) => ({
  mangaid,
  score,
}))

export default createReducer({
  ['GET_RECOMMENDATIONS_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: Immutable(toFormat(payload)),
  }),
}, initialState)
