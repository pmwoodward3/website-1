// Simple header component

import React from 'react'
import { Link } from 'react-router'

/* component styles */
import s from './styles.scss'

const Header = () => (
  <div className={s.root}>
    <ul className={s.menu}>
      <li>
        <Link to="/releases">
          Releases
        </Link>
      </li>

      <li>
        <Link to="/search">
          Search
        </Link>
      </li>
    </ul>
  </div>
)

export default Header
