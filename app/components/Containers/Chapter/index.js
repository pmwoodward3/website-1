import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import Paper from 'material-ui/Paper'
import isTouchAvailable from 'utils/isTouchAvailable'
import IconButton from 'material-ui/IconButton'
import NavigationFullScreen from 'material-ui/svg-icons/navigation/fullscreen'
import screenfull from 'screenfull'
import Loading from 'components/Modules/Loading'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Swipe from 'react-swipe'

import {
  getChapter,
  enterFullscreen,
  exitFullscreen,
} from 'redux/actions/chapter'
import { addReadingHistory } from 'redux/actions/readingHistory'
import { getList } from 'redux/actions/list'

import BreadCrumbs from 'components/Modules/BreadCrumbs'
import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    manga: PropTypes.object,
    location: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
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

    if(!isNaN(pagenum) && !isNaN(chapternum)){
      if(isChapterLoaded && pagenum >= newProps.chapter.items.length){
        this.changePage(1, chapternum + 1)
      }
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
    const { getChapter, getList, params, location, manga } = props
    getChapter(params.mangaid, params.chapternum, location.query.source)
    if(!manga){
      getList([params.mangaid])
    }
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
    this.refs.swiper.next()
  }
  handlePreviousPage(){
    this.refs.swiper.prev()
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
    const { chapter, manga, params } = this.props
    const hierarchy = [
      {title: manga ? manga.title : 'Manga', url: `/manga/${params.mangaid}`},
      {title: `Chapter ${params.chapternum}`, disabled: true},
      {title: `Page ${params.pagenum}`, disabled: true},
    ]

    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0
    const hasPagenum = pagenum
    const isPagenumValid = pagenum > 0 && pagenum <= chapter.items.length

    if(isChapterLoaded && hasPagenum && isPagenumValid){
      return (
        <section className={s.section}>
          <Helmet
            title={`SB - Ch. ${params.chapternum} - P. ${pagenum}`}
            />
          <div className={s.header}>
            <BreadCrumbs items={hierarchy}/>
            {isTouchAvailable && (
              <IconButton onClick={this.handleFullScreen}>
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
                disabled={pagenum < 2}
                secondary
                >
                <ArrowBack/>
              </FloatingActionButton>
            </div>
          )}
          <Swipe
            className={isTouchAvailable ? s.touchSwiper : s.swiper}
            ref="swiper"
            swipeOptions={{
              continuous: false,
              transitionEnd: this.onChangeIndex,
              startSlide: pagenum - 1,
            }}
            >
            {chapter.items.concat([
              {pagenum: chapter.items.length + 1, url: ''},
            ]).map(({url}) => (
              <div className={s.pageContainer} key={url}>
                <Paper className={s.paper} zDepth={2}>
                  <img
                    draggable={false}
                    className={s.img}
                    src={url}
                    referrerPolicy="no-referrer"
                    ref="img"
                    />
                </Paper>
              </div>
            ))}
          </Swipe>
          {!isTouchAvailable && (
            <div className={s.controlBtn}>
              <FloatingActionButton
                onClick={this.handleNextPage}
                secondary
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

export default connect(
  (state, {params}) => ({
    chapter: state.chapter,
    manga: state.mangaTable.items[parseInt(params.mangaid)],
  }),
  {
    getChapter,
    getList,
    enterFullscreen,
    exitFullscreen,
    addReadingHistory,
  }
)(Chapter)
