import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import { getList } from './redux/actions/list'
import { getRecommendations } from './redux/actions/recommendations'
import R from 'ramda'
import lf from 'utils/localforage'
import Ga from 'react-router-google-analytics'
import { __PRODUCTION__, GA_TRACKING_ID } from './constants'

import './utils/service-worker-registration'

export const history = hashHistory

const initialState = {}

export const store = configureStore(initialState)

//Load state from storage
const storageState = {}

lf.getItem('favorites')
.then((favorites) => {
  if(favorites){
    storageState.favorites = favorites
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

  if(storageState.favorites){
    items = items.concat(storageState.favorites)
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

//Listen for connection events
const connectionHandler = () => {
  if(navigator.onLine){
    store.dispatch({type: 'ONLINE'})
  }else{
    store.dispatch({type: 'OFFLINE'})
  }
}

connectionHandler()

window.addEventListener('online', connectionHandler)
window.addEventListener('offline', connectionHandler)

//Google analytics

const ga  = Ga(GA_TRACKING_ID)

const routerUpdate = () => {
  if(__PRODUCTION__){
    ga('send', 'pageview', location.pathname)
  }
  window.scrollTo(0, 0)
}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      onUpdate={routerUpdate}
      routes={routes}
      />
  </Provider>,
  document.getElementById('root')
)
