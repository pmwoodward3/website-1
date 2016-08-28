import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Loading from 'components/Modules/Loading'
import Header from 'components/Modules/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/* global styles for app */
if (__CLIENT__) {
  require('./styles/app.scss')
}

injectTapEventPlugin()

const s = {
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  childrenContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
  }
}

export default class Root extends Component {

  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.object,
    params: PropTypes.object,
    history: PropTypes.object,
  };

  render() {
    return (
      <MuiThemeProvider>
        <section
          className={isTouchAvailable ? 'touch' : 'no-touch'}
          style={s.root}
          >
          {}
          <Helmet
            title="posts"
            />

          <Header/>
          <section style={s.childrenContainer}>
            {this.props.children &&
              React.cloneElement(this.props.children, this.props)}
          </section>
          </section>
        </MuiThemeProvider>
      )
    }
  }
