import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import isTouchAvailable from 'utils/isTouchAvailable'
import toClass from 'utils/toClass'
import * as connectionActions from 'redux/actions/connection'

import Header from 'components/Modules/Header'
import BottomNavigation from 'components/Modules/BottomNavigation'
import Snackbar from 'react-mdl/lib/Snackbar'

import theme from './theme'

//Global styles
import './styles/app.scss'

import s from './styles.scss'

import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'

const themeColor = theme.palette.primary1Color

const meta = [
  //Navigation and status bar color
  {name: 'theme-color', content: themeColor},
  {name: 'msapplication-navbutton-color', content: themeColor},
]

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

    return (
      <section
        className={toClass(s.root, isTouchAvailable ? 'touch' : 'no-touch')}
        >
        <Helmet
          title="Shiba"
          description="Premier manga reading platform."
          meta={meta}
          />

        <Header {...props}/>

        <section className={toClass(s.childrenContainer, showBottomNav && s.showBottomNav)}>
          {children && React.cloneElement(children, props)}
        </section>

        <Snackbar
          active={offline}
          className={toClass(s.snackbar, showBottomNav && s.showBottomNav)}
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
