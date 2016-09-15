import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  items: Immutable([]),
}

const toFormat = (payload) =>
payload.releases.map(({mangaid, chapter}) => ({
  mangaid,
  chapter,
}))

export default createReducer({
  ['GET_RELEASES_SUCCESS']: (state, { payload }) => ({
    items: Immutable(toFormat(payload)),
  }),
}, initialState)
