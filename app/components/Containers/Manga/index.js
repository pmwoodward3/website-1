import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'components/Modules/Link'
import Helmet from 'react-helmet'
import { VirtualScroll, WindowScroller, AutoSizer } from 'react-virtualized'
import theme from 'components/Root/theme'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'
import { MOCKS } from 'constants'

import * as headerActions from 'redux/actions/header'
import * as mangaActions from 'redux/actions/manga'
import * as favoritesActions from 'redux/actions/favorites'
import { mangaProgress as mangaProgressSelector } from 'redux/selectors/readingHistory'
import { isFavoritesItem as isFavoritesItemSelector } from 'redux/selectors/favorites'
import mangaSelector from 'redux/selectors/manga'

import s from './styles.scss'

import Loading from 'components/Modules/Loading'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import Check from 'material-ui/svg-icons/navigation/Check'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Card,
  CardHeader,
  CardText,
  CardTitle,
} from 'material-ui/Card'
import Chip from 'material-ui/Chip'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    progress: PropTypes.object,
    isFavoritesItem: PropTypes.bool.isRequired,
    offline: PropTypes.bool.isRequired,
    getManga: PropTypes.func.isRequired,
    fullCoverLoadFailure: PropTypes.func.isRequired,
    fullCoverLoadSuccess: PropTypes.func.isRequired,
    fullCoverLoadRequest: PropTypes.func.isRequired,
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
    this.handleFullCoverLoad = this.handleFullCoverLoad.bind(this)
    this.handleFullCoverFailure = this.handleFullCoverFailure.bind(this)
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
      fullCoverLoadRequest,
    } = props

    fullCoverLoadRequest()

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
  handleFullCoverLoad(){
    this.props.fullCoverLoadSuccess(this.props.manga.details.mangaid)
  }
  handleFullCoverFailure(){
    this.props.fullCoverLoadFailure(this.props.manga.details.mangaid)
  }

  render() {
    const { manga, progress, isFavoritesItem, params } = this.props

    const avatarStyle = (chapternum) => ({
      left: 8,
      backgroundColor: chapternum == progress.chapternum ? theme.palette.accent1Color : theme.palette.primary3Color,
    })

    if(manga.details.mangaid){
      const { details, chapters, sources } = manga
      return (
        <section className={s.root}>
          <Helmet
            title={details.title ? `SB - ${details.title}` : 'SB'}
            />

          <div className={s.coverContainer}>
            {manga.fullCoverAvailable ? (
              <img
                draggable={false}
                src={`http://mcd.iosphe.re/r/${params.mangaid}/1/full/a/`}
                referrerPolicy="no-referrer"
                className={toClass([s.cover, s.fullCover])}
                onLoad={this.handleFullCoverLoad}
                onError={this.handleFullCoverFailure}
                />
            ) : (
              <img
                draggable={false}
                src={details.cover}
                referrerPolicy="no-referrer"
                className={s.cover}
                />
            )}
          </div>
          <Card className={s.card} zDepth={3} expanded={!isFavoritesItem}>
            <FloatingActionButton
              className={s.actionButton}
              onTouchTap={this.handleToFavoritesAction}
              backgroundColor={isFavoritesItem ? theme.palette.primary3Color : theme.palette.accent1Color}
              >
              {isFavoritesItem ? (
                <ActionFavoriteBorder/>
              ) : (
                <ActionFavorite/>
              )}
            </FloatingActionButton>
            <CardHeader className={s.cardHeader}>
              <CardTitle
                title={details.title}
                subtitle={details.artist && details.rating && details.year && `${details.artist} - ${details.year} - ${Math.round(details.rating * 100) / 100}/10`}
                />
            </CardHeader>
            {details.genres && details.summary && (
              <CardText expandable>
                <div className={s.detailsContainer}>
                  <strong>Genres </strong>
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
                  <strong>Summary </strong>
                  <p>{details.summary}</p>
                </div>
              </CardText>
            )}
            <div className={s.detailsContainer}>
              {(sources && sources.length > 0) && (
                <CardText className={s.chapterSection}>
                  {!isFavoritesItem && (
                    <div className={s.chapterHeader}>
                      <strong>Chapters</strong>
                    </div>
                  )}

                  {chapters && chapters.length > 0 && (
                    <div className={s.chapterList}>
                      <AutoSizer disableHeight>
                        {({ width }) => (
                          <WindowScroller>
                            {({ height, isScrolling, scrollTop }) => (
                              <VirtualScroll
                                autoHeight
                                height={height}
                                width={width}
                                rowCount={chapters.length}
                                rowHeight={56}
                                scrollTop={scrollTop}
                                isScrolling={isScrolling}
                                rowRenderer={
                                  ({ index }) => {
                                    const { chapternum, title } = chapters[index]
                                    return (
                                      <Link
                                        to={`/manga/${details.mangaid}/${chapternum}/${progress.chapternum == chapternum ? progress.pagenum + 1 : 1}?source=${manga.source}`}
                                        key={chapternum}
                                        className={s.chapterItem}
                                        >
                                        <ListItem
                                          leftAvatar={
                                            <Avatar
                                              style={avatarStyle(chapternum)}
                                              >
                                              {Math.round(chapternum * 100) / 100}
                                            </Avatar>
                                          }
                                          >
                                          <div className={s.chapterItemContainer}>
                                            <span>{title}</span>
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
                                            {chapternum < progress.chapternum && <Check/>}
                                          </div>
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
                    </div>
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
