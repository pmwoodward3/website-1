import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import screenfull from 'screenfull'
import isTouchAvailable from 'utils/isTouchAvailable'

import Helmet from 'react-helmet'
import Loading from 'components/Modules/Loading'
import Paper from 'material-ui/Paper'
import Swipe from 'react-swipe'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import HardwareArrowBack from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import * as chapterActionCreators from 'redux/actions/chapter'
import * as headerActions from 'redux/actions/header'
import { addReadingHistory } from 'redux/actions/readingHistory'
import { getList } from 'redux/actions/list'
import chapterSelector from 'redux/selectors/chapter'

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
    this.setHeaderTitle = this.setHeaderTitle.bind(this)
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this)
  }
  componentDidMount(){
    const { params, changeHeader } = this.props
    if(params.pagenum){
      this.handleChapterChange()
    }

    if(screenfull.enabled){
      changeHeader({
        showFullScreenButton: true,
      })
      document.addEventListener(screenfull.raw.fullscreenchange, this.handleFullScreenChange)
    }

    this.setHeaderTitle()
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
    if(this.props.manga != newProps.manga || isNewChapter){
      this.setHeaderTitle(newProps)
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
      document.removeEventListener(screenfull.raw.fullscreenchange, this.handleFullScreenChange)
    }
  }
  handleFullScreenChange(){
    if(screenfull.isFullscreen){
      this.props.enterFullscreen()
    }else{
      this.props.exitFullscreen()
    }
  }
  setHeaderTitle(props=this.props){
    props.changeHeader({
      title: (
        <span className={s.headerTitle}>
          {props.manga ? props.manga.title : 'Manga'}
          <HardwareArrowBack/>
          {`Chapter ${props.params.chapternum}`}
        </span>
      ),
      parentPath: `/manga/${props.params.mangaid}`,
    })
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
  changePage(newPage, newChapternum){
    const { chapter, params, location, addReadingHistory } = this.props

    hashHistory.push(`/manga/${params.mangaid}/${newChapternum || params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)

    const chapternum = parseInt(params.chapternum)
    const pagenum = parseInt(params.pagenum)
    const mangaid = parseInt(params.mangaid)

    if(chapter.items.length > 0 && chapternum && pagenum && mangaid){
      addReadingHistory({
        mangaid,
        chapternum,
        pagenum,
        source: location.query.source,
      })
    }
  }
  onChangeIndex(index){
    const { params, chapter } = this.props

    const chapternum = parseInt(params.chapternum)
    const pagenum = parseInt(params.pagenum)

    if(chapter.items.length > 0 && pagenum > chapter.items.length){
      this.changePage(1, chapternum + 1)
    }else{
      this.changePage(index + 1)
    }
  }
  handleFullScreen(){
    if (screenfull.enabled) {
      screenfull.request(this.refs.container)
    }
  }
  handleNextPage(){
    this.refs.swiper.next()
  }
  handlePreviousPage(){
    this.refs.swiper.prev()
  }
  render() {
    const { chapter, params } = this.props

    const chapternum = parseInt(params.chapternum)
    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0

    return (
      <section className={s.section}>
        <Helmet
          title={`SB - Ch. ${chapternum} - P. ${pagenum}`}
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
          {isChapterLoaded ? (
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
              ]).map(({url}, index) => (
                <div className={s.pageContainer} key={index+url}>
                  <Paper className={s.paper} zDepth={2}>
                    {index >= chapter.items.length ? (
                      <div/>
                    ) : ((index + 1) >= pagenum && (index + 1) <= (pagenum + 3)) ? (
                      <img
                        draggable={false}
                        className={s.img}
                        src={url}
                        referrerPolicy="no-referrer"
                        ref="img"
                        />
                    ) : (
                      <div></div>
                    )}
                  </Paper>
                </div>
              ))}
            </Swipe>
          ) : (
            <Loading/>
          )}
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
    chapter: chapterSelector(state),
    manga: state.mangaTable.items[parseInt(params.mangaid)],
  }),
  {
    ...chapterActionCreators,
    ...headerActions,
    getList,
    addReadingHistory,
  }
)(PureChapter)
