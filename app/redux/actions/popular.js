export const getPopular = (length) => ({
  mode: 'GET',
  type: 'GET_POPULAR',
  url: 'popular',
  data: {
    length,
  },
})
