export const getRecommendations = (ids, length) => ({
  mode: 'GET',
  type: 'GET_RECOMMENDATIONS',
  url: `recommendations/${ids.join('\ ')}`,
  data: {
    length,
  },
})
