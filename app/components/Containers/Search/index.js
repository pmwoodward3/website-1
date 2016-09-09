import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Helmet from 'react-helmet'
import R from 'ramda'
import {
  MANGA_ITEM_CARD_HEIGHT,
  MANGA_ITEM_CARD_WIDTH,
  GENRE_LIST,
} from 'constants'

import * as searchActions from 'redux/actions/search'
import searchSelector from 'redux/selectors/search'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Infinite from 'react-infinite'
import TagsInput from 'react-tagsinput'
import AutoComplete from 'material-ui/AutoComplete'

export class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    searchItems: PropTypes.func.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
    hideSearchField: PropTypes.func.isRequired,
    showSearchField: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
    this.updateGenres = this.updateGenres.bind(this)
  }
  componentDidMount(){
    const {
      location,
      changeSearchQuery,
      showSearchField,
    } = this.props

    showSearchField()

    //Amount of manga items to display in a row
    this.rowColums = Math.floor(this.refs.container.clientWidth / MANGA_ITEM_CARD_WIDTH)

    const query = location.query.q
    if(query && query.length > 0){
      changeSearchQuery(query)
    }
    this.handleSearch()
  }
  componentWillUpdate(newProps){
    if(!R.equals(this.props.location.query, newProps.location.query)){
      this.handleSearch(newProps)
    }
  }
  componentWillUnmount(){
    this.props.hideSearchField()
  }
  handleSearch(props=this.props){
    const { q, g } = props.location.query
    if(q && q.length > 0){
      props.searchItems(q, 1, this.rowColums, g)
    }
  }
  handleInfiniteLoad(){
    const { searchItems, location, search } = this.props
    const newPage = search.rows.length + 1

    if(newPage <= search.totalPages){
      searchItems(
        location.query.q,
        newPage,
        this.rowColums,
        location.query.g,
      )
    }
  }
  updateGenres(query, genres){
    let { q, g } = this.props.location.query

    let URL = `/search?q=${query || q}`

    if(genres){
      genres = genres.join('\ ')
    }else{
      genres = g
    }

    if(genres){
      URL = `${URL}&g=${genres}`
    }

    hashHistory.push(URL)
  }
  render() {
    const { search, location } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title={`SB - Search ${location.query.q}`}
          />
        <div className={s.header}>
          <Paper zDepth={1} className={s.genreSection}>
            <h3 className={s.sectionTitle}>Genre Filter</h3>
            <TagsInput
              value={location.query.g ? location.query.g.split('\ ') : []}
              className={s.genreList}
              renderInput={({ref, addTag}) => (
                <AutoComplete
                  id="add-genre"
                  ref={ref}
                  placeholder="Add genre"
                  dataSource={GENRE_LIST}
                  onNewRequest={addTag}
                  filter={AutoComplete.caseInsensitiveFilter}
                  />
              )}
              renderTag={({key, tag, onRemove, getTagDisplayValue}) => (
                <Chip
                  key={key}
                  className={s.genreChip}
                  onRequestDelete={() => onRemove(key)}
                  >
                  {getTagDisplayValue(tag)}
                </Chip>
              )}
              onChange={(genres) => this.updateGenres(location.query.q, genres)}
              onlyUnique
              />
          </Paper>
        </div>
        <div className={s.container} ref="container">
          <Infinite
            elementHeight={MANGA_ITEM_CARD_HEIGHT}
            infiniteLoadBeginEdgeOffset={MANGA_ITEM_CARD_HEIGHT * 2}
            onInfiniteLoad={this.handleInfiniteLoad}
            preloadAdditionalHeight={MANGA_ITEM_CARD_HEIGHT * 2}
            useWindowAsScrollContainer
            >
            {
              search.rows.map((colums, index) => (
                <List key={'row'+index}>
                  {colums.map((item) => (
                    <MangaItemCard key={item.mangaid} {...item}/>
                  ))}
                </List>
              ))
            }
          </Infinite>
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    search: searchSelector(state),
  }),
  {
    ...searchActions,
  }
)(Search)
