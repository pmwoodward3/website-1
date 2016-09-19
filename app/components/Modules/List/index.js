import React, { Component, PropTypes } from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { MANGA_ITEM_CARD_HEIGHT, MANGA_ITEM_CARD_WIDTH } from 'constants'

import s from './styles.scss'

const style = {
  height: MANGA_ITEM_CARD_HEIGHT,
}

class List extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  constructor(props){
    super(props)
    this.state = {
      itemsLength: 3,
    }
  }
  componentDidMount(){
    this.setState({
      itemsLength: Math.round(this.refs.container.clientWidth / MANGA_ITEM_CARD_WIDTH),
    })
  }
  render(){
    const { children, className } = this.props
    return (
      <div
        ref="container"
        className={s.root+' '+className}
        style={style}
        >
        {children.slice(0, this.state.itemsLength)}
      </div>
    )
  }
}

export default onlyUpdateForKeys([
  'children',
  'className',
])(List)
