export const searchItems = (query, genres) => ({
  mode: 'GET',
  type: 'SEARCH_ITEMS',
  url: `search/${query}`,
  data: genres && {
    genres,
  }
})
