import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import localforage from 'localforage'
import throttle from 'throttle-function'

if (__DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf')
}


//Setup up browser storage
localforage.config({
  name: 'sausageBrainWebsite',
  description: 'Storage for improving user expierience',
  storeName: 'state',
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
