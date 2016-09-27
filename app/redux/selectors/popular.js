import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const popularSelector = state => state.popular.items

const recommendations = createSelector(
  mangaTableSelector,
  popularSelector ,
  (table, popular) => ({
    items: popular.map(({mangaid, hits}) => ({
      ...table[mangaid],
      hits,
    })),
  })
)

export default recommendations
