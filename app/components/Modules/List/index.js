import React, { PropTypes } from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import { MAX_SECTION_ROWS, MANGA_ITEM_CARD_HEIGHT } from 'constants'
import toClass from 'utils/toClass'

import s from './styles.scss'

const rootStyle = {
  minHeight: MANGA_ITEM_CARD_HEIGHT,
}

export const List = ({
  children,
  className,
  expanded,
  sectionRowLength,
  ...props,
}) => {
  const slice = expanded
  ? children
  : children.slice(0, sectionRowLength)

  return (
    <div
      style={rootStyle}
      className={toClass([
        s.root,
        expanded && s.expanded,
        className,
      ])}
      {...props}
      >
      {slice}
    </div>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  sectionRowLength: PropTypes.number,
  className: PropTypes.string,
  expanded: PropTypes.bool,
}
List.defaultProps = {
  expanded: false,
  sectionRowLength: 4,
}

export default onlyUpdateForKeys([
  'children',
  'className',
])(List)
