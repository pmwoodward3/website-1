import { createReducer } from '../utils/createReducer'

const initialState = {
  query: '',
  totalPages: 0,
  rows: [],
  containerHeight: 10,
  showSearchField: false,
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
      showSearchField: true,
    }
  },

  ['SEARCH_ITEMS_FAILURE']: (state) => initialState,

  ['CHANGE_SEARCH_QUERY']: (state, { payload }) => payload !== state.query ? ({
    ...initialState,
    containerHeight: state.containerHeight,
    query: payload,
    showSearchField: true,
  }) : state,
  ['CHANGE_CONTAINER_HEIGHT']: (state, { payload }) => ({
    ...state,
    containerHeight: payload,
    showSearchField: true,
  }),
  ['HIDE_SEARCH_FIELD']: (state) => ({
    ...state,
    showSearchField: false,
  }),
}, initialState)
