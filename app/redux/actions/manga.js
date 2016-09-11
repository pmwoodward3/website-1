export const getManga = (mangaid, source) => ({
  mode: 'GET',
  type: 'GET_MANGA',
  url: `manga/${mangaid}`,
  data: {
    source,
    mangaid,
  },
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

export const fullCoverLoadRequest = () => ({
  type: 'FULL_COVER_LOAD_REQUEST',
})
