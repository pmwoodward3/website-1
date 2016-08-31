import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import { promiseMiddleware } from './middleware/promise'
import { apiMiddleware } from './middleware/api'
import { localforage } from './middleware/localforage'

const logger = createLogger({
  collapsed: true,
  predicate: () =>
    process.env.NODE_ENV === 'development',
})

const middlewares = [
  apiMiddleware,
  promiseMiddleware(),
  thunkMiddleware,
  localforage,
  !__PRODUCTION__ && logger,
].filter(Boolean)

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
