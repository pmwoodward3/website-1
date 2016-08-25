import React, { Component } from 'react'
import { Link } from 'react-router'

import s from './styles.scss'

export default class List extends Component {
  render(){
    const { children } = this.props
    return (
      <div className={s.root}>
        {children}
      </div>
    )
  }
}
