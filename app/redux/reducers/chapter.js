import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  items: Immutable([]),
}

export default createReducer({
  ['GET_CHAPTER_REQUEST']: (state) => ({
    ...state,
    items: initialState.items,
  }),
  ['GET_CHAPTER_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: Immutable(payload.pages),
  }),
  ['GET_CHAPTER_FAILURE']: () => initialState,

}, initialState)
