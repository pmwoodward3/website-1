import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Header from 'components/Modules/Header'
import BottomNavigation from 'components/Modules/BottomNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import theme from './theme'

import './styles/app.scss'

injectTapEventPlugin()

const themeColor = theme.palette.primary1Color

import 'statics/manifest.json'

const meta = [
  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},
]

const Root = ({children, offline, ...props}) => {

  const showBottomNav = /\/(home|favorites|search)/i.test(props.location.pathname)

  const bottomNavHeight = '56px'

  const s = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    childrenContainer: {
      marginTop: bottomNavHeight,
      marginBottom: showBottomNav ? bottomNavHeight : '0px',
      display: 'flex',
      flexDirection: 'column',
    },
    snackbar: {
      marginBottom: showBottomNav ? bottomNavHeight : '0px',
    },
  }

  return (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <section
        className={isTouchAvailable ? 'touch' : 'no-touch'}
        style={s.root}
        >
        <Helmet
          title="SB"
          description="Premier manga reading platform."
          meta={meta}
          />

        <Header {...props}/>

        <section style={s.childrenContainer}>
          {children && React.cloneElement(children, props)}
        </section>

        {showBottomNav && <BottomNavigation {...props}/>}
        <Snackbar
          open={offline}
          message="You are offline."
          style={s.snackbar}
          />
      </section>
    </MuiThemeProvider>
  )
}

export default connect(
  (state) => ({
    offline: state.offline,
  })
)(Root)
