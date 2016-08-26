import React from 'react'
import { Link } from 'react-router'

/* component styles */
import s from './styles.scss'

const BreadCrumbs = ({items}) => (
  <div className={s.root}>
    {items.map(({url='', title='', disabled=false}, index) => (
      <div className={s.item} key={title+url}>
        {disabled ? (
          <span to={url}>{title}</span>
        ) : (
          <Link to={url}>{title}</Link>
        )}
        {index < (items.length - 1) && <span>/</span>}
      </div>
    ))}
  </div>
)

export default BreadCrumbs
