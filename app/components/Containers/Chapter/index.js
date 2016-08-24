import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'

import {
  getChapter,
} from 'redux/actions/chapter'
import { addReadingHistory } from 'redux/actions/readingHistory'

import BreadCrumbs from 'components/Modules/BreadCrumbs'
import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    addReadingHistory: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleNextPage = this.handleNextPage.bind(this)
    this.handlePreviousPage = this.handlePreviousPage.bind(this)
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.handleImgLoad = this.handleImgLoad.bind(this)
    this.changePage = this.changePage.bind(this)
  }
  componentDidMount(){
    const { params } = this.props
    if(params.pagenum){
      this.handleChapterChange()
    }else{
      this.changePage(1)
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
  }
  handleChapterChange(props=this.props){
    const { getChapter, params, location } = props
    getChapter(params.mangaid, params.chapternum, location.query.source)
  }
  handleImgLoad(){
    const { addReadingHistory, params, chapter } = this.props
    this.refs.viewer.scrollTop = 0

    if(chapter.items.length > 0){
      addReadingHistory({
        mangaid: parseInt(params.mangaid),
        chapternum: parseInt(params.chapternum),
        pagenum: parseInt(params.pagenum),
      })
    }
  }
  changePage(newPage){
    const { params, location } = this.props
    browserHistory.push(`/manga/${params.mangaid}/${params.chapternum}/${newPage}${location.query.source ? '?source=' + location.query.source : ''}`)
  }
  handleNextPage(){
    const { params, location } = this.props
    this.changePage(parseInt(params.pagenum) + 1)
  }
  handlePreviousPage(){
    const { params } = this.props
    this.changePage(parseInt(params.pagenum) - 1)
  }

  render() {
    const { chapter, params } = this.props
    const hierarchy = [
      {title: 'Berserk', url: ``},
      {title: `Chapter ${params.chapternum}`, url: ''},
    ]

    const pagenum = parseInt(params.pagenum)

    const isChapterLoaded = chapter.items.length > 0
    const hasPagenum = pagenum
    const isPagenumValid = pagenum > 0 && pagenum <= chapter.items.length

    if(isChapterLoaded && hasPagenum && isPagenumValid){
      const {url} = chapter.items[pagenum - 1]
      return (
        <section className={s.section}>
          <Helmet
            title="Chapter"
            />
          <BreadCrumbs items={hierarchy}/>
          <h1>Page: {pagenum}</h1>
          <div className={s.container}>
            <button
              className={s.controlBtn}
              onClick={this.handlePreviousPage}
              disabled={pagenum < 2}
              >Previous</button>
            <div className={s.viewer} ref="viewer">
              <img src={url} referrerPolicy="no-referrer" onLoad={this.handleImgLoad}/>
            </div>
            <button
              className={s.controlBtn}
              onClick={this.handleNextPage}
              disabled={pagenum >= chapter.items.length}
              >Next</button>
          </div>
        </section>
      )
    }else{
      return <h1>Loading</h1>
    }
  }
}

export default connect(
  state => ({
    chapter: state.chapter,
  }),
  {
    getChapter,
    addReadingHistory,
  }
)(Chapter)
