import React, { Component, PropTypes } from 'react'
import { hashHistory, Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'
import debounce from 'debounce'

import * as searchActions from 'redux/actions/search'

import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

/* component styles */
import s from './styles.scss'

class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    loading: PropTypes.number.isRequired,
    search: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.updateQueryLocation = debounce(this.updateQueryLocation, 500)
  }
  handleSearchQueryChange(e, val){
    this.props.changeSearchQuery(val)
    this.updateQueryLocation(val)
  }
  updateQueryLocation(query, genres){
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
  render(){
    const loading = this.props.loading > 0
    const { search, location } = this.props

    return (
      <div className={s.root}>
        <LinearProgress
          mode="indeterminate"
          className={s.progress}
          color={this.context.muiTheme.flatButton.secondaryTextColor}
          style={{
            display: loading ? 'block' : 'none',
          }}
          />
        <AppBar
          className={s.appBar}
          zDepth={2}
          iconElementLeft={
            <IndexLink to="/home">
              <IconButton>
                <NavigationArrowBack />
              </IconButton>
            </IndexLink>
          }
          iconElementRight={
            <div className={s.searchSection}>
              {search.showSearchField && (
                <Paper zDepth={0} className={s.searchField}>
                  <TextField
                    id="searchField"
                    placeholder="Type something..."
                    value={search.query}
                    onChange={this.handleSearchQueryChange}
                    fullWidth
                    autoFocus
                    />
                </Paper>
              )}
              <Link to="/search">
                <IconButton disabled={search.showSearchField}>
                  <ActionSearch/>
                </IconButton>
              </Link>
            </div>
          }
          />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.loading,
    search: state.search,
  }),
  {
    ...searchActions,
  }
)(Header)
