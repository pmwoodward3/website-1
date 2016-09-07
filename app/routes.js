import Root from './components/Root'

function errorLoading(err) {
  console.error('Dynamic page loading failed', err)
}
function loadRoute(cb) {
  return (module) => cb(null, module.default)
}

export default {
  component: Root,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('./components/Containers/Home')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/home',
      getComponent(location, cb) {
        System.import('./components/Containers/Home')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/favorites',
      getComponent(location, cb) {
        System.import('./components/Containers/Favorites')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/search',
      getComponent(location, cb) {
        System.import('./components/Containers/Search')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/manga/:mangaid',
      getComponent(location, cb) {
        System.import('./components/Containers/Manga')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
    {
      path: '/manga/:mangaid/:chapternum/:pagenum',
      getComponent(location, cb) {
        System.import('./components/Containers/Chapter')
          .then(loadRoute(cb))
          .catch(errorLoading)
      },
    },
  ],
}
