import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'
import Paper from 'material-ui/Paper'
import SwipeableViews from 'react-swipeable-views'
import isTouchAvailable from 'utils/isTouchAvailable'
import IconButton from 'material-ui/IconButton'
import NavigationFullScreen from 'material-ui/svg-icons/navigation/fullscreen'
import NavigationExitFullScreen from 'material-ui/svg-icons/navigation/fullscreen-exit'
import screenfull from 'screenfull'
import Loading from 'components/Modules/Loading'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import {
  getChapter,
  enterFullscreen,
  exitFullscreen,
} from 'redux/actions/chapter'
import { addReadingHistory } from 'redux/actions/readingHistory'

import BreadCrumbs from 'components/Modules/BreadCrumbs'
import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
    addReadingHistory: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.changePage = this.changePage.bind(this)
    this.onChangeIndex = this.onChangeIndex.bind(this)
    this.handleFullScreen = this.handleFullScreen.bind(this)
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this)
  }
  componentDidMount(){
    const { params } = this.props
    if(params.pagenum){
      this.handleChapterChange()
    }else{
      this.changePage(1)
    }

    if (screenfull.enabled) {
      document.addEventListener(screenfull.raw.fullscreenchange, this.handleFullScreenChange)
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

    if(pagenum && chapternum && isChapterLoaded && pagenum > newProps.chapter.items.length){
      this.changePage(1, chapternum + 1)
    }
  }
  componentWillUnmount(){
    document.removeEventListener(screenfull.raw.fullscreenchange, this.handleFullScreenChange)
  }
  handleFullScreenChange(){
    if(screenfull.isFullscreen){
      this.props.enterFullscreen()
    }else{
      this.props.exitFullscreen()
    }
  }
  handleChapterChange(props=this.props){
    const { getChapter, params, location } = props
    getChapter(params.mangaid, params.chapternum, location.query.source)
  }
  changePage(newPage, chapter){
    const { params, location, addReadingHistory } = this.props

    if(params.pagenum && params.pagenum > 0 && this.props.chapter.items.length > 0){
      addReadingHistory({
        mangaid: parseInt(params.mangaid),
        chapternum: parseInt(params.chapternum),
        pagenum: parseInt(params.pagenum),
        source: location.query.source,
      })
    }

    browserHistory.push(`/manga/${params.mangaid}/${chapter || params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)
  }
  handleNextPage(){
    const { params, location } = this.props
    this.changePage(parseInt(params.pagenum) + 1)
  }
  handlePreviousPage(){
    const { params } = this.props
    this.changePage(parseInt(params.pagenum) - 1)
  }
  onChangeIndex(index){
    this.changePage(index + 1)
  }
  handleFullScreen(){
    if (screenfull.enabled) {
      screenfull.toggle(this.refs.container)
    }
  }

  render() {
    const { chapter, params } = this.props
    const hierarchy = [
      {title: 'Berserk', url: `/manga/${params.mangaid}`},
      {title: `Chapter ${params.chapternum}`, disabled: true},
      {title: `Page ${params.pagenum}`, disabled: true},
    ]

    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0
    const hasPagenum = pagenum
    const isPagenumValid = pagenum > 0 && pagenum <= chapter.items.length

    if(isChapterLoaded && hasPagenum && isPagenumValid){
      const index = pagenum - 1
      return (
        <section className={s.section}>
          <Helmet
            title={`SB - Ch. ${params.chapternum} - P. ${pagenum}`}
            />
          <div className={s.header}>
            <BreadCrumbs items={hierarchy}/>
            {isTouchAvailable && (
              <IconButton onClick={this.handleFullScreen}>
                {chapter.fullscreen ? (
                  <NavigationExitFullScreen/>
                ) : (
                  <NavigationFullScreen/>
                )}
              </IconButton>
            )}
          </div>
          <div className={s.container} ref="container">
            {!isTouchAvailable && (
              <div className={s.controlBtn}>
                <FloatingActionButton
                  onClick={this.handlePreviousPage}
                  >
                  <ArrowBack/>
                </FloatingActionButton>
              </div>
            )}
            <SwipeableViews
              resistance={true}
              className={isTouchAvailable ? s.touchSwiper : s.swiper}
              index={index}
              onChangeIndex={this.onChangeIndex}
              ref="swiper"
              >
              {chapter.items.map(({url}) => (
                <Paper className={s.paper} zDepth={3} key={url}>
                  <img
                    draggable={false}
                    className={s.img}
                    src={url}
                    referrerPolicy="no-referrer"
                    ref="img"
                    />
                </Paper>
              ))}
            </SwipeableViews>
            {!isTouchAvailable && (
              <div className={s.controlBtn}>
                <FloatingActionButton
                  onClick={this.handleNextPage}
                  >
                  <ArrowForward/>
                </FloatingActionButton>
              </div>
            )}
          </div>
        </section>
      )
    }else{
      return <Loading/>
    }
  }
}

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
};

export default connect(
  state => ({
    chapter: state.chapter,
  }),
  {
    getChapter,
    enterFullscreen,
    exitFullscreen,
    addReadingHistory,
  }
)(Chapter)
