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
import recommendationsSelector from 'redux/selectors/recommendations'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    myList: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { releases, getReleases, recommendations, getRecommendations } = this.props
    if(releases.items.length < 1){
      getReleases()
    }
  }

  render() {
    const { releases, myList, readingHistory, recommendations } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="Home"
          />
        {readingHistory.items.length > 0 && <section>
          <h3>Continue Reading</h3>
          <List>
            {readingHistory.items.map(({pagenum, ...item}) => (
              <MangaItemCard
                key={'readingHistory'+item.mangaid}
                pagenum={pagenum + 1}
                {...item}
                />
            ))}
          </List>
        </section>}
        {myList.items.length > 0 && (
          <section>
            <h3>My List</h3>
            <List>
              {myList.items.map((item) => item && (
                <MangaItemCard key={'myList'+item.mangaid} {...item}/>
              ))}
            </List>
          </section>
        )}
        {releases.items.length > 0 && (
          <section>
            <h3>New Releases</h3>
            <div className={s.list}>
              <List>
                {releases.items.map((item) => item && (
                  <MangaItemCard key={'newReleases'+hashit(item)} {...item}/>
                ))}
              </List>
            </div>
          </section>
        )}
        {recommendations.items.length > 0 && (
          <section>
            <h3>Recomended For You</h3>
            <div className={s.list}>
              <List>
                {recommendations.items.map((item) => item && (
                  <MangaItemCard key={'recomended'+item.mangaid} {...item}/>
                ))}
              </List>
            </div>
          </section>
        )}
      </section>
    )
  }
}

export default connect(
  state => ({
    releases: releasesSelector(state),
    myList: myListSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
  }),
  {
    getReleases,
  }
)(Home)
