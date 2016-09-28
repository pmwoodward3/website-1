import { createReducer } from '../utils/createReducer'
import Immutable from 'seamless-immutable'

const initialState = {
  sectionRowLength: 8,
  expandedSections: Immutable({}),
}

export default createReducer({
  ['EXPAND_SECTION_HOME']: (state, {payload}) => ({
    ...state,
    expandedSections: state.expandedSections.set(payload, true),
  }),
  ['CLOSE_SECTION_HOME']: (state, {payload}) => ({
    ...state,
    expandedSections: state.expandedSections.set(payload, false),
  }),
  ['SET_SECTION_ROW_LENGTH_HOME']: (state, {payload}) => ({
    ...state,
    sectionRowLength: payload,
  }),
}, initialState)
