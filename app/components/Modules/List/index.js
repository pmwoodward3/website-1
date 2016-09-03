import React from 'react'
import { MANGA_ITEM_CARD_HEIGHT } from 'constants'

import s from './styles.scss'

const style = {
  height: MANGA_ITEM_CARD_HEIGHT,
}

const List = ({children}) => (
  <div
    className={s.root}
    style={style}
    >
    {children}
  </div>
)

export default List
