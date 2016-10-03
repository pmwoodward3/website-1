import { MAIN_SOURCE } from 'constants'
import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  details: {},
  sources: Immutable([]),
  chapters: Immutable([]),
  source: MAIN_SOURCE,
  isLoading: true,
}

export default createReducer({
  ['GET_MANGA_REQUEST']: (state, {payload}) => payload.mangaid == state.details.mangaid ? state : initialState,
  ['GET_MANGA_SUCCESS']: (state, { payload }) => ({
    ...state,
    ...payload,
    sources: Immutable(payload.sources),
    chapters: Immutable(payload.chapters),
    isLoading: false,
  }),
  ['GET_MANGA_FAILURE']: () => initialState,
}, initialState)
