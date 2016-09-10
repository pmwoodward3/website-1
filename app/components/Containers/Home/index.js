import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import * as headerActions from 'redux/actions/header'
import { getReleases } from 'redux/actions/releases'
import { favorites as favoritesSelector } from 'redux/selectors/favorites'
import releasesSelector from 'redux/selectors/releases'
import readingHistorySelector from 'redux/selectors/readingHistory'
import recommendationsSelector from 'redux/selectors/recommendations'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Paper from 'material-ui/Paper'

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    favorites: PropTypes.object.isRequired,
    readingHistory: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getReleases, changeHeader } = this.props

    getReleases()
    changeHeader({
      title: 'Home',
      parentPath: '/home',
    })
  }

  render() {
    const { releases, readingHistory, recommendations } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="SB - Home"
          />
        {
          readingHistory.items.length > 0 && (
            <Paper zDepth={2} className={s.section}>
              <h3 className={s.sectionTitle}>Continue Reading</h3>
              <List>
                {readingHistory.items.map(({pagenum, ...item}) => item.mangaid && (
                  <MangaItemCard
                    key={'readingHistory'+item.mangaid}
                    pagenum={pagenum + 1}
                    {...item}
                    />
                ))}
              </List>
            </Paper>
          )
        }
        <Paper zDepth={2} className={s.section}>
          <h3 className={s.sectionTitle}>New Releases</h3>
          <List>
            {releases.items.map((item) => item && (
              <MangaItemCard key={'newReleases'+item.mangaid+item.date+item.chapter} {...item}/>
            ))}
          </List>
        </Paper>
        <Paper zDepth={2} className={s.section}>
          <h3 className={s.sectionTitle}>Recomended For You</h3>
          <div className={s.list}>
            <List>
              {recommendations.items.map((item) => item && (
                <MangaItemCard key={'recomended'+item.mangaid} {...item}/>
              ))}
            </List>
          </div>
        </Paper>
      </section>
    )
  }
}

export default connect(
  state => ({
    releases: releasesSelector(state),
    favorites: favoritesSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
  }),
  {
    ...headerActions,
    getReleases,
  }
)(Home)
