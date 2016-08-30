import React, { Component, PropTypes } from 'react'
import { browserHistory, Link, IndexLink } from 'react-router'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionHome from 'material-ui/svg-icons/action/home'

/* component styles */
import s from './styles.scss'

export default class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render(){
    const headerStyle = {
      backgroundColor: this.context.muiTheme.appBar.color,
    }

    return (
      <div className={s.root} style={headerStyle}>
        <IndexLink to="/" activeClassName={s.active}>
          <IconButton>
            <ActionHome />
          </IconButton>
        </IndexLink>

        <Link to="/search" activeClassName={s.active}>
          <IconButton>
            <ActionSearch/>
          </IconButton>
        </Link>
      </div>
    )
  }
}
