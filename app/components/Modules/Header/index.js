import React from 'react'
import { browserHistory, Link, IndexLink } from 'react-router'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import FlatButton from 'material-ui/FlatButton'

/* component styles */
import s from './styles.scss'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this)
  }
  handleSearchFieldChange(e){
    this.setState({
      searchQuery: e.target.value,
    })
  }
  handleSearch(){
    const searchQuery = this.state.searchQuery
    if(searchQuery.length > 0){
      browserHistory.push(`/search/${searchQuery}`)
    }
  }
  render(){
    return (
      <div className={s.root}>
        <IndexLink to="/" activeClassName={s.active}>
          <FlatButton label="Home" />
        </IndexLink>

        <div className={s.search}>
          <TextField
            hintText="Search"
            ref="searchField"
            value={this.state.searchQuery}
            onChange={this.handleSearchFieldChange}
            />
          <IconButton onClick={this.handleSearch}>
            <ActionSearch/>
          </IconButton>
        </div>
      </div>
    )
  }
}
