import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  query: '',
  totalPages: 0,
  rows: Immutable([]),
  showSearchField: false,
  isLoading: false,
}

const toFormat = (payload) =>
payload.hits.map(({mangaid, score}) => ({
  mangaid,
  score,
}))

export default createReducer({
  ['SEARCH_ITEMS_REQUEST']: (state, { payload }) => payload.page == 1 ? ({
    ...initialState,
    query: state.query,
    showSearchField: true,
    isLoading: true,
  }) : state,
  ['SEARCH_ITEMS_SUCCESS']: (state, { payload }) => ({
    ...state,
    rows: state.rows.set(payload.page - 1, toFormat(payload)),
    totalPages: payload.totalPages,
    showSearchField: true,
    isLoading: false,
  }),
  ['SEARCH_ITEMS_FAILURE']: () => ({
    ...initialState,
    isLoading: false,
  }),
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
