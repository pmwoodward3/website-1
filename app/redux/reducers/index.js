import { combineReducers } from 'redux'

import releases from './releases'
import search from './search'
import manga from './manga'
import chapter from './chapter'
import favorites from './favorites'
import readingHistory from './readingHistory'
import mangaTable from './mangaTable'
import recommendations from './recommendations'
import loading from './loading'
import header from './header'
import offline from './offline'
import home from './home'
import popular from './popular'

const rootReducer = combineReducers({
  releases,
  search,
  manga,
  chapter,
  readingHistory,
  favorites,
  mangaTable,
  recommendations,
  loading,
  header,
  offline,
  home,
  popular,
})

export default rootReducer
