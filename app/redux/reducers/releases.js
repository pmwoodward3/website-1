import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

const toFormat = (payload) =>
payload.releases.map(({mangaid, chapter}) => ({
  mangaid,
  chapter,
}))

export default createReducer({
  ['GET_RELEASES_SUCCESS']: (state, { payload }) => ({
    items: toFormat(payload),
  }),
}, initialState);
