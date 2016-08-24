import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_READING_HISTORY']: (state, { payload }) => {
    return {
      ...state,
      items: [
        payload,
        ...state.items.filter(({mangaid}) => mangaid !== payload.mangaid),
      ],
    }
  },
}, initialState)
