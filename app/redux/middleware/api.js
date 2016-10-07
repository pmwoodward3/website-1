import request from 'superagent-es6-promise'
import { API_URL } from 'constants'

export const apiMiddleware = store => next => action => {
  if (action.url) {
    // Generate promise
    const requestPromise = action.mode === 'GET'
    ? request.get(API_URL + action.url)
    .query(action.data)
    : request.post(API_URL + action.url)
    .send(action.data)

    next({
      type: action.type,
      payload: {
        promise: requestPromise
        // .promise()
        .then(res => res)
        .catch(res => res.res),
        data: action.data,
      },
    })
  } else {
    next(action)
  }
}
