// Simple header component

import React from 'react'
import { browserHistory, Link } from 'react-router'

/* component styles */
import s from './styles.scss'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch(){
    const q = this.refs.searchField.value
    if(q.length > 0){
      browserHistory.push(`/search/${q}`)
    }
  }
  render(){
    return (
      <div className={s.root}>
        <ul className={s.menu}>
          <li>
            <Link to="/releases">
              Releases
            </Link>
          </li>

          <li>
            <input type="text" ref="searchField"/>
            <button onClick={this.handleSearch}>Search</button>
          </li>
        </ul>
      </div>
    )
  }
}
