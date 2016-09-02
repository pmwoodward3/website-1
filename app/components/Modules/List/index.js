import React, { Component } from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'
import { MANGA_ITEM_CARD_HEIGHT } from 'constants'

import s from './styles.scss'

const style = {
  height: MANGA_ITEM_CARD_HEIGHT,
}

export default class List extends Component {
  render(){
    const { children } = this.props
    // return (
    //   <LazyLoad height={220} offset={100}>
    //     <div className={s.root}>
    //       {children}
    //     </div>
    //   </LazyLoad>
    // )
    return (
      <div
        className={s.root}
        style={style}
        >
        {children}
      </div>
    )
  }
}
