import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import debounce from 'debounce'

import Helmet from 'react-helmet'
import Loading from 'components/Modules/Loading'
import { PhotoSwipe } from 'react-photoswipe'

import * as chapterActionCreators from 'redux/actions/chapter'
import * as headerActions from 'redux/actions/header'
import { addReadingHistory } from 'redux/actions/readingHistory'
import { getList } from 'redux/actions/list'

import 'react-photoswipe/lib/photoswipe.css'
import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    manga: PropTypes.object,
    location: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    addReadingHistory: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.changePage = this.changePage.bind(this)
    this.afterChange = debounce(this.afterChange.bind(this), 100)
    this.handleChapterChange = this.handleChapterChange.bind(this)
  }
  componentDidMount(){
    const { params } = this.props
    if(params.pagenum){
      this.handleChapterChange()
    }
  }
  componentWillUpdate(newProps){
    const isNewManga = this.props.params.mangaid != newProps.params.mangaid
    const isNewChapter = this.props.params.chapternum != newProps.params.chapternum
    const isNewSource = this.props.location.query.source != newProps.location.query.source
    const hasPagenumNow = !this.props.params.pagenum && newProps.params.pagenum
    if(isNewChapter || isNewManga || isNewSource || hasPagenumNow){
      this.handleChapterChange(newProps)
    }

    const isChapterLoaded = newProps.chapter.items.length > 0

    const pagenum = parseInt(newProps.params.pagenum)
    const chapternum = parseInt(newProps.params.chapternum)

    if(!isNaN(pagenum) && !isNaN(chapternum) && isChapterLoaded){
      if(pagenum > newProps.chapter.items.length){
        this.changePage(1, chapternum + 1)
      }
    }
  }
  handleChapterChange(props=this.props){
    const {
      getChapter,
      getList,
      params,
      location,
      manga,
    } = props

    getChapter(params.mangaid, params.chapternum, location.query.source)

    if(!manga){
      getList([params.mangaid])
    }
  }
  changePage(newPage, chapter){
    const { params, location } = this.props

    hashHistory.push(`/manga/${params.mangaid}/${chapter || params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)
  }
  correctZoom(instance){
    const ratio = instance.viewportSize.x / instance.currItem.w
    instance.zoomTo(
      ratio,
      { x: 0, y: 0 },
      1,
    )
  }
  afterChange(instance){
    this.correctZoom(instance)

    const pagenum = instance.getCurrentIndex()

    const { params, location, addReadingHistory } = this.props

    if(params.pagenum && params.pagenum > 0 && this.props.chapter.items.length > 0){
      addReadingHistory({
        mangaid: parseInt(params.mangaid),
        chapternum: parseInt(params.chapternum),
        pagenum: parseInt(pagenum),
        source: location.query.source,
      })
    }
  }
  handleGettingData(instance, index, item) {
    if (item.w < 1 || item.h < 1) {
      const img = new Image()
      img.onload = function() {
        item.w = this.width
        item.h = this.height
        instance.invalidateCurrItems()
        instance.updateSize(true)
      }
      img.src = item.src
    }
  }
  handleClose(){
    hashHistory.goBack()
  }
  render() {
    const { chapter, params } = this.props

    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0

    const items = chapter.items
    .asMutable()
    .map(({url}) => ({
      src: url,
      w: 0,
      h: 0,
    }))

    const options = {
      index: pagenum - 1,
      history: false,
      preload: [0, 2],
      modal: false,
      shareEl: false,
      tapToClose: false,
      clickToCloseNonZoomable: false,
      pinchToClose: false,
      closeOnScroll: false,
      closeOnVerticalDrag: false,
      loop: false,
      maxSpreadZoom: 3,
    }

    return (
      <section className={s.section}>
        <Helmet
          title={`SB - Ch. ${params.chapternum}`}
          />
        <div className={s.container} ref="container">
          <PhotoSwipe
            ref="pswp"
            isOpen={isChapterLoaded}
            items={items}
            options={options}
            gettingData={this.handleGettingData}
            afterChange={this.afterChange}
            onClose={this.handleClose}
            />
        </div>
        <Loading/>
      </section>
    )
  }
}

const PureChapter = onlyUpdateForKeys([
  'location',
  'chapter',
  'params',
  'manga',
  'location',
])(Chapter)

export default connect(
  (state, {params}) => ({
    chapter: state.chapter,
    manga: state.mangaTable.items[parseInt(params.mangaid)],
  }),
  {
    ...chapterActionCreators,
    ...headerActions,
    getList,
    addReadingHistory,
  }
)(PureChapter)
