import React, { PropTypes } from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import { Card } from 'react-mdl/lib/Card'
import Icon from 'react-mdl/lib/Icon'
import Link from 'components/Modules/Link'

import s from './styles.scss'

const items = [
  {
    label: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    label: 'Favorites',
    path: '/favorites',
    icon: 'favorite',
  },
]

export const BottomNavigation = ({location}) => {
  let selectedIndex = items.filter(({path}) => path == location.pathname)[0]
  selectedIndex = !!selectedIndex && selectedIndex.path

  return (
    <Card shadow={3} className={s.root}>
      {items.map(({label, path, icon}) => (
        <Link
          key={path}
          className={toClass(s.navItem, selectedIndex == path && s.active)}
          to={path}
          >
          <Icon
            name={icon}
            className={s.iconButton}
            />
          {label}
        </Link>
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
