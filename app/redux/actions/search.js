export const searchItems = (query, page=1, genres) => ({
  mode: 'GET',
  type: 'SEARCH_ITEMS',
  url: `search/${query}`,
  data: {
    page,
    genres,
    length: 25,
  }
})
