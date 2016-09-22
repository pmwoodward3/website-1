import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import s from './styles.scss'

class MangaItemCard extends Component {
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
    this.handleCoverFailure = this.handleCoverFailure.bind(this)
    this._renderOverlay = this._renderOverlay.bind(this)

    this.state = {
      fullCover: true,
    }
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
  _renderOverlay(){
    const {
      title,
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

    return (
      <CardTitle
        title={title}
        subtitle={subtitle}
        className={s.title}
        />
    )
  }
  handleCoverFailure(){
    this.setState({
      fullCover: false,
    })
  }
  render(){
    const { mangaid, cover, flex } = this.props

    return (
      <Card className={toClass([s.root, flex && s.flex])} onTouchTap={this.handleTouchTap}>
        <CardMedia overlay={this._renderOverlay()}>
          <img
            draggable={false}
            src={this.state.fullCover ? `http://mcd.iosphe.re/t/${mangaid}/1/front/a/` : cover}
            onError={this.handleCoverFailure}
            referrerPolicy="no-referrer"
            className={s.cover}
            />
        </CardMedia>
      </Card>
    )
  }
}


export default onlyUpdateForKeys([
  'mangaid',
  'title',
])(MangaItemCard)
