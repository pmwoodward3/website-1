import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from 'components/Root/theme'

import * as headerActions from 'redux/actions/header'
import { favorites as favoritesSelector } from 'redux/selectors/favorites'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'

export class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object.isRequired,
    changeHeader: PropTypes.func.isRequired,
  };
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getChildContext(){
    return ({
      muiTheme: getMuiTheme(theme),
    })
  }
  componentDidMount(){
    this.props.changeHeader({
      title: 'Favorites',
      parentPath: '/home',
    })
  }
  render() {
    const { favorites } = this.props

    return (
      <section className={s.root}>
        <Helmet title="SB - Favorites"/>
        <div className={s.section}>
          <List className={s.favorites} expanded>
            {favorites.items.map((item) => (
              <MangaItemCard
                key={`favorites-${item.mangaid}`}
                {...item}
                />
            ))}
          </List>
        </div>
      </section>
    )
  }
}

const PureFavorites = onlyUpdateForKeys([
  'favorites',
])(Favorites)

export default connect(
  state => ({
    favorites: favoritesSelector(state),
  }),
  {
    ...headerActions,
  }
)(PureFavorites)
