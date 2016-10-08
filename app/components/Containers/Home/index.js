import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { uniq } from 'ramda'
import { MANGA_ITEM_CARD_WIDTH } from 'constants'

import * as headerActions from 'redux/actions/header'
import * as homeActions from 'redux/actions/home'
import * as releasesActions from 'redux/actions/releases'
import * as recommendationsActions from 'redux/actions/recommendations'
import * as popularActions from 'redux/actions/popular'
import releasesSelector from 'redux/selectors/releases'
import readingHistorySelector from 'redux/selectors/readingHistory'
import recommendationsSelector from 'redux/selectors/recommendations'
import popularSelector from 'redux/selectors/popular'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Button from 'react-mdl/lib/Button'
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

export class Home extends Component {
  static propTypes = {
    releases: PropTypes.object.isRequired,
    readingHistory: PropTypes.object.isRequired,
    recommendations: PropTypes.object.isRequired,
    rawFavorites: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    popular: PropTypes.object.isRequired,
    offline: PropTypes.bool.isRequired,
    getReleases: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
    getRecommendations: PropTypes.func.isRequired,
    expandSection: PropTypes.func.isRequired,
    closeSection: PropTypes.func.isRequired,
    setSectionRowLength: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.updateLists = this.updateLists.bind(this)
    this.handleExpand = this.handleExpand.bind(this)
    this.setSectionRowLength = this.setSectionRowLength.bind(this)
  }
  componentDidMount() {
    this.setSectionRowLength()

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
    const sectionRowLengthHasChanged = this.props.home.sectionRowLength !== newProps.home.sectionRowLength

    if(rawFavoritesHasChanged || readingHistoryHasChanged || hasGoneOnline || sectionRowLengthHasChanged){
      this.updateLists(newProps)
    }
  }
  setSectionRowLength(){
    const sectionList = this.refs.sectionContainer
    const widths = [
      sectionList && sectionList.clientWidth,
      document.documentElement.clientWidth,
      window.innerWidth,
    ].filter((x) => !!x && x > 0)

    const sectionRowLength = Math.floor(Math.min(...widths) / MANGA_ITEM_CARD_WIDTH)

    this.props.setSectionRowLength(sectionRowLength)
  }
  updateLists(props=this.props){
    if(props.offline) return

    const {
      getReleases,
      getRecommendations,
      getPopular,
      readingHistory,
      rawFavorites,
      home,
    } = props

    getReleases(home.sectionRowLength * 2)
    getPopular(home.sectionRowLength * 2)

    if(!readingHistory.isLoaded) return

    const ids = rawFavorites.items
    .concat(readingHistory.items)
    .map((x) => x.mangaid)
    .filter(x => !!x)

    const uniqIds = uniq(ids)

    if(uniqIds.length > 0){
      getRecommendations(
        uniqIds,
        home.sectionRowLength * 2
      )
    }
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
      popular,
    } = this.props

    const sections = [
      {
        key: 'readingHistory',
        show: readingHistory.items.length > 0,
        title: 'Continue Reading',
        items: readingHistory.items,
        renderItem: (item) => (
          <MangaItemCard
            key={`readingHistory-${item.mangaid}`}
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
      {
        key: 'popular',
        show: !offline,
        title: 'Popular',
        items: popular.items,
        renderItem: (item) => (
          <MangaItemCard
            key={`popular-${item.mangaid}`}
            {...item}
            />
        ),
      },
    ]

    return (
      <section className={s.root} ref="root">
        <Helmet
          title="Shiba - Home"
          />
        <div ref="sectionContainer" className={s.sectionContainer}>
          {(readingHistory.items.length < 1 && readingHistory.isLoaded && rawFavorites.isLoaded && rawFavorites.items.length < 1) && (
            <Card
              shadow={0}
              className={s.welcome}
              >
              <CardTitle>Welcome</CardTitle>
              <CardText>Your reading history and personal recommendations will be shown here.</CardText>
            </Card>
          )}
          {sections.map(({key, show, title, items, renderItem}) => show && (
            <Card
              key={key}
              shadow={0}
              className={s.section}
              >
              <h3 className={s.sectionTitle}>
                {title}
                {items.length > home.sectionRowLength && (
                  <Button
                    className={home.expandedSections[key] ? s.contractButton : s.expandButton}
                    onClick={() => this.handleExpand(key)}
                    primary
                    >
                    {home.expandedSections[key] ? 'Less' : 'More'}
                  </Button>
                )}
              </h3>
              <List
                expanded={home.expandedSections[key]}
                sectionRowLength={home.sectionRowLength}
                >
                {items.map((x) => renderItem({
                  ...x,
                  flex: items.length >= home.sectionRowLength && !home.expandedSections[key],
                }))}
              </List>
            </Card>
          ))}
        </div>
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
  'popular',
])(Home)

export default connect(
  state => ({
    releases: releasesSelector(state),
    readingHistory: readingHistorySelector(state),
    recommendations: recommendationsSelector(state),
    popular: popularSelector(state),
    rawFavorites: state.favorites,
    offline: state.offline,
    home: state.home,
  }),
  {
    ...headerActions,
    ...homeActions,
    ...releasesActions,
    ...recommendationsActions,
    ...popularActions,
  }
)(PureHome)
