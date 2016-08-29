import { createReducer } from '../utils/createReducer'

const initialState = 0

export default function(state=initialState, {type}) {
  const requestPattern = /.*_REQUEST/g
  const successPattern = /.*_SUCCESS/g
  const failurePattern = /.*_FAILURE/g

  if(requestPattern.test(type)){
    return state + 1
  }else if(successPattern.test(type) || failurePattern.test(type)){
    return state - 1
  }else{
    return state
  }
}
