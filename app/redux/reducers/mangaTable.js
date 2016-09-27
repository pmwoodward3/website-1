import { createReducer } from '../utils/createReducer'
import { indexBy, prop, isArrayLike } from 'ramda'
import Immutable from 'seamless-immutable'

const initialState = {
  isLoaded: false,
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

const mergeStorage = (state, { payload }) => ({
  isLoaded: true,
  items: payload.mangaTable ? state.items.merge(payload.mangaTable) : state.items,
})

export default createReducer({
  ['GET_ITEMS_SUCCESS']: reducer(),
  ['GET_RELEASES_SUCCESS']: reducer('releases'),
  ['SEARCH_ITEMS_SUCCESS']: reducer('hits'),
  ['GET_LIST_SUCCESS']: reducer('items'),
  ['GET_MANGA_SUCCESS']: reducer('details'),
  ['GET_RECOMMENDATIONS_SUCCESS']: reducer('items'),
  ['GET_POPULAR_SUCCESS']: reducer('hits'),
  ['LOAD_STORAGE']: mergeStorage,
}, initialState)
