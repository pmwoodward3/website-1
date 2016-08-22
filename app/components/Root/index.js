import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

import Loading from 'components/Modules/Loading'
import Header from 'components/Modules/Header'

/* global styles for app */
if (__CLIENT__) {
  require('./styles/app.scss')
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
      <section>
        {}
        <Helmet
          title="posts"
          />

        <Header />
        {this.props.children &&
        React.cloneElement(this.props.children, this.props)}
      </section>
    )
  }
}
