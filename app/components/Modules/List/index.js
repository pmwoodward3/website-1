import React, { PropTypes } from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { MAX_SECTION_ROWS, MANGA_ITEM_CARD_HEIGHT } from 'constants'
import toClass from 'utils/toClass'

import s from './styles.scss'

const rootStyle = {
  minHeight: MANGA_ITEM_CARD_HEIGHT,
}

const List = ({
  children,
  className,
  expanded,
  sectionRowLength,
}) => {
  const slice = expanded
  ? children.slice(0, MAX_SECTION_ROWS * sectionRowLength)
  : children.slice(0, sectionRowLength)

  return (
    <div
      style={rootStyle}
      className={toClass([
        s.root,
        expanded && s.expanded,
        className,
      ])}
      >
      {slice}
    </div>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  sectionRowLength: PropTypes.number.isRequired,
  className: PropTypes.string,
  expanded: PropTypes.bool,
}
List.defaultProps = {
  expanded: false,
}

export default onlyUpdateForKeys([
  'children',
  'className',
])(List)
