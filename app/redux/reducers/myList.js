import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_MY_LIST_ITEM']: (state, { payload }) => ({
    ...state,
    items: [
      payload,
      ...state.items.filter(({mangaid}) => mangaid !== payload.mangaid),
    ],
  }),
  ['LOAD_STORAGE_SUCCESS']: (state, { payload }) => payload.myList ? payload.myList : state,
}, initialState)
