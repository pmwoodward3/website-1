import React from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'

/* component styles */
import s from './styles.scss'

const MangaItemCard = ({mangaid, cover, title, chapter}) => (
  <div className={s.root}>
    <LazyLoad height={200} offset={100}>
      <img
        src={cover}
        className={s.cover}
        referrerPolicy="no-referrer"
        />
    </LazyLoad>
    <Link to={`/manga/${mangaid}`}>{title}</Link>
    {chapter && <p>Chapter: {chapter}</p>}
  </div>
)

export default MangaItemCard
