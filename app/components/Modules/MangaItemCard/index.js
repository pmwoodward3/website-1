import React from 'react'
import { browserHistory } from 'react-router'
import LazyLoad from 'react-lazyload'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

/* component styles */
import s from './styles.scss'

const MangaItemCard = ({mangaid, cover, title, chapter, chapternum, pagenum}) => {
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
  if(subtitle.length < 1){
    subtitle = undefined
  }

  return (
    <Card className={s.root} onClick={() => browserHistory.push(url)}>
      <CardMedia>
        {cover ? (
          <img
            draggable={false}
            src={cover}
            referrerPolicy="no-referrer"
            className={s.cover}
            />
        ) : (
          <div className={s.cover}>
            Cover not available
          </div>
        )}
      </CardMedia>
      <CardTitle
        title={title}
        subtitle={subtitle}
        className={s.title}
        />
    </Card>
  )
}


export default MangaItemCard
