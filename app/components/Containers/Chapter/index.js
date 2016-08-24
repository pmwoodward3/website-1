import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'

import {
  getChapter,
  nextChapterPage,
  previousChapterPage,
} from 'redux/actions/chapter'

import BreadCrumbs from 'components/Modules/BreadCrumbs'
import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    nextChapterPage: PropTypes.func.isRequired,
    previousChapterPage: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleNextPage = props.nextChapterPage
    this.handlePreviousPage = props.previousChapterPage
    this.handleChapterChange = this.handleChapterChange.bind(this)
    this.handleImgLoad = this.handleImgLoad.bind(this)
  }
  componentDidMount(){
    this.handleChapterChange()
  }
  componentWillUpdate(newProps){
    const isNewManga = this.props.params.mangaid != newProps.params.mangaid
    const isNewChapter = this.props.params.chapternum != newProps.params.chapternum
    const isNewSource = this.props.location.query.source != newProps.location.query.source
    if(isNewChapter || isNewManga || isNewSource){
      this.handleChapterChange(newProps)
    }
  }
  handleChapterChange(props=this.props){
    const { getChapter, params, location } = props
    getChapter(params.mangaid, params.chapternum, location.query.source)
  }
  handleImgLoad(){
    this.refs.viewer.scrollTop = 0
  }

  render() {
    const { chapter, params } = this.props
    const hierarchy = [
      {title: 'Berserk', url: ``},
      {title: `Chapter ${params.chapternum}`, url: ''},
    ]

    if(chapter.items.length > 0){
      const {url} = chapter.items[chapter.pagenum - 1]
      return (
        <section className={s.section}>
          <Helmet
            title="Chapter"
            />
          <BreadCrumbs items={hierarchy}/>
          <h1>Page: {chapter.pagenum}</h1>
          <div className={s.container}>
            <button
              className={s.controlBtn}
              onClick={this.handlePreviousPage}
              disabled={chapter.pagenum < 2}
              >Previous</button>
            <div className={s.viewer} ref="viewer">
              <img src={url} referrerPolicy="no-referrer" onLoad={this.handleImgLoad}/>
            </div>
            <button
              className={s.controlBtn}
              onClick={this.handleNextPage}
              disabled={chapter.pagenum >= chapter.items.length}
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
    nextChapterPage,
    previousChapterPage,
  }
)(Chapter)
