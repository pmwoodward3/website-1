import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const popularSelector = state => state.popular.items

const recommendations = createSelector(
  mangaTableSelector,
  popularSelector ,
  (table, popular) => ({
    items: popular.map((item) => ({
      ...item,
      ...table[item.mangaid],
    })),
  })
)

export default recommendations
