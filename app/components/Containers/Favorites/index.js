import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

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
        <Helmet
          title="SB - Favorites"
          />
        <div className={s.section}>
          <List className={s.favorites}>
            {favorites.items.map((item) => item && (
              <MangaItemCard key={'favorites'+item.mangaid} {...item}/>
            ))}
          </List>
        </div>
      </section>
    )
  }
}

export default connect(
  state => ({
    favorites: favoritesSelector(state),
  }),
  {
    ...headerActions,
  }
)(Favorites)
