import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  fullscreen: false,
  items: Immutable([]),
}

export default createReducer({
  ['GET_CHAPTER_REQUEST']: (state) => ({
    ...state,
    items: initialState.items,
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
}, initialState)
