import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const readingHistorySelector = state => state.readingHistory.items

const readingHistory = createSelector(
  mangaTableSelector,
  readingHistorySelector,
  (table, readingHistory) => ({
    items: readingHistory.map(({mangaid, chapternum, pagenum}) => ({
      ...table[mangaid],
      chapternum,
      pagenum,
    })),
  })
)

export default readingHistory
