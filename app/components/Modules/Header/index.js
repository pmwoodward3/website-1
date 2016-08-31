import React, { Component, PropTypes } from 'react'
import { browserHistory, Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionHome from 'material-ui/svg-icons/action/home'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'

/* component styles */
import s from './styles.scss'

class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render(){
    const loading = this.props.loading > 0

    return (
      <div className={s.root}>
        <AppBar
          title="Home"
          iconElementLeft={
            <IndexLink to="/">
              <IconButton>
                <ActionHome />
              </IconButton>
            </IndexLink>
          }
          iconElementRight={
            <Link to="/search">
              <IconButton>
                <ActionSearch/>
              </IconButton>
            </Link>
          }
          />
        <LinearProgress
          mode="indeterminate"
          className={s.progress}
          style={{
            display: loading ? 'block' : 'none',
            backgroundColor: this.context.muiTheme.flatButton.secondaryTextColor,
          }}
          />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.loading,
  }),
)(Header)
