import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import configureStore from './redux'
import routes from './routes'
import storageAvailable from './utils/storageAvailable'
import throttle from 'lodash/throttle'

if (__CLIENT__ && __DEVELOPMENT__) {
  // https://facebook.github.io/react/docs/advanced-performance.html
  window.Perf = require('react-addons-perf')
}

let initialState = {}

if(storageAvailable){
  const myList = localStorage.getItem('myList')
  if(myList){
    initialState.myList = JSON.parse(myList)
  }
}

export const history = browserHistory

export const store = configureStore(initialState)

if(storageAvailable){
  store.subscribe(throttle(() => {
    localStorage.setItem('myList', JSON.stringify(store.getState().myList))
  }), 1000)
}

if (__CLIENT__) {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
