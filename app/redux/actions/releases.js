export const getReleases = (length) => ({
  mode: 'GET',
  type: 'GET_RELEASES',
  url: 'releases',
  data: {
    length,
  },
})
