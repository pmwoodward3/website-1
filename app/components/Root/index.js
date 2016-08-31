import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Loading from 'components/Modules/Loading'
import Header from 'components/Modules/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import theme from './theme'

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

const themeColor = theme.palette.primary2Color

const meta = [
  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},
  {name: 'apple-mobile-web-app-status-bar-style', content: themeColor},

  //Viewport
  {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui'},

  //Allow 'add to homescreen' functinality
  {name: 'apple-mobile-web-app-capable', content: 'yes'},
  {name: 'mobile-web-app-capable', content: 'yes'},
]

const Root = ({children, ...props}) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <section
      className={isTouchAvailable ? 'touch' : 'no-touch'}
      style={s.root}
      >
      <Helmet
        title="SausageBrain"
        meta={meta}
        />

      <Header/>
      <section style={s.childrenContainer}>
        {children && React.cloneElement(children, props)}
      </section>
    </section>
  </MuiThemeProvider>
)

export default Root
