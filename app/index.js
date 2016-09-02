import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import { getList } from './redux/actions/list'
import { getRecommendations } from './redux/actions/recommendations'
import R from 'ramda'
import * as lf from 'utils/localforage'

import './utils/service-worker-registration'

export const history = browserHistory

const initialState = {}

export const store = configureStore(initialState)

//Load state from storage
const storageState = {}

lf.getItem('myList')
.then((myList) => {
  if(myList){
    storageState.myList = myList
  }

  return lf.getItem('readingHistory')
})
.then((readingHistory) => {
  if(readingHistory){
    storageState.readingHistory = readingHistory
  }
})
.then(() => {
  store.dispatch({
    type: 'LOAD_STORAGE',
    payload: storageState,
  })

  let items = []

  if(storageState.myList){
    items = items.concat(storageState.myList)
  }

  if(storageState.readingHistory){
    items = items.concat(storageState.readingHistory)
  }

  if(items.length > 0){
    items = items.filter(x => !!x)
    items = items.map(({mangaid}) => mangaid)
    items = R.uniq(items)

    store.dispatch(getRecommendations(items))
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
