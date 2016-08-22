export const getManga = (mangaid, source) => ({
  mode: 'GET',
  type: 'GET_MANGA',
  url: `manga/${mangaid}`,
  data: source && {
    source,
  }
})
