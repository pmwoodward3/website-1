import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { getReleases } from 'redux/actions/releases'
import { myList as myListSelector } from 'redux/selectors/myList'
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
    myList: PropTypes.object.isRequired,
    readingHistory: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    getReleases: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { getReleases } = this.props
    getReleases()
  }

  render() {
    const { releases, myList, readingHistory, recommendations } = this.props

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
          <h3 className={s.sectionTitle}>My List</h3>
          <List>
            {myList.items.map((item) => item && (
              <MangaItemCard key={'myList'+item.mangaid} {...item}/>
            ))}
          </List>
        </Paper>
        <Paper zDepth={2} className={s.section}>
          <h3 className={s.sectionTitle}>New Releases</h3>
          <div className={s.list}>
            <List>
              {releases.items.map((item) => item && (
                <MangaItemCard key={'newReleases'+item.mangaid+item.date+item.chapter} {...item}/>
              ))}
            </List>
          </div>
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
    myList: myListSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
  }),
  {
    getReleases,
  }
)(Home)
