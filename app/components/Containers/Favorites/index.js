import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { favorites as favoritesSelector } from 'redux/selectors/favorites'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Paper from 'material-ui/Paper'

export class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object.isRequired,
  };

  render() {
    const { favorites } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="SB - Favorites"
          />
        <Paper zDepth={2} className={s.section}>
          <List className={s.favorites}>
            {favorites.items.map((item) => item && (
              <MangaItemCard key={'favorites'+item.mangaid} {...item}/>
            ))}
          </List>
        </Paper>
      </section>
    )
  }
}

export default connect(
  state => ({
    favorites: favoritesSelector(state),
  }),
)(Favorites)
