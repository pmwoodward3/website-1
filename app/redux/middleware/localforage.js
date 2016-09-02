import * as lf from 'utils/localforage'
import debounce from 'debounce'

export const localforage = store => next => action => {
  next(action)

  const pattern = /.*_(READING_HISTORY|MY_LIST_ITEM)/g
  if(pattern.test(action.type)){
    save(store.getState())
  }
}

const save = debounce((state) => {
  if(state.myList.isLoaded){
    lf.setItem('myList', state.myList.items)
    .then(() => {
      return lf.setItem('readingHistory', state.readingHistory.items)
    })
    .then(() => {})
    .catch((err) => {
      console.error(err)
    })
  }
}, 1000)
