import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'

import { getManga } from 'redux/actions/manga'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    getManga: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
  }
  componentDidMount(){
    const { getManga, params } = this.props
    getManga(params.mangaid)
  }

  render() {
    const { manga } = this.props

    if(manga.details.mangaid){
      const { details, chapters, sources } = manga
      return (
        <section className={s.root}>
          <Helmet
            title={details.title}
            />
          <h1>{details.title}</h1>
          <img src={details.cover} referrerPolicy="no-referrer"/>
          <p>
            <strong>Author: </strong>
            {details.author}
          </p>
          <p>
            <strong>Artist: </strong>
            {details.artist}
          </p>
          <p>
            <strong>Year: </strong>
            {details.year}
          </p>
          <p>
            <strong>Rating: </strong>
            {Math.round(details.rating * 100) / 100}/10
          </p>
          <p>
            <strong>Genres: </strong>
            {details.genres.join(', ')}
          </p>
          <p>
            <strong>Summary: </strong>
          </p>
          <p>{details.summary}</p>
          {chapters && (
            <div>
              <p>
                <strong>Chapters: </strong>
              </p>
              <ul>
                {chapters.map(({chapternum, title}) => (
                  <li key={chapternum}>
                    <strong>{chapternum}: </strong>
                    <Link to={`/manga/${details.mangaid}/${chapternum}`}>
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {details.recommendations && (
            <div>
              <p><strong>Recommendations:</strong></p>
              <div className={s.list}>
                {details.recommendations.map((item) => (
                  <MangaItemCard key={item.mangaid} {...item}/>
                ))}
              </div>
            </div>
          )}
        </section>
      )
    }else{
      return <h1>Loading</h1>
    }
  }
}

export default connect(
  state => ({
    manga: state.manga,
  }),
  {
    getManga,
  }
)(Manga)
