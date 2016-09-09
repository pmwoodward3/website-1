import { createReducer } from '../utils/createReducer'

const initialState = {
  title: 'SausageBrain',
  showSearchField: true,
  showFullScreenButton: false,
}

export default createReducer({
  ['CHANGE_HEADER']: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState)
