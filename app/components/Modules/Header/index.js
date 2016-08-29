import React from 'react'
import { browserHistory, Link, IndexLink } from 'react-router'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionHome from 'material-ui/svg-icons/action/home'

/* component styles */
import s from './styles.scss'

const Header = () => (
  <div className={s.root}>
    <IndexLink to="/" activeClassName={s.active}>
      <IconButton>
        <ActionHome />
      </IconButton>
    </IndexLink>

    <Link to="/search" activeClassName={s.active}>
      <IconButton>
        <ActionSearch/>
      </IconButton>
    </Link>
  </div>
)

export default Header
