import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'

import { searchItems } from 'redux/actions/search'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'

export class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    searchItems: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  handleSearch(){
    this.props.searchItems(
      this.refs.searchField.value
    )
  }
  handlePageChange(newPage){
    this.props.searchItems(
      this.refs.searchField.value,
      newPage,
    )
  }

  render() {
    const { search } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="search"
          />
        <h1>Search</h1>
        <div>
          <input type="text" ref="searchField"/>
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div className={s.list}>
          {
            search.items.map((item) => (
              <MangaItemCard key={item.mangaid} {...item}/>
            ))
          }
        </div>
        <div className={s.pagination}>
          <button
            onClick={() => this.handlePageChange(search.page - 1)}
            disabled={search.page < 2}
            >Previous</button>
          {
            ((search) => {
              const buttons = []
              for (let i = 1; i <= search.totalPages; i++) {
                buttons.push(
                  <button
                    key={'page'+i}
                    onClick={() => this.handlePageChange(i)}
                    disabled={search.page == i}
                    >{i}</button>
                )
              }
              return buttons
            })(search)
          }
          <button
            onClick={() => this.handlePageChange(search.page + 1)}
            disabled={search.page >= search.totalPages}
            >Next</button>
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    search: state.search,
  }),
  {
    searchItems,
  }
)(Search)
