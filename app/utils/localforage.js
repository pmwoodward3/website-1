import localforage from 'localforage'
import { getList } from 'redux/actions/list'
import { uniq } from 'ramda'

//Setup up browser storage
localforage.config({
  name: 'ShibaManga',
  description: 'User data',
  storeName: 'state',
})

export function loadStorage(dispatch){
  //Load state from storage
  const storageState = {}

  localforage.getItem('favorites')
  .then((favorites) => {
    if(favorites){
      storageState.favorites = favorites
    }

    return localforage.getItem('readingHistory')
  })
  .then((readingHistory) => {
    if(readingHistory){
      storageState.readingHistory = readingHistory
    }

    return localforage.getItem('mangaTable')
  })
  .then((mangaTable) => {
    if(mangaTable){
      storageState.mangaTable = mangaTable
    }
  })
  .then(() => {
    dispatch({
      type: 'LOAD_STORAGE',
      payload: storageState,
    })

    let items = []

    if(storageState.favorites){
      items = items.concat(storageState.favorites)
    }

    if(storageState.readingHistory){
      items = items.concat(storageState.readingHistory)
    }

    if(items.length > 0){
      items = items.filter(x => !!x)
      items = items.map(({mangaid}) => mangaid)
      items = uniq(items)

      dispatch(getList(items))
    }
  })
  .catch((error) => {
    dispatch({
      type: 'LOAD_STORAGE_FAILURE',
      error,
    })
  })
}

export default localforage
