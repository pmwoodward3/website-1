import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import Ga from 'react-router-google-analytics'
import { __PRODUCTION__, GA_TRACKING_ID } from './constants'

import 'statics/manifest.json'


if(__PRODUCTION__){
  //Register AppCache and ServiceWorker
  require('offline-plugin/runtime').install()
}

const initialState = {}

export const store = configureStore(initialState)

//Load redux state from storage
import { loadStorage } from 'utils/localforage'
loadStorage(store.dispatch)

//Routing

//Google analytics support for react router
let ga = () => {}
if(__PRODUCTION__){
  ga  = Ga(GA_TRACKING_ID)
}

function handleRouterUpdate() {
  if(__PRODUCTION__){
    ga('send', 'pageview', location.pathname)
  }

  //Reset scroll every route change
  window.scrollTo(0, 0)
}

export const history = browserHistory

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      onUpdate={handleRouterUpdate}
      routes={routes}
      />
  </Provider>,
  document.getElementById('root')
)
