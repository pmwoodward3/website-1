import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const favoritesSelector = state => state.favorites

export const favorites = createSelector(
  mangaTableSelector,
  favoritesSelector,
  (table, favorites) => ({
    ...favorites,
    items: favorites.items
    .map(({mangaid}) => ({
      mangaid,
      ...table[mangaid],
    }))
    .asMutable()
    .reverse(),
  })
)


const favoritesItemSelector = (state, mangaid) => state.favorites.items
.filter((item) => item.mangaid == mangaid)
.length > 0

export const isFavoritesItem = createSelector(
  favoritesItemSelector,
  (favoritesItem) => favoritesItem
)
