import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_MY_LIST_ITEM']: (state, { payload }) => {
    return {
      ...state,
      items: [
        payload,
        ...state.items.filter(({mangaid}) => mangaid !== payload.mangaid),
      ],
    }
  },
}, initialState)
