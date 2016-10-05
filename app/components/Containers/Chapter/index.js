import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import screenfull from 'screenfull'
import isTouchAvailable from 'utils/isTouchAvailable'
import toClass from 'utils/toClass'

import Helmet from 'react-helmet'
import Loading from 'components/Modules/Loading'

import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/Icon'
import { Card } from 'react-mdl/lib/Card'

import Hammer from 'react-hammerjs'

import * as chapterActionCreators from 'redux/actions/chapter'
import * as headerActions from 'redux/actions/header'
import { addReadingHistory } from 'redux/actions/readingHistory'
import { getList } from 'redux/actions/list'
import chapterSelector from 'redux/selectors/chapter'

import s from './styles.scss'

const ControlBtn = ({direction='forward', pagenum=0, onClick}) => (
  <div className={s.controlBtn}>
    <FABButton
      onClick={onClick}
      disabled={direction == 'back' && pagenum < 2}
      colored
      >
      <Icon name={`arrow_${direction}`}/>
    </FABButton>
  </div>
)

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    addReadingHistory: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.changePage = this.changePage.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.setHeaderTitle = this.setHeaderTitle.bind(this)
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this)
    this.handleTap = this.handleTap.bind(this)
    this.handleSwipe = this.handleSwipe.bind(this)
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

    const isNewPage = this.props.params.pagenum != newProps.params.pagenum

    if(isNewChapter ||isNewPage || isChapterLoaded){
      this.setHeaderTitle(newProps)
    }

    if(this.props.chapter.scale !== newProps.chapter.scale){
      newProps.changeHeader({
        showZoomOutButton: newProps.chapter.scale > 1,
      })
    }
  }
  componentWillUnmount(){
    if (screenfull.enabled) {
      this.props.changeHeader({
        showFullScreenButton: false,
        showZoomOutButton: false,
      })
      document.removeEventListener(screenfull.raw.fullscreenchange, this.handleFullScreenChange)
    }
  }
  setHeaderTitle(props=this.props){
    props.changeHeader({
      title: props.params.pagenum + '/' + props.chapter.items.length,
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
    const { chapter, params, location, addReadingHistory, setScale } = this.props

    const chapternum = parseInt(params.chapternum)
    const pagenum = parseInt(params.pagenum)
    const mangaid = parseInt(params.mangaid)

    browserHistory.push(`/manga/${params.mangaid}/${newChapternum || params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)

    setScale(1)

    this.refs.pageContainer.scrollTop = 0
    this.refs.pageContainer.scrollLeft = 0

    if(chapter.items.length > 0 && !isNaN(chapternum) && !isNaN(pagenum) && !isNaN(mangaid)){
      addReadingHistory({
        mangaid,
        chapternum,
        pagenum,
        totalPages: chapter.items.length,
        source: location.query.source,
      })
    }
  }
  handleFullScreenChange(){
    if(screenfull.isFullscreen){
      this.props.enterFullscreen()
    }else{
      this.props.exitFullscreen()
    }
  }
  handleNextPage(){
    const pagenum = parseInt(this.props.params.pagenum)
    const chapternum = parseInt(this.props.params.chapternum)

    if(!isNaN(pagenum) && !isNaN(chapternum)){
      if(pagenum >= this.props.chapter.items.length){
        this.changePage(1, chapternum + 1)
      }else{
        this.changePage(pagenum + 1)
      }
    }
  }
  handlePreviousPage(){
    const pagenum = parseInt(this.props.params.pagenum)
    if(!isNaN(pagenum)) this.changePage(pagenum - 1)
  }
  handleTap(e){
    const bb = e.target.getBoundingClientRect()
    const container = this.refs.pageContainer

    //If the scaling value is not 2 than manual correction has to be done to keep it centered.
    const newScale = this.props.chapter.scale * 2

    if(newScale > 4) return

    this.props.setScale(newScale)

    //Pointer location - container location + scroll location
    const pos = {
      x: e.center.x - bb.left + container.scrollLeft,
      y: e.center.y - bb.top + container.scrollTop,
    }

    container.scrollTop = pos.y
    container.scrollLeft = pos.x
  }
  handleSwipe(e){
    if(this.props.chapter.scale !== 1) return

    if(e.velocityX > 0){
      this.handlePreviousPage()
    }else{
      this.handleNextPage()
    }
  }
  render() {
    const { chapter, params } = this.props

    const chapternum = parseInt(params.chapternum)
    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0

    const hammerOptions = {
      touchAction: chapter.scale > 1 ? 'auto' : 'compute',
    }

    const imgStyle = {
      height: `${chapter.scale * 100}%`,
      width: `${chapter.scale * 100}%`,
    }

    return (
      <section className={s.section}>
        <Helmet
          title={`SB - Ch. ${chapternum} - P. ${pagenum}`}
          />
        <div className={s.container} ref="container">
          {!isTouchAvailable && <ControlBtn
            pagenum={pagenum}
            direction="back"
            onClick={this.handlePreviousPage}
            />}
          {isChapterLoaded && chapter.items[pagenum -1] ? (
            <Hammer
              onTap={this.handleTap}
              onSwipe={this.handleSwipe}
              options={hammerOptions}
              >
              <div
                ref="pageContainer"
                className={toClass(s.pageContainer, isTouchAvailable && s.touchAvailable)}
                >
                <Card className={s.paper} shadow={2}>
                  <img
                    draggable={false}
                    className={s.img}
                    style={imgStyle}
                    src={chapter.items[pagenum - 1].url}
                    referrerPolicy="no-referrer"
                    ref="img"
                    />
                </Card>
              </div>
            </Hammer>
          ) : (
            <div
              className={toClass(s.pageContainer, isTouchAvailable && s.touchAvailable)}
              >
              <Loading/>
            </div>
          )}
          {!isTouchAvailable && <ControlBtn
            pagenum={pagenum}
            direction="forward"
            onClick={this.handleNextPage}
            />}
        </div>
      </section>
    )
  }
}

const PureChapter = onlyUpdateForKeys([
  'location',
  'chapter',
  'params',
  'location',
])(Chapter)

export default connect(
  (state) => ({
    chapter: chapterSelector(state),
  }),
  {
    ...chapterActionCreators,
    ...headerActions,
    getList,
    addReadingHistory,
  }
)(PureChapter)
