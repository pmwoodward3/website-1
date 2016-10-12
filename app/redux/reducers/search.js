import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  query: '',
  totalPages: 0,
  rows: Immutable([]),
  showSearchField: false,
}

const toFormat = (payload) =>
payload.hits.map(({mangaid, score}) => ({
  mangaid,
  score,
}))

export default createReducer({
  ['SEARCH_ITEMS_SUCCESS']: (state, { payload }) => ({
    ...state,
    rows: state.rows.set(payload.page - 1, toFormat(payload)),
    totalPages: payload.totalPages,
    showSearchField: true,
  }),

  ['SEARCH_ITEMS_FAILURE']: () => initialState,

  ['CHANGE_SEARCH_QUERY']: (state, { payload }) => payload !== state.query ? ({
    ...state,
    query: payload,
    showSearchField: true,
  }) : state,
  ['HIDE_SEARCH_FIELD']: (state) => ({
    ...state,
    showSearchField: false,
  }),
  ['SHOW_SEARCH_FIELD']: (state) => ({
    ...state,
    showSearchField: true,
  }),
}, initialState)
