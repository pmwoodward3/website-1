import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'

import { getManga } from 'redux/actions/manga'
import { addMyListItem } from 'redux/actions/myList'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    getManga: PropTypes.func.isRequired,
    addMyListItem: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleMangaChange = this.handleMangaChange.bind(this)
    this.handleAddToMyList = this.handleAddToMyList.bind(this)
  }
  componentDidMount(){
    this.handleMangaChange()
  }
  componentWillUpdate(newProps){
    if(this.props.params.mangaid != newProps.params.mangaid){
      this.handleMangaChange(newProps)
    }
  }
  handleSourceChange({target}){
    const { getManga, params } = this.props
    getManga(params.mangaid, target.value)
  }
  handleMangaChange(props=this.props){
    const { getManga, params, manga } = props
    getManga(params.mangaid, manga.source)
  }
  handleAddToMyList(){
    const {mangaid, title, cover} = this.props.manga.details
    this.props.addMyListItem({
      mangaid,
      title,
      cover,
    })
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
          <h1>
            {details.title}
            <button onClick={this.handleAddToMyList}>Add To My List</button>
          </h1>
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
              <p><strong>Chapters: </strong></p>
              <p><strong>Source: </strong></p>
              <select onChange={this.handleSourceChange} value={manga.source}>
                {sources.map(({sourceslug, aliasid}) => (
                  <option key={sourceslug} value={sourceslug}>{sourceslug}</option>
                ))}
              </select>
              <ul>
                {chapters.map(({chapternum, title}) => (
                  <li key={chapternum}>
                    <strong>{chapternum}: </strong>
                    <Link to={`/manga/${details.mangaid}/${chapternum}?source=${manga.source}`}>
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
    addMyListItem,
  }
)(Manga)
