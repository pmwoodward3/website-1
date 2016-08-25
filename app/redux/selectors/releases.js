import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const releasesSelector = state => state.releases.items

const releases = createSelector(
  mangaTableSelector,
  releasesSelector,
  (table, releases) => ({
    items: releases.map(({mangaid, chapter, date}) => ({
      ...table[mangaid],
      mangaid,
      chapter,
      date,
    })),
  })
)

export default releases
