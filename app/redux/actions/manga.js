import { MAIN_SOURCE } from 'constants'

export const getManga = (mangaid, source=MAIN_SOURCE) => ({
  mode: 'GET',
  type: 'GET_MANGA',
  url: `manga/${mangaid}`,
  data: {
    source,
    mangaid,
  },
})
