import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { uniq } from 'ramda'

import * as headerActions from 'redux/actions/header'
import { getReleases } from 'redux/actions/releases'
import { getRecommendations } from 'redux/actions/recommendations'
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
    readingHistory: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    rawFavorites: PropTypes.object.isRequired,
    offline: PropTypes.bool.isRequired,
    getReleases: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
    getRecommendations: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.updateLists = this.updateLists.bind(this)
  }
  componentDidMount() {
    this.props.changeHeader({
      title: 'Home',
      parentPath: '/home',
    })

    this.updateLists()
  }
  componentWillUpdate(newProps){
    const rawFavoritesHasChanged = this.props.rawFavorites.items.length !== newProps.rawFavorites.items.length
    const readingHistoryHasChanged = this.props.readingHistory.items.length !== newProps.readingHistory.items.length
    const hasGoneOnline = this.props.offline && !newProps.offline

    if(rawFavoritesHasChanged || readingHistoryHasChanged || hasGoneOnline){
      this.updateLists(newProps)
    }
  }
  updateLists(props=this.props){
    if(props.offline){
      return
    }

    const {
      getReleases,
      getRecommendations,
      readingHistory,
      rawFavorites,
    } = props

    getReleases()

    if(readingHistory.isLoaded){
      const ids = rawFavorites.items
      .concat(readingHistory.items)
      .map((x) => x.mangaid)
      .filter(x => !!x)

      const uniqIds = uniq(ids)

      getRecommendations(uniqIds)
    }
  }

  render() {
    const {
      releases,
      readingHistory,
      recommendations,
      offline,
    } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="SB - Home"
          />
        {readingHistory.items.length > 0 && (
          <Paper zDepth={2} className={s.section}>
            <h3 className={s.sectionTitle}>Continue Reading</h3>
            <List>
              {readingHistory.items.map(({pagenum, ...item}) => (
                <MangaItemCard
                  key={'readingHistory'+item.mangaid}
                  pagenum={pagenum + 1}
                  {...item}
                  />
              ))}
            </List>
          </Paper>
        )}
        {!offline && (
          <Paper zDepth={2} className={s.section}>
            <h3 className={s.sectionTitle}>New Releases</h3>
            <List>
              {releases.items.map((item) => (
                <MangaItemCard key={'newReleases'+item.mangaid+item.date+item.chapter} {...item}/>
              ))}
            </List>
          </Paper>
        )}
        {!offline && (
          <Paper zDepth={2} className={s.section}>
            <h3 className={s.sectionTitle}>Recomended For You</h3>
            <div className={s.list}>
              <List>
                {recommendations.items.map((item) => (
                  <MangaItemCard key={'recomended'+item.mangaid} {...item}/>
                ))}
              </List>
            </div>
          </Paper>
        )}
      </section>
    )
  }
}

const PureHome = onlyUpdateForKeys([
  'releases',
  'readingHistory',
  'recommendations',
  'rawFavorites',
  'offline',
])(Home)

export default connect(
  state => ({
    releases: releasesSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
    rawFavorites: state.favorites,
    offline: state.offline,
  }),
  {
    ...headerActions,
    getReleases,
    getRecommendations,
  }
)(PureHome)
