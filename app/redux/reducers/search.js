import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['SEARCH_ITEMS_SUCCESS']: (state, { payload }) => ({
    items: payload.hits,
  }),

  ['SEARCH_ITEMS_FAILURE']: (state, { payload, error }) =>
  console.error('error', error),
}, initialState);
