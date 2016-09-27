import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  items: Immutable([]),
}

const toFormat = (payload) =>
payload.hits.map(({mangaid, hits}) => ({
  mangaid,
  hits,
}))

export default createReducer({
  ['GET_POPULAR_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: Immutable(toFormat(payload)),
  }),
}, initialState)
