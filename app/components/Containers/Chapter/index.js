import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Helmet from 'react-helmet'
import Paper from 'material-ui/Paper'
import isTouchAvailable from 'utils/isTouchAvailable'
import screenfull from 'screenfull'
import Loading from 'components/Modules/Loading'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Swipe from 'react-swipe'
import R from 'ramda'

import * as chapterActionCreators from 'redux/actions/chapter'
import * as headerActions from 'redux/actions/header'
import { addReadingHistory } from 'redux/actions/readingHistory'
import { getList } from 'redux/actions/list'

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
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.changePage = this.changePage.bind(this)
    this.onChangeIndex = this.onChangeIndex.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
  }
  componentDidMount(){
    const { params, changeHeader } = this.props
    if(params.pagenum){
      this.handleChapterChange()
    }

    if (screenfull.enabled) {
      changeHeader({
        showFullScreenButton: true,
      })
    }
  }
  shouldComponentUpdate(newProps){
    return !R.equals(this.props, newProps)
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

    if(this.props.manga != newProps.manga || isNewChapter){
      const hierarchy = [
        newProps.manga ? newProps.manga.title : 'Manga',
        `Chapter ${newProps.params.chapternum}`,
      ]

      newProps.changeHeader({
        title: hierarchy.join('/'),
      })
    }

    if(!this.props.chapter.fullscreen && newProps.chapter.fullscreen){
      this.handleFullScreen()
    }
  }
  componentWillUnmount(){
    if (screenfull.enabled) {
      this.props.changeHeader({
        showFullScreenButton: false,
      })
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
    const { params, location, addReadingHistory } = this.props

    if(params.pagenum && params.pagenum > 0 && this.props.chapter.items.length > 0){
      addReadingHistory({
        mangaid: parseInt(params.mangaid),
        chapternum: parseInt(params.chapternum),
        pagenum: parseInt(params.pagenum),
        source: location.query.source,
      })
    }

    hashHistory.push(`/manga/${params.mangaid}/${chapter || params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)
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
    ...chapterActionCreators,
    ...headerActions,
    getList,
    addReadingHistory,
  }
)(Chapter)
