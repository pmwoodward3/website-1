import { createSelector } from 'reselect'

const mangaTableSelector = (state, mangaid) => state.mangaTable.items[mangaid]
const mangaSelector = (state) => state.manga

export const manga = createSelector(
  mangaTableSelector,
  mangaSelector,
  (tableItem, mangaItem) => ({
    ...mangaItem,
    details: {
      ...tableItem,
      ...mangaItem.details,
    },
  })
)

export default manga
