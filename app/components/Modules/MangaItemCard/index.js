import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import Link from 'components/Modules/Link'

import s from './styles.scss'

export const MangaItemCard = ({
  mangaid,
  title,
  cover,
  flex,
  chapter,
  chapternum,
  pagenum,
  source,
}) => {
  let subtitle = ''
  let url = `/manga/${mangaid}`

  if(!isNaN(chapternum)){
    subtitle = `Ch. ${chapternum}`
    url = `${url}/${chapternum}`
  }
  if(chapter){
    subtitle = `Ch. ${chapter}`
  }
  if(pagenum){
    subtitle = `${subtitle}, p. ${pagenum}`
    url = `${url}/${pagenum}`
  }
  if(source){
    url = `${url}?source=${source}`
  }

  if(subtitle.length < 1){
    subtitle = undefined
  }

  const fullCover = `http://mcd.iosphe.re/t/${mangaid}/1/front/a/`
  const cardStyle = {
    backgroundImage: `url(${fullCover}), url(${cover})`,
  }

  return (
    <Link to={url} className={toClass(s.root, flex && s.flex)}>
      <Card
        className={s.card}
        style={cardStyle}
        shadow={0}
        >
        <CardTitle expand />
        {!!title && (
          <CardActions className={s.overlay}>
            <span className={s.title}>{title}</span>
            {subtitle && <span className={s.subtitle}>{subtitle}</span>}
          </CardActions>
        )}
      </Card>
    </Link>
  )
}

MangaItemCard.propTypes = {
  mangaid: PropTypes.number.isRequired,
  cover: PropTypes.string,
  title: PropTypes.string,
  chapter: PropTypes.string,
  chapternum: PropTypes.number,
  pagenum: PropTypes.number,
  source: PropTypes.string,
  flex: PropTypes.bool,
}

export default onlyUpdateForKeys([
  'mangaid',
  'title',
  'flex',
])(MangaItemCard)
