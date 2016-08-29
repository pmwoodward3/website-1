export const searchItems = (query, page=1, genres) => ({
  mode: 'GET',
  type: 'SEARCH_ITEMS',
  url: `search/${query}`,
  data: {
    page,
    genres,
    length: 2,
  }
})

export const changeSearchQuery = (payload) => ({
  type: 'CHANGE_SEARCH_QUERY',
  payload, //String query
})

export const changeContainerHeight = (payload) => ({
  type: 'CHANGE_CONTAINER_HEIGHT',
  payload, //Number height
})
