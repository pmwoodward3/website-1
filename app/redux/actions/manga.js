export const getManga = (mangaid, source) => ({
  mode: 'GET',
  type: 'GET_MANGA',
  url: `manga/${mangaid}`,
  data: source && {
    source,
  }
})

export const fullCoverLoadFailure = (mangaid) => ({
  type: 'FULL_COVER_LOAD_FAILURE',
  payload: {
    mangaid,
  },
})

export const fullCoverLoadSuccess = (mangaid) => ({
  type: 'FULL_COVER_LOAD_SUCCESS',
  payload: {
    mangaid,
  },
})
