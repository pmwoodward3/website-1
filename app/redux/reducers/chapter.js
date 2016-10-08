import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  fullscreen: false,
  offset: {
    x: 0,
    y: 0,
  },
  scale: 1,
  items: Immutable([]),
  loadedPage: false,
}

export default createReducer({
  ['GET_CHAPTER_REQUEST']: (state) => ({
    ...initialState,
    fullscreen: state.fullscreen,
  }),
  ['GET_CHAPTER_SUCCESS']: (state, { payload }) => ({
    ...state,
    fullscreen: false,
    items: Immutable(payload.pages),
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
  ['SET_OFFSET_CHAPTER']: (state, {payload}) => ({
    ...state,
    scale: payload,
  }),
  ['SET_SCALE_CHAPTER']: (state, {payload}) => ({
    ...state,
    scale: payload,
  }),
  ['LOAD_PAGE_CHAPTER']: (state, {payload}) => ({
    ...state,
    loadedPage: payload,
  }),
}, initialState)
