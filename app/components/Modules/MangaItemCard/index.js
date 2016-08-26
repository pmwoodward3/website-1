import React from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'

/* component styles */
import s from './styles.scss'

const MangaItemCard = ({mangaid, cover, title, chapter, chapternum, pagenum}) => {
  let url = `/manga/${mangaid}`

  if(chapternum){
    url = `${url}/${chapternum}`
  }
  if(pagenum){
    url = `${url}/${pagenum}`
  }

  return (
    <Link className={s.root} to={url}>
      <img
        src={cover}
        className={s.cover}
        referrerPolicy="no-referrer"
        />
      <strong to={url} className={s.title}>{title}</strong>
      {chapter && <p>Chapter: {chapter}</p>}
      {chapternum && <p>Chapter: {chapternum}</p>}
      {pagenum && <p>Page: {pagenum}</p>}
    </Link>
  )
}


export default MangaItemCard
