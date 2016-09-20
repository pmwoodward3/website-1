import { createReducer } from '../utils/createReducer'

const initialState = {
  title: 'SausageBrain',
  parentPath: '/home',
  showSearchField: true,
  showFullScreenButton: false,
  showSourceButton: false,
  showZoomOutButton: false,
}

export default createReducer({
  ['CHANGE_HEADER']: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState)
