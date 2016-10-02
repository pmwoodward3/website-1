import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import ActionHome from 'material-ui/svg-icons/action/home'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

import { Card } from 'react-mdl/lib/Card'
import IconButton from 'react-mdl/lib/IconButton'

import s from './styles.scss'

const handleClick = (path) => () => browserHistory.push(path)

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

export const BottomNavigation = ({location}) => {
  let selectedIndex = items.filter(({path}) => path == location.pathname)[0]
  selectedIndex = !!selectedIndex && selectedIndex.path

  return (
    <Card shadow={3} className={s.root}>
      {items.map(({label, path, icon}) => (
        <div
          className={toClass(s.navItem, selectedIndex == path && s.active)}
          onClick={handleClick(path)}
          >
          <IconButton
            key={path}
            name={icon}
            className={s.iconButton}
            />
          {label}
        </div>
      ))}
    </Card>
  )
}

BottomNavigation.propTypes = {
  location: PropTypes.object,
}

export default onlyUpdateForKeys([
  'location',
])(BottomNavigation)
