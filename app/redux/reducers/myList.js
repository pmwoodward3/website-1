import { createReducer } from '../utils/createReducer';

const initialState = {
  isLoaded: false,
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
  ['REMOVE_MY_LIST_ITEM']: (state, { payload }) => ({
    ...state,
    items: state.items.filter(({mangaid}) => mangaid !== payload.mangaid),
  }),
  ['LOAD_STORAGE']: (state, { payload }) => payload.myList ? ({
    isLoaded: true,
    items: payload.myList,
  }) : state,
}, initialState)
