import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import s from './styles.scss'

export class MangaItemCard extends Component {
  static propTypes = {
    mangaid: PropTypes.number.isRequired,
    cover: PropTypes.string,
    title: PropTypes.string,
    chapter: PropTypes.string,
    chapternum: PropTypes.number,
    pagenum: PropTypes.number,
    source: PropTypes.string,
    flex: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.handleTouchTap = this.handleTouchTap.bind(this)
  }
  handleTouchTap(){
    const {
      mangaid,
      chapternum,
      pagenum,
      source,
    } = this.props

    let url = `/manga/${mangaid}`

    if(!isNaN(chapternum)){
      url = `${url}/${chapternum}`
    }
    if(pagenum){
      url = `${url}/${pagenum}`
    }
    if(source){
      url = `${url}?source=${source}`
    }

    browserHistory.push(url)
  }
  render(){
    const {
      mangaid,
      title,
      cover,
      flex,
      chapter,
      chapternum,
      pagenum,
    } = this.props

    let subtitle = ''

    if(!isNaN(chapternum)){
      subtitle = `Ch. ${chapternum}`
    }
    if(chapter){
      subtitle = `Ch. ${chapter}`
    }
    if(pagenum){
      subtitle = `${subtitle}, p. ${pagenum}`
    }

    if(subtitle.length < 1){
      subtitle = undefined
    }

    const fullCover = (chapter) => `http://mcd.iosphe.re/t/${mangaid}/${chapter}/front/a/`
    const cardStyle = {
      backgroundImage: `url(${fullCover(1)}), url(${fullCover(0)}), url(${cover})`,
    }

    return (
      <Card
        className={toClass(s.root, flex && s.flex)} onClick={this.handleTouchTap}
        style={cardStyle}
        referrerPolicy="no-referrer"
        >
        <CardTitle expand />
        {!!title && (
          <CardActions className={s.overlay}>
            <span className={s.title}>{title}</span>
            {subtitle && <span className={s.subtitle}>{subtitle}</span>}
          </CardActions>
        )}
      </Card>
    )
  }
}


export default onlyUpdateForKeys([
  'mangaid',
  'title',
  'flex',
])(MangaItemCard)
