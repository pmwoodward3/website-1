import { createReducer } from '../utils/createReducer';

const initialState = {
  totalPages: 0,
  page: 0,
  length: 0,
  items: [],
}

export default createReducer({
  ['SEARCH_ITEMS_SUCCESS']: (state, { payload }) => ({
    items: payload.hits,
    totalPages: payload.totalPages,
    page: payload.page,
    length: payload.length,
  }),

  ['SEARCH_ITEMS_FAILURE']: (state, { payload, error }) =>
  console.error('error', error),
}, initialState);
