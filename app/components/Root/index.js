import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Loading from 'components/Modules/Loading'
import Header from 'components/Modules/Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* global styles for app */
if (__CLIENT__) {
  require('./styles/app.scss')
}

injectTapEventPlugin()

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
        <section>
          {}
          <Helmet
            title="posts"
            />

          <Header/>
          {this.props.children &&
            React.cloneElement(this.props.children, this.props)}
          </section>
        </MuiThemeProvider>
      )
    }
  }
