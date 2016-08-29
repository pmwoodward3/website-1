import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const searchSelector = state => state.search

const search = createSelector(
  mangaTableSelector,
  searchSelector,
  (table, search) => ({
    ...search,
    rows: search.rows
    .map((column) =>
    column
    .map(({mangaid, score}) => ({
      ...table[mangaid],
      score,
    }))),
  })
)

export default search
