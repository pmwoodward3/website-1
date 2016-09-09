import { createReducer } from '../utils/createReducer'

const initialState = {
  fullscreen: false,
  items: [],
}

export default createReducer({
  ['GET_CHAPTER_REQUEST']: (state) => ({
    ...state,
    items: [],
  }),
  ['GET_CHAPTER_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: payload.pages,
  }),
  ['GET_CHAPTER_FAILURE']: () => initialState,
  ['ENTER_FULLSCREEN_CHAPTER']: (state) => ({
    ...state,
    fullscreen: true,
  }),
  ['EXIT_FULLSCREEN_CHAPTER']: (state) => ({
    ...state,
    fullscreen: false,
  }),

}, initialState)
