import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { promiseMiddleware } from './middleware/promise'
import { apiMiddleware } from './middleware/api'
import { localforage } from './middleware/localforage'

let middlewares = [
  apiMiddleware,
  promiseMiddleware(),
  thunkMiddleware,
  localforage,
]

if(!__PRODUCTION__){
  const createLogger = require('redux-logger')

  const logger = createLogger({
    collapsed: true,
    predicate: () => true,
  })

  middlewares = [
    ...middlewares,
    logger,
  ]
}

const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    (!__PRODUCTION__ && window.devToolsExtension) ? window.devToolsExtension() : undefined,
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../', () => {
      const nextRootReducer = require('../index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
