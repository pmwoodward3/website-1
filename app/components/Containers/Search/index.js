import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import { equals } from 'ramda'
import {
  MANGA_ITEM_CARD_HEIGHT,
  MANGA_ITEM_CARD_WIDTH,
  GENRE_LIST,
  MOCKS,
  TITLE_TEMPLATE,
} from 'constants'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

import * as searchActions from 'redux/actions/search'
import * as headerActions from 'redux/actions/header'
import searchSelector from 'redux/selectors/search'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import { Card } from 'react-mdl/lib/Card'
import Chip from 'react-mdl/lib/Chip'
import Icon from 'react-mdl/lib/Icon'
import Infinite from 'react-infinite'
import TagsInput from 'react-tagsinput'
import Loading from 'components/Modules/Loading'
import Error from 'components/Modules/Error'

export class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    searchItems: PropTypes.func.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
    hideSearchField: PropTypes.func.isRequired,
    showSearchField: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
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
      changeHeader,
    } = this.props

    changeHeader({
      title: 'Search',
      parentPath: '/home',
    })

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
    if(equals(this.props.location.query, newProps.location.query)) return

    this.handleSearch(newProps)
  }
  componentWillUnmount(){
    this.props.hideSearchField()
  }
  handleSearch(props=this.props){
    const { q, g } = props.location.query
    if(q && q){
      props.searchItems(q, 1, this.rowColums, g)
    }
  }
  handleInfiniteLoad(){
    const { searchItems, location, search } = this.props
    const newPage = search.rows.length + 1

    if(newPage > search.totalPages) return

    searchItems(
      location.query.q,
      newPage,
      this.rowColums,
      location.query.g,
    )
  }
  updateGenres(query, genres){
    let { q, g } = this.props.location.query

    genres = genres ? genres.join('\ ') : g

    let URL = `/search?`

    query = query || q
    query = query.trim()

    if(query){
      URL = `${URL}q=${query}`
    }

    if(genres){
      URL = `${URL}&g=${genres}`
    }

    browserHistory.push(URL)
  }
  render() {
    const { search, location } = this.props

    const genreTags = location.query.g ? location.query.g.split('\ ') : MOCKS.array

    return (
      <section className={s.root}>
        <Helmet
          title={`Search ${location.query.q || ''}`}
          titleTemplate={TITLE_TEMPLATE}
          />
        {
          // <div className={s.header}>
          //   <Paper zDepth={1} className={s.genreSection}>
          //     <h3 className={s.sectionTitle}>Genre Filter</h3>
          //     <TagsInput
          //       value={genreTags}
          //       className={s.genreList}
          //       renderInput={({ref, addTag}) => (
          //         <AutoComplete
          //           id="add-genre"
          //           ref={ref}
          //           placeholder="Add genre"
          //           dataSource={GENRE_LIST}
          //           onNewRequest={addTag}
          //           filter={AutoComplete.caseInsensitiveFilter}
          //           />
          //       )}
          //       renderTag={({key, tag, onRemove, getTagDisplayValue}) => (
          //         <Chip
          //           key={key}
          //           className={s.genreChip}
          //           onRequestDelete={() => onRemove(key)}
          //           >
          //           {getTagDisplayValue(tag)}
          //         </Chip>
          //       )}
          //       onChange={(genres) => this.updateGenres(location.query.q, genres)}
          //       onlyUnique
          //       />
          //   </Paper>
          // </div>
        }
        <div className={s.container} ref="container">
          {search.isLoading ? (
            <Loading className={s.loading}/>
          ) : search.query.trim().length < 1 || search.rows.length < 1 ? (
            <div className={s.startContainer}>
              <Icon name="search"/>
              <h1>Just type something...</h1>
            </div>
          ) : search.rows[0].length > 0 ? (
            <Infinite
              elementHeight={MANGA_ITEM_CARD_HEIGHT}
              infiniteLoadBeginEdgeOffset={MANGA_ITEM_CARD_HEIGHT * 2}
              onInfiniteLoad={this.handleInfiniteLoad}
              preloadAdditionalHeight={MANGA_ITEM_CARD_HEIGHT * 4}
              useWindowAsScrollContainer
              >
              {search.rows.map((colums, index) => (
                <div className={s.row} key={`row-${index}`}>
                  {colums.map((item) => (
                    <MangaItemCard key={item.mangaid} {...item}/>
                  ))}
                </div>
              ))}
            </Infinite>
          ) : (
            <Error
              title="Nothing found"
              className={s.error}
              setTitle={false}
              />
          )}
        </div>
      </section>
    )
  }
}

const PureSearch = onlyUpdateForKeys([
  'search',
  'location',
])(Search)

export default connect(
  state => ({
    search: searchSelector(state),
  }),
  {
    ...headerActions,
    ...searchActions,
  }
)(PureSearch)
