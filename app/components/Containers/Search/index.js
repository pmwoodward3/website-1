import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'
import debounce from 'debounce'

import * as searchActions from 'redux/actions/search'
import searchSelector from 'redux/selectors/search'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'

export class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    searchItems: PropTypes.func.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
    changeContainerHeight: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.updateQueryLocation = debounce(this.updateQueryLocation, 500)
  }
  componentDidMount(){
    const query = this.props.location.query.q
    if(query && query.length > 0){
      this.props.changeSearchQuery(query)
    }
    this.handleSearch()
    this.props.changeContainerHeight(this.refs.container.clientHeight)
  }
  componentWillUpdate(newProps){
    if(this.props.location.query.q != newProps.location.query.q){
      this.handleSearch(newProps)
    }
  }
  handleSearch(props=this.props){
    const query = props.location.query.q
    if(query && query.length > 0){
      props.searchItems(query)
    }
  }
  handleInfiniteLoad(){
    const { searchItems, location, search } = this.props
    const newPage = search.rows.length + 1

    if(newPage <= search.totalPages){
      searchItems(
        location.query.q,
        newPage,
      )
    }
  }
  handleSearchQueryChange(e, val){
    this.props.changeSearchQuery(val)
    this.updateQueryLocation(val)
  }
  updateQueryLocation(query){
    browserHistory.push(`/search?q=${query}`)
  }

  render() {
    const { search, location } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="Search"
          />
        <div className={s.header}>
          <Paper zDepth={1} className={s.searchField}>
            <TextField
              id="searchField"
              placeholder="Type something..."
              value={search.query}
              onChange={this.handleSearchQueryChange}
              fullWidth={true}
              />
          </Paper>
        </div>
        <div className={s.container} ref="container">
          <Infinite
            containerHeight={search.containerHeight}
            elementHeight={264}
            infiniteLoadBeginEdgeOffset={search.containerHeight}
            onInfiniteLoad={this.handleInfiniteLoad}
            preloadAdditionalHeight={search.containerHeight * 2}
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
