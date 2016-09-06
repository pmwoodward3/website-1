import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Header from 'components/Modules/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import theme from './theme'

import 'statics/manifest.json'
import './styles/app.scss'

injectTapEventPlugin()

const s = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  childrenContainer: {
    marginTop:'64px',
    display: 'flex',
    flexDirection: 'column',
  },
}

const themeColor = theme.palette.primary1Color

const link = [
  //Favicon and Icon
  {rel: 'icon', type: 'image/png', sizes: '192x192', href: require('statics/icon-192x192.png')},
  {rel: 'icon', type: 'image/png', sizes: '32x32', href: require('statics/icon-48x48.png')},
  {rel: 'icon', type: 'image/png', sizes: '96x96', href: require('statics/icon-96x96.png')},
  {rel: 'icon', type: 'image/png', sizes: '16x16', href: require('statics/icon-16x16.png')},
]

const meta = [
  //Viewport
  {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui'},

  //The follwing meta tags are just a backup for the web manifest

  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},

  //Allow 'add to homescreen' functinality
  {name: 'mobile-web-app-capable', content: 'yes'},
]

const Root = ({children, ...props}) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <section
      className={isTouchAvailable ? 'touch' : 'no-touch'}
      style={s.root}
      >
      <Helmet
        title="SB"
        description="Premier manga reading platform."
        meta={meta}
        link={link}
        />

      <Header {...props}/>
      <section style={s.childrenContainer}>
        {children && React.cloneElement(children, props)}
      </section>
    </section>
  </MuiThemeProvider>
)

export default Root
