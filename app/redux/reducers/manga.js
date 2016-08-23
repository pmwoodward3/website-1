import { createReducer } from '../utils/createReducer';

const initialState = {
  details: {},
  sources: {},
  chapters: [],
  source: 'mangaeden',
}

export default createReducer({
  ['GET_MANGA_SUCCESS']: (state, { payload }) => payload,
  ['GET_MANGA_FAILURE']: (state, { payload }) => initialState,
}, initialState);
