import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_READING_HISTORY']: (state, { payload }) => ({
    ...state,
    items: [
      payload,
      ...state.items.filter(({mangaid}) => mangaid !== payload.mangaid),
    ],
  }),
  ['LOAD_STORAGE']: (state, { payload }) => payload.readingHistory ? payload.readingHistory : state,
}, initialState)
