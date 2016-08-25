import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const searchSelector = state => state.search.items

const search = createSelector(
  mangaTableSelector,
  searchSelector,
  (table, search) => ({
    items: search.map(({mangaid, score}) => ({
      ...table[mangaid],
      score,
    })),
  })
)

export default search
