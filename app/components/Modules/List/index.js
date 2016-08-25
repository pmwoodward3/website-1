import React, { Component } from 'react'
import Carousel from 'nuka-carousel'
import { Link } from 'react-router'

import s from './styles.scss'

export default class List extends Component {
  render(){
    const { children } = this.props
    return (
      <Carousel
        cellAlign="left"
        dragging={true}
        slidesToShow={4}
        slidesToScroll={4}
        >
        {children}
      </Carousel>
    )
  }
}
