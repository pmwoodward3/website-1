import React from 'react'
import { browserHistory } from 'react-router'
import LazyLoad from 'react-lazyload'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

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
    <Card className={s.root} onTouchTap={() => browserHistory.push(url)}>
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


export default MangaItemCard
