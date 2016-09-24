import React, { Component, PropTypes } from 'react'
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

const meta = [
  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},
]

const mockFun = () => {}

const bottomNavHeight = '56px'

class Root extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    offline: PropTypes.bool.isRequired,
  }
  componentWillMount(){
    //remove mock ui from DOM
    const mocks = document.getElementById('mocks')
    if(mocks) mocks.remove()
  }
  render(){
    const { children, offline, ...props} = this.props

    const showBottomNav = /\/(home|favorites|search)/i.test(props.location.pathname)

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

          <Snackbar
            open={offline}
            message="You are offline."
            style={s.snackbar}
            onRequestClose={mockFun}
            />

          {showBottomNav && <BottomNavigation {...props}/>}
        </section>
      </MuiThemeProvider>
    )
  }
}
export default connect(
  (state) => ({
    offline: state.offline,
  })
)(Root)
