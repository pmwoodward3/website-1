import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import debounce from 'debounce'
import theme from 'components/Root/theme'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import screenfull from 'screenfull'

import * as chapterActions from 'redux/actions/chapter'
import * as searchActions from 'redux/actions/search'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ActionHome from 'material-ui/svg-icons/action/home'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionInput from 'material-ui/svg-icons/action/input'
import ActionZoomOut from 'material-ui/svg-icons/action/zoom-out'
import NavigationFullScreen from 'material-ui/svg-icons/navigation/fullscreen'
import NavigationFullScreenExit from 'material-ui/svg-icons/navigation/fullscreen-exit'
import Link from 'components/Modules/Link'

/* component styles */
import s from './styles.scss'

class Header extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    loading: PropTypes.number.isRequired,
    search: PropTypes.object.isRequired,
    header: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    manga: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    offline: PropTypes.bool.isRequired,
    fullscreen: PropTypes.bool.isRequired,
    changeSearchQuery: PropTypes.func.isRequired,
    enterFullscreen: PropTypes.func.isRequired,
    exitFullscreen: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
  };

  constructor(props){
    super(props)
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.updateQueryLocation = debounce(this.updateQueryLocation, 500)
    this.zoomOut = this.zoomOut.bind(this)
    this.handleFullscreen = this.handleFullscreen.bind(this)
  }
  handleSearchQueryChange(e, val){
    this.props.changeSearchQuery(val)
    this.updateQueryLocation(val)
  }
  updateQueryLocation(query, genres){
    let { q, g } = this.props.location.query

    let URL = `/search?q=${query || q}`

    if(genres){
      genres = genres.join('\ ')
    }else{
      genres = g
    }

    if(genres){
      URL = `${URL}&g=${genres}`
    }

    browserHistory.push(URL)
  }
  zoomOut(){
    this.props.setScale(1)
  }
  handleFullscreen(){
    screenfull.toggle()
  }
  render(){
    const loading = this.props.loading > 0
    const {
      search,
      header,
      location,
      params,
      manga,
      offline,
      fullscreen,
    } = this.props

    return (
      <div className={s.root}>
        <LinearProgress
          mode="indeterminate"
          className={s.progress}
          color={this.context.muiTheme.flatButton.secondaryTextColor}
          style={{
            display: loading ? 'block' : 'none',
          }}
          />
        <AppBar
          title={header.title}
          className={s.appBar+' '+(search.showSearchField && s.showSearchField)}
          zDepth={2}
          iconElementLeft={
            <Link to={header.parentPath} disabled={header.parentPath == location.pathname}>
              <IconButton disabled={header.parentPath == location.pathname}>
                {header.parentPath == '/home' ? (
                  <ActionHome/>
                ) : (
                  <NavigationArrowBack />
                )}
              </IconButton>
            </Link>
          }
          iconElementRight={
            <div className={s.searchSection}>
              {search.showSearchField && (
                <Paper zDepth={0} className={s.searchField}>
                  <TextField
                    id="searchField"
                    placeholder="Type something..."
                    value={search.query}
                    onChange={this.handleSearchQueryChange}
                    fullWidth
                    autoFocus
                    />
                </Paper>
              )}
              {header.showZoomOutButton && (
                <IconButton onTouchTap={this.zoomOut}>
                  <ActionZoomOut/>
                </IconButton>
              )}
              {header.showSourceButton ? (
                <IconMenu
                  iconButtonElement={
                    <FlatButton
                      label="Source"
                      className={s.headerButton}
                      icon={<ActionInput color="#fff"/>}
                      />
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                  {manga.sources.map(({sourceslug}) => (
                    <MenuItem
                      key={sourceslug}
                      primaryText={sourceslug}
                      style={{
                        color: sourceslug == manga.source ? theme.palette.accent1Color : '',
                      }}
                      onTouchTap={() => browserHistory.push(`/manga/${params.mangaid}?source=${sourceslug}`)}
                      />
                  ))}
                </IconMenu>
              ) : header.showFullScreenButton ? (
                <IconButton onTouchTap={this.handleFullscreen}>
                  {fullscreen ? (
                    <NavigationFullScreenExit/>
                  ) : (
                    <NavigationFullScreen/>
                  )}
                </IconButton>
              ) : (
                <Link to="/search" disabled={offline}>
                  <IconButton disabled={search.showSearchField || offline}>
                    <ActionSearch/>
                  </IconButton>
                </Link>
              )}
            </div>
          }
          />
      </div>
    )
  }
}

const PureHeader = onlyUpdateForKeys([
  'params',
  'loading',
  'search',
  'header',
  'location',
  'manga',
  'offline',
  'fullscreen',
])(Header)

export default connect(
  (state) => ({
    loading: state.loading,
    search: state.search,
    header: state.header,
    manga: state.manga,
    offline: state.offline,
    fullscreen: state.chapter.fullscreen,
  }),
  {
    ...searchActions,
    ...chapterActions,
  }
)(PureHeader)
