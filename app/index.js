import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import { getList } from './redux/actions/list'
import { uniq } from 'ramda'
import lf from 'utils/localforage'
import Ga from 'react-router-google-analytics'
import { __PRODUCTION__, GA_TRACKING_ID } from './constants'
import EnhancedButton from 'material-ui/internal/EnhancedButton'

EnhancedButton.defaultProps.disableTouchRipple = true
EnhancedButton.defaultProps.disableFocusRipple = true

if(__PRODUCTION__){
  require('offline-plugin/runtime').install()
}

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

  return lf.getItem('mangaTable')
})
.then((mangaTable) => {
  if(mangaTable){
    storageState.mangaTable = mangaTable
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
    items = uniq(items)

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
