import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Root from './components/Root'
import Home from './components/Containers/Home'
import Search from './components/Containers/Search'
import Manga from './components/Containers/Manga'
import Chapter from './components/Containers/Chapter'

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="/search" component={Search} />
    <Route path="/manga/:mangaid" component={Manga} />
    <Route path="/manga/:mangaid/:chapternum(/:pagenum)" component={Chapter} />
  </Route>
)
