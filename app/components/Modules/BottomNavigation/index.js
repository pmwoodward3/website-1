import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

import ActionHome from 'material-ui/svg-icons/action/home'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

import { BottomNavigation as BotNav, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

/* component styles */
import s from './styles.scss'

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

function selectedIndex(location) {
  const result = items
  .filter(({path}) => path == location.pathname)

  return result.length > 0
  ? items.indexOf(result[0])
  : undefined
}

export const BottomNavigation = ({location}) => (
  <Paper zDepth={3} className={s.root}>
    <BotNav selectedIndex={selectedIndex(location)}>
      {items.map(({label, path, icon}) => (
        <BottomNavigationItem
          key={path}
          label={label}
          icon={icon}
          onTouchTap={handleTouchTap(path)}
          />
      ))}
    </BotNav>
  </Paper>
)

BottomNavigation.propTypes = {
  location: PropTypes.object,
}

export default onlyUpdateForKeys([
  'location',
])(BottomNavigation)
