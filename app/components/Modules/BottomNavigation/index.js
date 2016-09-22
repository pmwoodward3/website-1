import React from 'react'
import { browserHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

import ActionHome from 'material-ui/svg-icons/action/home'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

/* component styles */
import s from './styles.scss'

const BottomNav = ({location}) => {

  const handleTouchTap = (path) => () => browserHistory.push(path)

  const items = [
    {
      label: 'Home',
      path: '/home',
      icon: <ActionHome/>,
    },
    {
      label: 'Favorites',
      path: '/favorites',
      icon: <ActionFavorite/>,
    },
  ]

  const selectedIndex = () => {
    let result = items
    .filter(({path}) => path == location.pathname)

    if(result.length <= 0){
      return
    }

    return items.indexOf(result[0])
  }

  return(
    <Paper zDepth={3} className={s.root}>
      <BottomNavigation selectedIndex={selectedIndex()}>
        {items.map(({label, path, icon}) => (
          <BottomNavigationItem
            key={path}
            label={label}
            icon={icon}
            onTouchTap={handleTouchTap(path)}
            />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default onlyUpdateForKeys([
  'location',
])(BottomNav)
