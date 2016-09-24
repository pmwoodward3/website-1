import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { uniq } from 'ramda'
import { MANGA_ITEM_CARD_WIDTH } from 'constants'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from 'components/Root/theme'

import * as headerActions from 'redux/actions/header'
import * as homeActions from 'redux/actions/home'
import * as releasesActions from 'redux/actions/releases'
import * as recommendationsActions from 'redux/actions/recommendations'
import releasesSelector from 'redux/selectors/releases'
import readingHistorySelector from 'redux/selectors/readingHistory'
import recommendationsSelector from 'redux/selectors/recommendations'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import { Card, CardTitle, CardText } from 'material-ui/Card'

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    readingHistory: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    rawFavorites: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    offline: PropTypes.bool.isRequired,
    getReleases: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
    getRecommendations: PropTypes.func.isRequired,
    expandSection: PropTypes.func.isRequired,
    closeSection: PropTypes.func.isRequired,
    setSectionRowLength: PropTypes.func.isRequired,
  };
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  constructor(props){
    super(props)
    this.updateLists = this.updateLists.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
  }
  getChildContext(){
    return ({
      muiTheme: getMuiTheme(theme),
    })
  }
  componentDidMount() {
    this.props.changeHeader({
      title: 'Home',
      parentPath: '/home',
    })

    this.updateLists()

    this.props.setSectionRowLength(Math.floor(this.refs.root.clientWidth / MANGA_ITEM_CARD_WIDTH))
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
    if(props.offline) return

    const {
      getReleases,
      getRecommendations,
      readingHistory,
      rawFavorites,
    } = props

    getReleases()

    if(!readingHistory.isLoaded) return

    const ids = rawFavorites.items
    .concat(readingHistory.items)
    .map((x) => x.mangaid)
    .filter(x => !!x)

    const uniqIds = uniq(ids)

    if(uniqIds.length > 0) getRecommendations(uniqIds)
  }
  handleExpand(key){
    if(this.props.home.expandedSections[key]){
      this.props.closeSection(key)
    }else{
      this.props.expandSection(key)
    }
  }

  render() {
    const {
      releases,
      readingHistory,
      rawFavorites,
      recommendations,
      offline,
      home,
    } = this.props

    const sections = [
      {
        key: 'readingHistory',
        show: readingHistory.items.length > 0,
        title: 'Continue Reading',
        items: readingHistory.items,
        renderItem: ({pagenum, ...item}) => (
          <MangaItemCard
            key={`readingHistory-${item.mangaid}`}
            pagenum={pagenum + 1}
            {...item}
            />
        ),
      },
      {
        key: 'newReleases',
        show: !offline,
        title: 'New Releases',
        items: releases.items,
        renderItem: (item) => (
          <MangaItemCard
            key={`newReleases-${item.mangaid}-${item.date}-${item.chapter}`}
            {...item}
            />
        ),
      },
      {
        key: 'recommendations',
        show: !offline && recommendations.items.length > 0,
        title: 'Recomended for You',
        items: recommendations.items,
        renderItem: (item) => (
          <MangaItemCard
            key={`recommendations-${item.mangaid}`}
            {...item}
            />
        ),
      },
    ]

    return (
      <section className={s.root} ref="root">
        <Helmet
          title="SB - Home"
          />
        {(readingHistory.items.length < 1 && readingHistory.isLoaded && rawFavorites.isLoaded && rawFavorites.items.length < 1) && (
          <Card
            zDepth={2}
            className={s.welcome}
            >
            <CardTitle>Welcome</CardTitle>
            <CardText>Favorite mangas and start reading. Your reading history and personal recommendations will be shown here.</CardText>
          </Card>
        )}
        {sections.map(({key, show, title, items, renderItem}) => show && (
          <Paper
            key={key}
            zDepth={2}
            className={s.section}
            ref={key}
            >
            <h3 className={s.sectionTitle}>
              {title}
              {items.length > home.sectionRowLength && (
                <FlatButton
                  className={home.expandedSections[key] ? s.contractButton : s.expandButton}
                  label={home.expandedSections[key] ? 'Less' : 'More'}
                  onTouchTap={() => this.handleExpand(key)}
                  primary
                  />
              )}
            </h3>
            <List
              expanded={home.expandedSections[key]}
              sectionRowLength={home.sectionRowLength}
              >
              {items.map((x) => renderItem({
                ...x,
                flex: items.length >= home.sectionRowLength,
              }))}
            </List>
          </Paper>
        ))}
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
  'home',
])(Home)

export default connect(
  state => ({
    releases: releasesSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
    rawFavorites: state.favorites,
    offline: state.offline,
    home: state.home,
  }),
  {
    ...headerActions,
    ...homeActions,
    ...releasesActions,
    ...recommendationsActions,
  }
)(PureHome)
