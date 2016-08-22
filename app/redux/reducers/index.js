import { combineReducers } from 'redux'

import releases from './releases'
import search from './search'
import manga from './manga'
import chapter from './chapter'

const rootReducer = combineReducers({
  releases,
  search,
  manga,
  chapter,
})

export default rootReducer
