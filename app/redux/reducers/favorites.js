import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  isLoaded: false,
  items: Immutable([]),
}

const match = (x) => ({mangaid}) => mangaid !== x

export default createReducer({
  ['ADD_MY_LIST_ITEM']: (state, { payload }) => ({
    ...state,
    items: state.items
    .filter(match(payload.mangaid))
    .concat(payload),
  }),
  ['REMOVE_MY_LIST_ITEM']: (state, { payload }) => ({
    ...state,
    items: state.items.filter(match(payload.mangaid)),
  }),
  ['LOAD_STORAGE']: (state, { payload }) => ({
    isLoaded: true,
    items: payload.favorites ? Immutable(payload.favorites) : state.items,
  }),
}, initialState)
