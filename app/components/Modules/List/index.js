import React from 'react'
import { MANGA_ITEM_CARD_HEIGHT } from 'constants'

import s from './styles.scss'

const style = {
  height: MANGA_ITEM_CARD_HEIGHT,
}

const List = ({children, className}) => (
  <div
    className={s.root+' '+className}
    style={style}
    >
    {children}
  </div>
)

export default List
