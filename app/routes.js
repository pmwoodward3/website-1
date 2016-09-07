import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import Root from './components/Root'
import Home from './components/Containers/Home'
import Search from './components/Containers/Search'
import Manga from './components/Containers/Manga'
import Chapter from './components/Containers/Chapter'
import MyList from './components/Containers/MyList'

export default (
  <Route path="/" component={Root}>
    <IndexRedirect to="/home"/>
    <Route path="/home" component={Home} />
    <Route path="/myList" component={MyList} />
    <Route path="/search" component={Search} />
    <Route path="/manga/:mangaid" component={Manga} />
    <Route path="/manga/:mangaid/:chapternum(/:pagenum)" component={Chapter} />
  </Route>
)
