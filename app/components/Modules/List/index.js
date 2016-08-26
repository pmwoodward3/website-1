import React, { Component } from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'

import s from './styles.scss'

export default class List extends Component {
  render(){
    const { children } = this.props
    return (
      <LazyLoad height={220} offset={100}>
        <div className={s.root}>
          {children}
        </div>
      </LazyLoad>
    )
  }
}
