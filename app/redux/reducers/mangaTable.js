import { createReducer } from '../utils/createReducer';
import R from 'ramda'

const initialState = {
  items: {},
}

const formatPayload = (payload) => {
  let items = R.isArrayLike(payload) ? payload : [payload]

  items = items.map(({mangaid, title, cover}) => ({
    mangaid,
    title,
    cover,
  }))

  items = R.indexBy(R.prop('mangaid'), items)

  return items
}

const reducer = (key) => (state, { payload }) => ({
  ...state,
  items: {
    ...state.items,
    ...formatPayload(key ? payload[key] : payload),
  },
})

export default createReducer({
  ['GET_ITEMS_SUCCESS']: reducer(),
  ['GET_RELEASES_SUCCESS']: reducer('releases'),
  ['SEARCH_ITEMS_SUCCESS']: reducer('hits'),
  ['GET_LIST_SUCCESS']: reducer('items'),
  ['GET_MANGA_SUCCESS']: reducer('details'),
  ['GET_RECOMMENDATIONS_SUCCESS']: reducer('items'),
}, initialState)
