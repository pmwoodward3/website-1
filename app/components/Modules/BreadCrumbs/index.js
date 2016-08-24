import React from 'react'
import { Link } from 'react-router'

/* component styles */
import s from './styles.scss'

const BreadCrumbs = ({items}) => (
  <div className={s.root}>
    {items.map(({url, title}, index) => (
      <div className={s.item} key={title+url}>
        <Link to={url}>{title}</Link>
        {index < (items.length - 1) && <span>/</span>}
      </div>
    ))}
  </div>
)

export default BreadCrumbs
