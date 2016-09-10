import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { VirtualScroll, AutoSizer } from 'react-virtualized'

import * as headerActions from 'redux/actions/header'
import * as mangaActions from 'redux/actions/manga'
import * as favoritesActions from 'redux/actions/favorites'
import { isFavoritesItem as isFavoritesItemSelector } from 'redux/selectors/favorites'
import mangaSelector from 'redux/selectors/manga'

import s from './styles.scss'

import MangaItemCard from 'components/Modules/MangaItemCard'
import Loading from 'components/Modules/Loading'
import MangaList from 'components/Modules/List'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Chip from 'material-ui/Chip'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isFavoritesItem: PropTypes.bool.isRequired,
    getManga: PropTypes.func.isRequired,
    fullCoverLoadFailure: PropTypes.func.isRequired,
    fullCoverLoadSuccess: PropTypes.func.isRequired,
    fullCoverLoadRequest: PropTypes.func.isRequired,
    addFavoritesItem: PropTypes.func.isRequired,
    removeFavoritesItem: PropTypes.func.isRequired,
    changeHeader: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleMangaChange = this.handleMangaChange.bind(this)
    this.handleToFavoritesAction = this.handleToFavoritesAction.bind(this)
  }
  componentDidMount(){
    this.handleMangaChange()

    const title = this.props.manga.details.title
    if(title){
      this.props.changeHeader({ title })
    }
  }
  componentWillUpdate(newProps){
    if(this.props.params.mangaid != newProps.params.mangaid){
      this.handleMangaChange(newProps)
    }

    if(this.props.manga.details.title != newProps.manga.details.title){
      newProps.changeHeader({
        title: newProps.manga.details.title,
      })
    }
  }
  handleSourceChange(e, i, value){
    const { getManga, params } = this.props
    getManga(params.mangaid, value)
  }
  handleMangaChange(props=this.props){
    const { getManga, params, fullCoverLoadRequest } = props
    getManga(params.mangaid)
    fullCoverLoadRequest()
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
      })
    }
  }

  render() {
    const { manga, isFavoritesItem, fullCoverLoadSuccess, fullCoverLoadFailure } = this.props

    if(manga.details.mangaid){
      const { details, chapters, sources } = manga
      return (
        <section className={s.root}>
          <Helmet
            title={`SB - ${details.title}`}
            />
          <Card className={s.card} zDepth={2}>
            <CardMedia>
              <img
                draggable={false}
                src={`http://mcd.iosphe.re/r/${details.mangaid}/1/full/a/`}
                referrerPolicy="no-referrer"
                className={s.cover}
                style={{display: manga.fullCoverAvailable ? 'block' : 'none'}}
                onLoad={fullCoverLoadSuccess.bind({}, details.mangaid)}
                onError={fullCoverLoadFailure.bind({}, details.mangaid)}
                />
            </CardMedia>
            {!manga.fullCoverAvailable && (
              <CardMedia>
                <img
                  draggable={false}
                  src={details.cover}
                  referrerPolicy="no-referrer"
                  className={s.cover}
                  />
              </CardMedia>
            )}
            <FloatingActionButton
              className={s.actionButton}
              onTouchTap={this.handleToFavoritesAction}
              disabled={isFavoritesItem}
              secondary
              >
              <ActionFavorite/>
            </FloatingActionButton>
            <CardHeader
              className={s.cardHeader}
              >
              <CardTitle
                title={details.title}
                subtitle={details.artist && details.rating && details.year && `${details.artist} - ${details.year} - ${Math.round(details.rating * 100) / 100}/10`}
                />
            </CardHeader>
            {isFavoritesItem && (
              <CardActions className={s.cardActions}>
                <FlatButton
                  icon={<ContentRemove/>}
                  onClick={this.handleToFavoritesAction}
                  label="Remove from my list"
                  />
              </CardActions>
            )}
            {details.genres && details.summary && (
              <CardText>
                <strong>Genres </strong>
                <div className={s.genreSection}>
                  {details.genres.map((genre) => (
                    <Chip key={genre} className={s.genreChip}>{genre}</Chip>
                  ))}
                </div>
                <strong>Summary </strong>
                <p>{details.summary}</p>
              </CardText>
            )}
            {(sources && sources.length > 0) ? (
              <CardText className={s.chapterSection}>
                <div className={s.chapterHeader}>
                  <h3>Chapters</h3>
                  <SelectField
                    value={manga.source}
                    onChange={this.handleSourceChange}
                    floatingLabelText="Source"
                    >
                    {sources.map(({sourceslug}) => (
                      <MenuItem
                        key={sourceslug}
                        value={sourceslug}
                        primaryText={sourceslug}
                        />
                    ))}
                  </SelectField>
                </div>

                {chapters && chapters.length > 0 && (
                  <div className={s.chapterList}>
                    <AutoSizer>
                      {({ height, width }) => (
                        <VirtualScroll
                          height={height}
                          width={width}
                          rowCount={chapters.length}
                          rowHeight={56}
                          rowRenderer={
                            ({ index }) => {
                              const { chapternum, title } = chapters[index]
                              return (
                                <Link
                                  to={`/manga/${details.mangaid}/${chapternum}/1?source=${manga.source}`}
                                  key={chapternum}
                                  className={s.chapterItem}
                                  >
                                  <ListItem
                                    primaryText={title}
                                    leftAvatar={
                                      <Avatar
                                        style={{left: 8}}
                                        >
                                        {Math.round(chapternum * 100) / 100}
                                      </Avatar>
                                    }
                                    />
                                </Link>
                              )
                            }
                          }
                          />
                      )}
                    </AutoSizer>
                  </div>
                )}
              </CardText>
            ) : !manga.isLoading && (
              <CardText>
                <strong>
                  No chapters available. This manga was not found in any source.
                </strong>
              </CardText>
            )}
          </Card>
          {details.recommendations && details.recommendations.length > 0 && (
            <div className={s.recommendationsSection}>
              <h3 className={s.recommendationsTitle}>Recommendations</h3>
              <MangaList>
                {details.recommendations.map((item) => (
                  <MangaItemCard key={item.mangaid} {...item}/>
                ))}
              </MangaList>
            </div>
          )}
        </section>
      )
    }else{
      return <Loading/>
    }
  }
}

export default connect(
  (state, {params}) => ({
    manga: mangaSelector(state, params.mangaid),
    isFavoritesItem: isFavoritesItemSelector(state, params.mangaid),
  }),
  {
    ...headerActions,
    ...mangaActions,
    ...favoritesActions,
  }
)(Manga)
