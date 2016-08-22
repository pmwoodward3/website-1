import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['GET_RELEASES_SUCCESS']: (state, { payload }) => ({
    items: payload.releases,
  }),

  ['GET_RELEASES_FAILURE']: (state, { payload, error }) =>
    console.error('error', error),
}, initialState);
