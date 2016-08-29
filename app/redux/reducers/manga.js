import { createReducer } from '../utils/createReducer';

const initialState = {
  details: {},
  sources: {},
  chapters: [],
  fullCoverAvailable: false,
  source: 'mangaeden',
}

export default createReducer({
  ['GET_MANGA_REQUEST']: () => initialState,
  ['GET_MANGA_SUCCESS']: (state, { payload }) => ({
    ...initialState,
    ...payload,
  }),
  ['GET_MANGA_FAILURE']: (state, { payload }) => initialState,
  ['FULL_COVER_LOAD_SUCCESS']: (state, { payload }) => payload.mangaid == state.details.mangaid ? ({
    ...state,
    fullCoverAvailable: true,
  }) : state,
  ['FULL_COVER_LOAD_FAILURE']: (state, { payload }) => payload.mangaid == state.details.mangaid ? ({
    ...state,
    fullCoverAvailable: false,
  }) : state,
}, initialState);
