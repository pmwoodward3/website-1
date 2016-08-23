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

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { releases, getReleases } = this.props
    getReleases()
  }

  render() {
    const { releases } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="Home"
          />
        <section>
          <p>
            SausageBrain is the premier manga reading platform. We combine the best sources to give you the biggest library available.
          </p>
        </section>
        <section>
          <h2>New Releases</h2>
          <div className={s.list}>
            {
              releases.items.map((item) =>
              <MangaItemCard key={hashit(item)} {...item}/>
            )
          }
        </div>
      </section>
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
)(Home)
