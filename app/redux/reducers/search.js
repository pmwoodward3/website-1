import { createReducer } from '../utils/createReducer';

const initialState = {
  query: '',
  totalPages: 0,
  rows: [],
  containerHeight: 10,
}

const toFormat = (payload) =>
payload.hits.map(({mangaid, score}) => ({
  mangaid,
  score,
}))

export default createReducer({
  ['SEARCH_ITEMS_SUCCESS']: (state, { payload }) => {
    const rows = state.rows.slice(0)
    rows[payload.page - 1] = toFormat(payload)

    return {
      ...state,
      rows,
      totalPages: payload.totalPages,
    }
  },

  ['SEARCH_ITEMS_FAILURE']: (state, { payload, error }) => initialState,

  ['CHANGE_SEARCH_QUERY']: (state, { payload, error }) => payload !== state.query ? ({
    ...initialState,
    containerHeight: state.containerHeight,
    query: payload,
  }) : state,
  ['CHANGE_CONTAINER_HEIGHT']: (state, { payload, error }) => ({
    ...state,
    containerHeight: payload,
  }),
}, initialState)
