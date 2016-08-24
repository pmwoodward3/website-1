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
    <div className={s.root}>
      <LazyLoad height={170} offset={50}>
        <img
          src={cover}
          className={s.cover}
          referrerPolicy="no-referrer"
          />
      </LazyLoad>
      <Link to={url}>{title}</Link>
      {chapter && <p>Chapter: {chapter}</p>}
      {chapternum && <p>Chapter: {chapternum}</p>}
      {pagenum && <p>Page: {pagenum}</p>}
    </div>
  )
}


export default MangaItemCard
