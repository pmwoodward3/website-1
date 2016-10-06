import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'components/Modules/Link'
import Helmet from 'react-helmet'
import { VirtualScroll, WindowScroller, AutoSizer } from 'react-virtualized'
import theme from 'components/Root/theme'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { MOCKS } from 'constants'
import toClass from 'utils/toClass'

import * as headerActions from 'redux/actions/header'
import * as mangaActions from 'redux/actions/manga'
import * as favoritesActions from 'redux/actions/favorites'
import { mangaProgress as mangaProgressSelector } from 'redux/selectors/readingHistory'
import { isFavoritesItem as isFavoritesItemSelector } from 'redux/selectors/favorites'
import mangaSelector from 'redux/selectors/manga'

import s from './styles.scss'

import Loading from 'components/Modules/Loading'
import {
  List,
  ListItem,
  ListItemContent,
  ListItemAction,
} from 'react-mdl/lib/List'

import {
  Card,
  CardText,
  CardTitle,
} from 'react-mdl/lib/Card'
import { Chip } from 'react-mdl/lib/Chip'
import FABButton from 'react-mdl/lib/FABButton'
import Icon from 'react-mdl/lib/Icon'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    progress: PropTypes.object,
    isFavoritesItem: PropTypes.bool.isRequired,
    offline: PropTypes.bool.isRequired,
    getManga: PropTypes.func.isRequired,
    addFavoritesItem: PropTypes.func.isRequired,
    removeFavoritesItem: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
  };
  static defaultProps = {
    progress: MOCKS.object,
  }

  constructor(props){
    super(props)
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleMangaChange = this.handleMangaChange.bind(this)
    this.handleToFavoritesAction = this.handleToFavoritesAction.bind(this)
    this._renderActionButton = this._renderActionButton.bind(this)
  }
  componentDidMount(){
    this.handleMangaChange()

    const title = this.props.manga.details.title || 'Manga'
    this.props.changeHeader({
      title,
      parentPath: '/home',
      showSourceButton: true,
    })
  }
  componentWillUpdate(newProps){
    const { getManga, params, location } = newProps

    const newManga = this.props.params.mangaid != newProps.params.mangaid
    const hasGoneOnline = this.props.offline && !newProps.offline

    if(newManga || hasGoneOnline){
      this.handleMangaChange(newProps)
    }
    if(this.props.location.query.source != newProps.location.query.source){
      getManga(params.mangaid, location.query.source)
    }

    if(this.props.manga.details.title != newProps.manga.details.title){
      newProps.changeHeader({
        title: newProps.manga.details.title,
      })
    }
  }
  componentWillUnmount(){
    this.props.changeHeader({
      showSourceButton: false,
    })
  }
  handleSourceChange(e, i, value){
    const { getManga, params } = this.props
    getManga(params.mangaid, value)
  }
  handleMangaChange(props=this.props){
    const {
      params,
      location,
      offline,
      getManga,
    } = props

    if(offline){
      return
    }

    getManga(params.mangaid, location.query.source)
  }
  handleToFavoritesAction(){
    const { addFavoritesItem, removeFavoritesItem, manga, isFavoritesItem } = this.props
    if(isFavoritesItem){
      removeFavoritesItem({
        mangaid: manga.details.mangaid,
      })
    }else{
      addFavoritesItem({
        mangaid: manga.details.mangaid,
        source: manga.source,
      })
    }
  }
  _renderActionButton(mobile=false) {
    const { isFavoritesItem } = this.props

    return (
      <div className={toClass(s.actionButtonContainer, mobile && s.mobile)}>
        <FABButton
          onClick={this.handleToFavoritesAction}
          style={{
            backgroundColor: isFavoritesItem ? theme.palette.primary3Color : theme.palette.accent1Color,
          }}
          colored
          >
          <Icon name={isFavoritesItem ? 'favorite_border' : 'favorite'} />
        </FABButton>
      </div>
    )
  }

  render() {
    const { manga, progress, params } = this.props

    const avatarStyle = (chapternum) => ({
      backgroundColor: chapternum == progress.chapternum ? theme.palette.accent1Color : theme.palette.primary3Color,
      fontSize: '1.4em',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    })

    if(manga.details.mangaid){
      const { details, chapters, sources } = manga

      const fullCover = `http://mcd.iosphe.re/r/${params.mangaid}/1/full/a/`
      const fullFrontCover = `http://mcd.iosphe.re/t/${details.mangaid}/1/front/a/`
      const coverCardStyle = {
        backgroundImage: `url(${fullFrontCover}), url(${details.cover})`,
      }
      const backgroundCoverStyle = {
        backgroundImage: `url(${fullCover}), url(${details.cover})`,
      }

      return (
        <section className={s.root}>
          <Helmet
            title={details.title ? `SB - ${details.title}` : 'SB'}
            />
          <Card shadow={3} className={s.backgroundContainer}>
            <div
              className={s.backgroundCover}
              style={backgroundCoverStyle}
              referrerPolicy="no-referrer"
              />
            {this._renderActionButton()}
          </Card>
          <Card className={s.card} shadow={3}>
            {this._renderActionButton(true)}
            <div className={s.cardHeader}>
              <Card
                shadow={3}
                className={s.coverCard}
                style={coverCardStyle}
                referrerPolicy="no-referrer"
                />
              <CardTitle className={s.titleContainer}>
                <span className={s.title}>{details.title}</span>
                <span className={s.subtitle}>{details.artist && details.rating && details.year && `${details.artist} - ${details.year} - ${Math.round(details.rating * 100) / 100}/10`}</span>
              </CardTitle>
            </div>
            <CardText>
              <div className={s.detailsContainer}>
                {details.genres && (
                  <div>
                    <strong>Genres</strong>
                    <div className={s.genreSection}>
                      {details.genres.map((genre) => (
                        <Chip
                          key={genre}
                          className={s.genreChip}
                          >
                          {genre}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
                {details.summary && (
                  <div>
                    <strong>Summary </strong>
                    <p>{details.summary}</p>
                  </div>
                )}
              </div>
            </CardText>
            <div className={s.detailsContainer}>
              {(sources && sources.length > 0) && (
                <CardText className={s.chapterSection}>
                  <strong>Chapters</strong>

                  {chapters && chapters.length > 0 && (
                    <List className={s.chapterList}>
                      <AutoSizer disableHeight>
                        {({ width }) => (
                          <WindowScroller>
                            {({ height, isScrolling, scrollTop }) => (
                              <VirtualScroll
                                autoHeight
                                height={height}
                                width={width}
                                rowCount={chapters.length}
                                rowHeight={72}
                                scrollTop={scrollTop}
                                isScrolling={isScrolling}
                                rowRenderer={
                                  ({ index }) => {
                                    const { chapternum, title } = chapters[index]
                                    const roundedChapterNum = Math.round(chapternum * 100) / 100
                                    return (
                                      <Link
                                        to={`/manga/${details.mangaid}/${chapternum}/${progress.chapternum == chapternum ? progress.pagenum : 1}?source=${manga.source}`}
                                        key={chapternum}
                                        className={s.chapterItem}
                                        >
                                        <ListItem>
                                          <ListItemContent
                                            avatar={
                                              <div
                                                style={avatarStyle(chapternum)}
                                                >
                                                {roundedChapterNum}
                                              </div>
                                            }
                                            >
                                            {title != roundedChapterNum && title}</ListItemContent>
                                          <ListItemAction>
                                            {chapternum == progress.chapternum && (
                                              <span
                                                className={s.chapterItemProgressPage}
                                                style={{
                                                  color: theme.palette.textColor,
                                                }}
                                                >
                                                {`Page ${progress.pagenum}`}
                                              </span>
                                            )}
                                            {chapternum < progress.chapternum && <Icon name="check"/>}
                                          </ListItemAction>
                                        </ListItem>
                                      </Link>
                                    )
                                  }
                                }
                                />
                            )}
                          </WindowScroller>
                        )}
                      </AutoSizer>
                    </List>
                  )}
                </CardText>
              )}
            </div>
          </Card>
        </section>
      )
    }else{
      return <Loading/>
    }
  }
}

const PureManga = onlyUpdateForKeys([
  'manga',
  'params',
  'location',
  'isFavoritesItem',
  'progress',
  'offline',
])(Manga)

export default connect(
  (state, {params}) => ({
    manga: mangaSelector(state, params.mangaid),
    isFavoritesItem: isFavoritesItemSelector(state, params.mangaid),
    progress: mangaProgressSelector(state, params.mangaid),
    offline: state.offline,
  }),
  {
    ...headerActions,
    ...mangaActions,
    ...favoritesActions,
  }
)(PureManga)
