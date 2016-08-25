import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const myListSelector = state => state.myList.items

const myList = createSelector(
  mangaTableSelector,
  myListSelector,
  (table, myList) => ({
    items: myList.map(({mangaid}) => table[mangaid]),
  })
)

export default myList
