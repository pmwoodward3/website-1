import { createReducer } from '../utils/createReducer'
import { indexBy, prop, isArrayLike } from 'ramda'
import Immutable from 'seamless-immutable'

const initialState = {
  items: Immutable({}),
}

const formatPayload = (payload) => {
  let items = isArrayLike(payload) ? payload : [payload]

  items = items.map(({mangaid, title, cover}) => ({
    mangaid,
    title,
    cover,
  }))

  items = indexBy(prop('mangaid'), items)

  return items
}

const reducer = (key) => (state, { payload }) => ({
  ...state,
  items: state.items
  .merge(formatPayload(key ? payload[key] : payload)),
})

export default createReducer({
  ['GET_ITEMS_SUCCESS']: reducer(),
  ['GET_RELEASES_SUCCESS']: reducer('releases'),
  ['SEARCH_ITEMS_SUCCESS']: reducer('hits'),
  ['GET_LIST_SUCCESS']: reducer('items'),
  ['GET_MANGA_SUCCESS']: reducer('details'),
  ['GET_RECOMMENDATIONS_SUCCESS']: reducer('items'),
}, initialState)
