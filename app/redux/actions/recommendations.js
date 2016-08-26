export const getRecommendations = (ids) => ({
  mode: 'GET',
  type: 'GET_RECOMMENDATIONS',
  url: `recommendations/${ids.join('\ ')}`,
})
