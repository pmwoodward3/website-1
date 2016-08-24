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
        <section>
          <h3>Continue Reading</h3>
          <div className={s.list}>
            {readingHistory.items.map(({chapternum, pagenum, mangaid}) =>
              <MangaItemCard
                key={'readingHistory'+mangaid}
                title="test"
                mangaid={mangaid}
                chapternum={chapternum}
                pagenum={pagenum + 1}/>
            )}
          </div>
        </section>
        <section>
          <h3>My List</h3>
          <div className={s.list}>
            {myList.items.map((item) =>
              <MangaItemCard key={'myList'+item.mangaid} {...item}/>
            )}
          </div>
        </section>
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
    releases: state.releases,
    myList: state.myList,
    readingHistory: state.readingHistory,
  }),
  {
    getReleases,
  }
)(Home)
