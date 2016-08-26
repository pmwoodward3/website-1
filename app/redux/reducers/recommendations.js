import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

const toFormat = (payload) =>
payload.items.map(({mangaid, score}) => ({
  mangaid,
  score,
}))

export default createReducer({
  ['GET_RECOMMENDATIONS_SUCCESS']: (state, { payload }) => ({
    ...state,
    items: toFormat(payload),
  }),
}, initialState)
