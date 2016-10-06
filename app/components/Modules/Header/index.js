import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import debounce from 'debounce'
import theme from 'components/Root/theme'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import screenfull from 'screenfull'
import toClass from 'utils/toClass'
import isTouchAvailable from 'utils/isTouchAvailable'

import * as chapterActions from 'redux/actions/chapter'
import * as searchActions from 'redux/actions/search'

import Link from 'components/Modules/Link'
import IconButton from 'react-mdl/lib/IconButton'
import Icon from 'react-mdl/lib/Icon'
import Button from 'react-mdl/lib/Button'
import Menu, { MenuItem } from 'react-mdl/lib/Menu'
import { Layout, Navigation, Header as MdlHeader } from 'react-mdl/lib/Layout'
import Textfield from 'react-mdl/lib/Textfield'
import ProgressBar from 'react-mdl/lib/ProgressBar'
import { Card } from 'react-mdl/lib/Card'

/* component styles */
import s from './styles.scss'

class Header extends Component {
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
  };

  constructor(props){
    super(props)
    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
    this.updateQueryLocation = debounce(this.updateQueryLocation, 500)
    this.handleFullscreen = this.handleFullscreen.bind(this)
  }
  handleSearchQueryChange(e){
    const val = e.target.value
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
      <div className={toClass(s.root, header.hidden && isTouchAvailable && fullscreen && s.hidden)}>
        <ProgressBar
          className={s.progress}
          style={{
            display: loading ? 'block' : 'none',
          }}
          indeterminate
          />
        <Layout fixedHeader className={s.layout}>
          <MdlHeader
            title={!search.showSearchField ? header.title : ''}
            className={s.header}
            >
            <Navigation className={s.leftNavigation}>
              <Link to={header.parentPath} disabled={header.parentPath == location.pathname}>
                <IconButton
                  name={header.parentPath == '/home' ? 'home' : 'arrow_back'}
                  disabled={header.parentPath == location.pathname}
                  />
              </Link>
            </Navigation>
            <Navigation>
              {search.showSearchField && (
                <Textfield
                  label=""
                  placeholder="Search..."
                  value={search.query}
                  onChange={this.handleSearchQueryChange}
                  autoFocus
                  />
              )}
                {header.showSourceButton ? (
                  <div style={{position: 'relative'}}>
                    <Button id="source-menu" className={s.sourceMenuButton}>
                      <Icon name="input" />
                      Source
                    </Button>
                    <Menu target="source-menu" align="right">
                      {manga.sources.map(({sourceslug}) => (
                        <MenuItem
                          key={sourceslug}
                          style={{
                            color: sourceslug == manga.source ? theme.palette.accent1Color : '',
                          }}
                          className={s.sourceMenuItem}
                          onClick={() => browserHistory.push(`/manga/${params.mangaid}?source=${sourceslug}`)}
                          >{sourceslug}</MenuItem>
                      ))}
                    </Menu>
                  </div>
                ) : header.showFullScreenButton ? (
                  <IconButton
                    name={fullscreen ? 'fullscreen_exit' : 'fullscreen'}
                    onClick={this.handleFullscreen}
                    />
                ) : (
                  <Link
                    to="/search"
                    disabled={search.showSearchField || offline}
                    className={s.searchLink}
                    >
                    <IconButton
                      name="search"
                      disabled={search.showSearchField || offline}
                      />
                  </Link>
                )}
            </Navigation>
          </MdlHeader>
        </Layout>
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
