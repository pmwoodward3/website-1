import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'
import { Link } from 'react-router'

import { getReleases } from 'redux/actions/releases'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'

export class Releases extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { releases, getReleases } = this.props

    if (R.isEmpty(releases.items)) {
      getReleases()
    }
  }

  render() {
    const { releases } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="releases"
          />
        <h1>New Releases</h1>
        <div className={s.list}>
          {
            releases.items.map((item) =>
            <MangaItemCard key={hashit(item)} {...item}/>
          )
        }
      </div>
    </section>
  )
}
}

export default connect(
  state => ({
    releases: state.releases,
  }),
  {
    getReleases,
  }
)(Releases)
