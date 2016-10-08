import { createReducer } from '../utils/createReducer'

const initialState = {
  title: 'ShibaManga',
  parentPath: '/home',
  showSearchField: true,
  showFullScreenButton: false,
  showSourceButton: false,
  hidden: false,
}

export default createReducer({
  ['CHANGE_HEADER']: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, initialState)
