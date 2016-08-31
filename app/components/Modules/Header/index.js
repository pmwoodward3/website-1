import React, { Component, PropTypes } from 'react'
import { browserHistory, Link, IndexLink } from 'react-router'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import ActionHome from 'material-ui/svg-icons/action/home'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress'

/* component styles */
import s from './styles.scss'

class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render(){
    const loading = this.props.loading > 0

    return (
      <Paper
        zDepth={3}
        className={s.root}
        rounded={false}
        style={{
          backgroundColor: this.context.muiTheme.appBar.color,
        }}
        >
        <LinearProgress
          mode="indeterminate"
          className={s.progress}
          style={{
            display: loading ? 'block' : 'none',
            backgroundColor: this.context.muiTheme.flatButton.secondaryTextColor,
          }}
          />
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
      </Paper>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.loading,
  }),
)(Header)
