import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import isTouchAvailable from 'utils/isTouchAvailable'
import * as connectionActions from 'redux/actions/connection'

import Header from 'components/Modules/Header'
import BottomNavigation from 'components/Modules/BottomNavigation'
import Snackbar from 'react-mdl/lib/Snackbar'

import theme from './theme'

import './styles/app.scss'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'

const themeColor = theme.palette.primary1Color

const meta = [
  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},
]

const bottomNavHeight = '64px'

class Root extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    offline: PropTypes.bool.isRequired,
    setOnline: PropTypes.func.isRequired,
    setOffline: PropTypes.func.isRequired,
  }
  constructor(props){
    super(props)
    this.connectionHandler = this.connectionHandler.bind(this)
  }
  componentWillMount(){
    //remove mock ui from DOM
    const mocks = document.getElementById('mocks')
    if(mocks) mocks.remove()
  }
  componentDidMount(){
    this.connectionHandler()
    window.addEventListener('online', this.connectionHandler)
    window.addEventListener('offline', this.connectionHandler)
  }
  componentWillUnmount(){
    window.removeEventListener('online', this.connectionHandler)
    window.removeEventListener('offline', this.connectionHandler)
  }
  connectionHandler(){
    if(navigator.onLine){
      this.props.setOnline()
    }else{
      this.props.setOffline()
    }
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
          active={offline}
          style={s.snackbar}
          timeout={60 * 1000}
          onTimeout={() => false}
          >You are offline.</Snackbar>

        {showBottomNav && <BottomNavigation {...props}/>}
      </section>
    )
  }
}
export default connect(
  (state) => ({
    offline: state.offline,
  }),
  {
    ...connectionActions,
  },
)(Root)
