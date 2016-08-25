import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'
import { Link } from 'react-router'

import { getReleases } from 'redux/actions/releases'
import myListSelector from 'redux/selectors/myList'
import releasesSelector from 'redux/selectors/releases'
import readingHistorySelector from 'redux/selectors/readingHistory'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    myList: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { releases, getReleases } = this.props
    getReleases()
  }

  render() {
    const { releases, myList, readingHistory } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="Home"
          />
        {readingHistory.items.length > 0 && <section>
          <h3>Continue Reading</h3>
          <div className={s.list}>
            {readingHistory.items.map(({pagenum, ...item}) =>
              <MangaItemCard
                key={'readingHistory'+item.mangaid}
                pagenum={pagenum + 1}
                {...item}/>
            )}
          </div>
        </section>}
        {myList.items.length > 0 && <section>
          <h3>My List</h3>
          <div className={s.list}>
            {myList.items.map((item) =>
              item && <MangaItemCard key={'myList'+item.mangaid} {...item}/>
            )}
          </div>
        </section>}
        <section>
          <h3>New Releases</h3>
          <div className={s.list}>
            {releases.items.map((item) =>
              <MangaItemCard key={'newReleases'+hashit(item)} {...item}/>
            )}
          </div>
        </section>
        <section>
          <h3>Recomended For You</h3>
          <div className={s.list}>
            {releases.items.map((item) =>
              <MangaItemCard key={'recomended'+hashit(item)} {...item}/>
            )}
          </div>
        </section>
        <section>
          <h3>Popular Right Now</h3>
          <div className={s.list}>
            {releases.items.map((item) =>
              <MangaItemCard key={'popular'+hashit(item)} {...item}/>
            )}
          </div>
        </section>
      </section>
    )
  }
}

export default connect(
  state => ({
    releases: releasesSelector(state),
    myList: myListSelector(state),
    readingHistory: readingHistorySelector(state),
  }),
  {
    getReleases,
  }
)(Home)
