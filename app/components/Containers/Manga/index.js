import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import hashit from 'hash-it'
import R from 'ramda'
import Infinite from 'react-infinite'

import {
  getManga,
  fullCoverLoadSuccess,
  fullCoverLoadFailure,
} from 'redux/actions/manga'
import { addMyListItem, removeMyListItem } from 'redux/actions/myList'
import { isMyListItem as isMyListItemSelector } from 'redux/selectors/myList'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import Loading from 'components/Modules/Loading'
import MangaList from 'components/Modules/List'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import {
  Card,
  CardActions,
  CardHeader,
  CardText,
  CardMedia,
  CardTitle,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export class Manga extends Component {
  static propTypes = {
    manga: PropTypes.object.isRequired,
    getManga: PropTypes.func.isRequired,
    fullCoverLoadFailure: PropTypes.func.isRequired,
    fullCoverLoadSuccess: PropTypes.func.isRequired,
    addMyListItem: PropTypes.func.isRequired,
    removeMyListItem: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSourceChange = this.handleSourceChange.bind(this)
    this.handleMangaChange = this.handleMangaChange.bind(this)
    this.handleToMyListAction = this.handleToMyListAction.bind(this)
  }
  componentDidMount(){
    this.handleMangaChange()
  }
  componentWillUpdate(newProps){
    if(this.props.params.mangaid != newProps.params.mangaid){
      this.handleMangaChange(newProps)
    }
  }
  handleSourceChange(e, i, value){
    const { getManga, params } = this.props
    getManga(params.mangaid, value)
  }
  handleMangaChange(props=this.props){
    const { getManga, params, manga } = props
    getManga(params.mangaid, manga.source)
  }
  handleToMyListAction(){
    const { addMyListItem, removeMyListItem, manga, isMyListItem } = this.props
    if(isMyListItem){
      removeMyListItem({
        mangaid: manga.details.mangaid,
      })
    }else{
      addMyListItem({
        mangaid: manga.details.mangaid,
      })
    }
  }

  render() {
    const { manga, isMyListItem, fullCoverLoadSuccess, fullCoverLoadFailure } = this.props

    if(manga.details.mangaid){
      const { details, chapters, sources } = manga
      return (
        <section className={s.root}>
          <Helmet
            title={details.title}
            />
          <Card>
            <CardMedia>
              <img
                src={`http://mcd.iosphe.re/r/${details.mangaid}/1/full/a/`}
                referrerPolicy="no-referrer"
                className={s.fullCover}
                style={{display: manga.fullCoverAvailable ? 'block' : 'none'}}
                onLoad={fullCoverLoadSuccess.bind({}, details.mangaid)}
                onError={fullCoverLoadFailure.bind({}, details.mangaid)}
                />
            </CardMedia>
            {!manga.fullCoverAvailable && details.cover && (
              <CardMedia>
                <img
                  src={details.cover}
                  referrerPolicy="no-referrer"
                  className={s.cover}
                  />
              </CardMedia>
            )}
            <CardHeader
              actAsExpander={true}
              showExpandableButton={true}
              >
              <CardTitle
                title={details.title}
                subtitle={`${details.artist} - ${details.year} - ${Math.round(details.rating * 100) / 100}/10`}
                />
            </CardHeader>
            <CardActions expandable={true}>
              {isMyListItem ? (
                <FlatButton
                  icon={<ContentRemove/>}
                  onClick={this.handleToMyListAction}
                  label="Remove from my list"
                  />
              ) : (
                <FlatButton
                  icon={<ContentAdd/>}
                  onClick={this.handleToMyListAction}
                  label="Add to my list"
                  />
              )}
            </CardActions>
            <CardText expandable={true}>
              <strong>Author </strong>
              <p>{details.author}</p>
              <strong>Artist </strong>
              <p>{details.artist}</p>
              <strong>Genres </strong>
              <p>{details.genres.join(', ')}</p>
              <strong>Summary </strong>
              <p>{details.summary}</p>
            </CardText>
          </Card>
          {(sources && chapters && sources.length > 0 && chapters.length > 0) ? (
            <div className={s.chapters}>
              <div className={s.chapterHeader}>
                <h3>Chapters</h3>
                <SelectField
                  value={manga.source}
                  onChange={this.handleSourceChange}
                  floatingLabelText="Source"
                  >
                  {sources.map(({sourceslug, aliasid}) => (
                    <MenuItem
                      key={sourceslug}
                      value={sourceslug}
                      primaryText={sourceslug}
                      />
                  ))}
                </SelectField>
              </div>
              <List>
                <Infinite containerHeight={300} elementHeight={56}>
                  {chapters.map(({chapternum, title}) => (
                    <Link
                      to={`/manga/${details.mangaid}/${chapternum}?source=${manga.source}`}
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
                        >
                      </ListItem>
                    </Link>
                  ))}
                </Infinite>
              </List>
            </div>
          ) : (
            <strong>
              No chapters available. This manga was not found in any source.
            </strong>
          )}
          {details.recommendations && (
            <div className={s.recommendations}>
              <h3>Recommendations</h3>
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
    manga: state.manga,
    isMyListItem: isMyListItemSelector(state, params.mangaid),
  }),
  {
    getManga,
    fullCoverLoadSuccess,
    fullCoverLoadFailure,
    addMyListItem,
    removeMyListItem,
  }
)(Manga)
