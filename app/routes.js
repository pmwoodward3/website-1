import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Root from './components/Root'
import Releases from './components/Containers/Releases'
import Search from './components/Containers/Search'
import Manga from './components/Containers/Manga'
import Chapter from './components/Containers/Chapter'

export default (
  <Route path="/" component={Root}>
    <IndexRedirect to="/releases" />
    <Route path="/releases" component={Releases} />
    <Route path="/search/:query" component={Search} />
    <Route path="/manga/:mangaid" component={Manga} />
    <Route path="/manga/:mangaid/:chapternum" component={Chapter} />
  </Route>
)
