import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const myListSelector = state => state.myList.items

export const myList = createSelector(
  mangaTableSelector,
  myListSelector,
  (table, myList) => ({
    items: myList.map(({mangaid}) => table[mangaid]),
  })
)


const myListItemSelector = (state, mangaid) => state.myList.items
.filter((item) => item.mangaid == mangaid)
.length > 0

export const isMyListItem = createSelector(
  myListItemSelector,
  (myListItem) => myListItem
)
