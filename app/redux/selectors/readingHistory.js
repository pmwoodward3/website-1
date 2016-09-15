import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const readingHistorySelector = state => state.readingHistory.items

const readingHistory = createSelector(
  mangaTableSelector,
  readingHistorySelector,
  (table, readingHistory) => ({
    items: readingHistory
    .map((item) => ({
      ...table[item.mangaid],
      ...item,
    }))
    .asMutable()
    .reverse(),
  })
)

export default readingHistory

const progressSelector = (state, mangaid) =>
state.readingHistory.items
.filter((item) => item.mangaid == mangaid)[0]

export const mangaProgress = createSelector(
  progressSelector,
  (progress) => progress
)
