import React from 'react'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import isTouchAvailable from 'utils/isTouchAvailable'

import Header from 'components/Modules/Header'
import BottomNavigation from 'components/Modules/BottomNavigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
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

const Root = ({children, ...props}) => {

  const s = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    childrenContainer: {
      marginTop: '64px',
      marginBottom: '56px',
      display: 'flex',
      flexDirection: 'column',
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

        <BottomNavigation {...props}/>
      </section>
    </MuiThemeProvider>
  )
}

export default Root
