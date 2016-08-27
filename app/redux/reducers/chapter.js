import { createReducer } from '../utils/createReducer';

const initialState = {
  fullscreen: false,
  items: [],
}

export default createReducer({
  ['GET_CHAPTER_REQUEST']: (state, { payload }) => ({
    ...state,
    items: [],
  }),
  ['GET_CHAPTER_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: payload.pages,
  }),
  ['GET_CHAPTER_FAILURE']: (state, { payload, error }) => initialState,
  ['ENTER_FULLSCREEN_CHAPTER']: (state, { payload, error }) => ({
    ...state,
    fullscreen: true,
  }),
  ['EXIT_FULLSCREEN_CHAPTER']: (state, { payload, error }) => ({
    ...state,
    fullscreen: false,
  }),

}, initialState);
