import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const recommendationsSelector = state => state.recommendations.items

const recommendations = createSelector(
  mangaTableSelector,
  recommendationsSelector,
  (table, recommendations) => ({
    items: recommendations.map(({mangaid, score}) => ({
      ...table[mangaid],
      score,
    })),
  })
)

export default recommendations
