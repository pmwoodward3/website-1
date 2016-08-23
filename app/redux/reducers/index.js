import { combineReducers } from 'redux'

import releases from './releases'
import search from './search'
import manga from './manga'
import chapter from './chapter'
import myList from './myList'

const rootReducer = combineReducers({
  releases,
  search,
  manga,
  chapter,
  myList,
})

export default rootReducer
