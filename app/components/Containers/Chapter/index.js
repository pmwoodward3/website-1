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
import { addReadingHistory } from 'redux/actions/readingHistory'

import s from './styles.scss'

export class Chapter extends Component {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    getChapter: PropTypes.func.isRequired,
    nextChapterPage: PropTypes.func.isRequired,
    previousChapterPage: PropTypes.func.isRequired,
    addReadingHistory: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleNextPage = props.nextChapterPage
    this.handlePreviousPage = props.previousChapterPage
    this.handleChapterChange = this.handleChapterChange.bind(this)
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

  render() {
    const { chapter, params } = this.props

    if(chapter.items.length > 0){
      const {url} = chapter.items[chapter.pagenum - 1]
      return (
        <section className={s.section}>
          <Helmet
            title="Chapter"
            />
          <h1>Chapter: {params.chapternum}, Page: {chapter.pagenum}</h1>
          <div className={s.container}>
            <button
              className={s.controlBtn}
              onClick={this.handlePreviousPage}
              >Previous</button>
            <div className={s.viewer}>
              <img src={url} referrerPolicy="no-referrer"/>
            </div>
            <button
              className={s.controlBtn}
              onClick={this.handleNextPage}
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
    addReadingHistory,
  }
)(Chapter)
