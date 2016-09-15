import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  isLoaded: false,
  items: Immutable([]),
}

export default createReducer({
  ['ADD_READING_HISTORY']: (state, { payload }) => ({
    ...state,
    items: state.items
    .filter(({mangaid}) => mangaid !== payload.mangaid)
    .concat(payload),
  }),
  ['LOAD_STORAGE']: (state, { payload }) => ({
    isLoaded: true,
    items: payload.readingHistory ? Immutable(payload.readingHistory) : state.items,
  }),
}, initialState)
