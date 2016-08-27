import { combineReducers } from 'redux'

import releases from './releases'
import search from './search'
import manga from './manga'
import chapter from './chapter'
import myList from './myList'
import readingHistory from './readingHistory'
import mangaTable from './mangaTable'
import recommendations from './recommendations'

const rootReducer = combineReducers({
  releases,
  search,
  manga,
  chapter,
  readingHistory,
  myList,
  mangaTable,
  recommendations,
})

export default rootReducer
