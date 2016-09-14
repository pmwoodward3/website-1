import React from 'react'
import { hashHistory } from 'react-router'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { onlyUpdateForKeys } from 'recompose'

/* component styles */
import s from './styles.scss'

const MangaItemCard = ({mangaid, cover, title, chapter, chapternum, pagenum, source}) => {
  let url = `/manga/${mangaid}`
  let subtitle = ''

  if(chapternum){
    url = `${url}/${chapternum}`
    subtitle = `Ch. ${chapternum}`
  }
  if(chapter){
    subtitle = `Ch. ${chapter}`
  }
  if(pagenum){
    url = `${url}/${pagenum}`
    subtitle = subtitle + `, p. ${pagenum}`
  }
  if(source){
    url = `${url}?source=${source}`
  }

  if(subtitle.length < 1){
    subtitle = undefined
  }

  const overlay = (
    <CardTitle
      title={title}
      subtitle={subtitle}
      className={s.title}
      />
  )

  return (
    <Card className={s.root} onTouchTap={() => hashHistory.push(url)}>
      <CardMedia overlay={overlay}>
        <img
          draggable={false}
          src={cover || `http://mcd.iosphe.re/t/${mangaid}/1/front/a/`}
          referrerPolicy="no-referrer"
          className={s.cover}
          />
      </CardMedia>
    </Card>
  )
}


export default onlyUpdateForKeys([
  'mangaid',
  'cover',
  'title',
  'chapter',
  'chapternum',
  'pagenum',
  'source',
])(MangaItemCard)
