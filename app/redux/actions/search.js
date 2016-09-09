export const searchItems = (query, page=1, length=7, genres) => ({
  mode: 'GET',
  type: 'SEARCH_ITEMS',
  url: `search/${query}`,
  data: {
    page,
    genres,
    length,
  },
})

export const changeSearchQuery = (payload) => ({
  type: 'CHANGE_SEARCH_QUERY',
  payload, //String query
})

export const hideSearchField = (payload) => ({
  type: 'HIDE_SEARCH_FIELD',
  payload, //Number height
})

export const showSearchField = (payload) => ({
  type: 'SHOW_SEARCH_FIELD',
  payload, //Number height
})
