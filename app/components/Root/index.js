import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Loading from 'components/Modules/Loading'
import Header from 'components/Modules/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import LinearProgress from 'material-ui/LinearProgress'

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
  },
}

const Root = ({loading, children, ...props}) => (
  <MuiThemeProvider>
    <section
      className={isTouchAvailable ? 'touch' : 'no-touch'}
      style={s.root}
      >
      <Helmet
        title="posts"
        />

      <LinearProgress
        mode="indeterminate"
        style={{
          display: loading > 0 ? 'block' : 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 10000,
        }}
        />
      <Header/>
      <section style={s.childrenContainer}>
        {children && React.cloneElement(children, props)}
      </section>
    </section>
  </MuiThemeProvider>
)

export default connect(
  (state) => ({
    loading: state.loading,
  }),
)(Root)
