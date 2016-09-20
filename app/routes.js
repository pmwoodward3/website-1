import Root from './components/Root'

import Home from 'components/Containers/Home'
import Favorites from 'components/Containers/Favorites'
import Search from 'components/Containers/Search'
import Manga from 'components/Containers/Manga'
import Chapter from 'components/Containers/Chapter'

export default {
  path: '/',
  component: Root,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/home'),
  },
  childRoutes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/favorites',
      component: Favorites,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/manga/:mangaid',
      component: Manga,
    },
    {
      path: '/manga/:mangaid/:chapternum/:pagenum',
      component: Chapter,
    },
  ],
}
