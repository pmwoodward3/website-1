import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import localforage from 'localforage'
import throttle from 'throttle-function'
import { getList } from './redux/actions/list'
import R from 'ramda'

if (__DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf')
}


//Setup up browser storage
localforage.config({
  name: 'sausageBrainWebsite',
  description: 'Storage for improving user expierience',
  storeName: 'state',
  driver: [
    localforage.WEBSQL,
    localforage.LOCALSTORAGE,
  ]
})

export const history = browserHistory

const initialState = {}

export const store = configureStore(initialState)

store.subscribe(throttle(() => {
  const state = store.getState()
  localforage.setItem('myList', state.myList)
  .then(() => {
    return localforage.setItem('readingHistory', state.readingHistory)
  })
  .then()
  .catch()
}), {
  window: 1000,
  limit: 1,
})

//Load state from storage
const storageState = {}

localforage.getItem('myList')
.then((myList) => {
  if(myList){
    storageState.myList = myList
  }

  return localforage.getItem('readingHistory')
})
.then((readingHistory) => {
  if(readingHistory){
    storageState.readingHistory = readingHistory
  }
})
.then(() => {
  store.dispatch({
    type: 'LOAD_STORAGE_SUCCESS',
    payload: storageState,
  })

  let items = []

  if(storageState.myList){
    items = [
      ...items,
      ...storageState.myList.items,
    ]
  }

  if(storageState.readingHistory){
    items = [
      ...items,
      ...storageState.readingHistory.items,
    ]
  }

  if(items.length > 0){
    items = items.filter(x => !!x)
    items = items.map(({mangaid}) => mangaid)
    items = R.uniq(items)
    store.dispatch(getList(items))
  }
})
.catch((error) => {
  store.dispatch({
    type: 'LOAD_STORAGE_FAILURE',
    error,
  })
})


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
