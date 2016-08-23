import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_MY_LIST_ITEM']: (state, { payload }) => ({
    items: [
      ...state.items,
      payload,
    ]
  }),
}, initialState)
