import lf from 'utils/localforage'
import debounce from 'debounce'
import { indexBy, prop, filter, uniq } from 'ramda'

export const localforage = store => next => action => {
  next(action)

  const pattern = /.*_(READING_HISTORY|MY_LIST_ITEM)/g
  if(pattern.test(action.type)){
    save(store.getState())
  }

  if(/.*(GET_LIST_SUCCESS|MY_LIST_ITEM)/g.test(action.type)){
    saveMangaTable(store.getState())
  }
}

const saveMangaTable = (state) => {
  const mangaTable = state.mangaTable.items

  const favorites = state.favorites.items
  .map((x) => mangaTable[x.mangaid])
  const readingHistory = state.readingHistory.items
  .map((x) => mangaTable[x.mangaid])

  let items = favorites.concat(readingHistory)

  items = filter((x) => !!x, items)
  items = uniq(items)
  items = indexBy(prop('mangaid'), items)

  lf.setItem('mangaTable', items)
  .then(() => {})
  .catch((err) => {
    console.error(err)
  })
}

const save = debounce((state) => {
  if(state.favorites.isLoaded){
    lf.setItem('favorites', state.favorites.items)
    .then(() => {})
    .catch((err) => {
      console.error(err)
    })
    lf.setItem('readingHistory', state.readingHistory.items)
    .then(() => {})
    .catch((err) => {
      console.error(err)
    })
  }
}, 1000)
