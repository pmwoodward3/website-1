import { MAIN_SOURCE } from 'constants'
import { createReducer } from '../utils/createReducer'

const initialState = {
  details: {},
  sources: [],
  chapters: [],
  fullCoverAvailable: false,
  source: MAIN_SOURCE,
  isLoading: true,
}

export default createReducer({
  ['GET_MANGA_REQUEST']: () => initialState,
  ['GET_MANGA_SUCCESS']: (state, { payload }) => ({
    ...state,
    ...payload,
    isLoading: false,
  }),
  ['GET_MANGA_FAILURE']: (state, { payload }) => initialState,
  ['FULL_COVER_LOAD_SUCCESS']: (state, { payload }) => (payload.mangaid == state.details.mangaid || state == initialState) ? ({
    ...state,
    fullCoverAvailable: true,
  }) : state,
  ['FULL_COVER_LOAD_FAILURE']: (state, { payload }) => payload.mangaid == state.details.mangaid ? ({
    ...state,
    fullCoverAvailable: false,
  }) : state,
}, initialState)
