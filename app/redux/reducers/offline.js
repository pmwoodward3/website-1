import { createReducer } from '../utils/createReducer'

const initialState = false

export default createReducer({
  ['OFFLINE']: () => true,
  ['ONLINE']: () => false,
}, initialState)
