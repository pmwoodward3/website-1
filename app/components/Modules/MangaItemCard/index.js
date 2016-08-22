import React from 'react'
import { Link } from 'react-router'

/* component styles */
import s from './styles.scss'

const MangaItemCard = ({mangaid, cover, title, chapter}) => (
  <div className={s.root}>
    <img
      src={cover}
      className={s.cover}
      referrerPolicy="no-referrer"
      />
    <Link to={`/manga/${mangaid}`}>{title}</Link>
    {chapter && <p>Chapter: {chapter}</p>}
  </div>
)

export default MangaItemCard
