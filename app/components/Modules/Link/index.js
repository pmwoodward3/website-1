import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

const go = (x) => () => browserHistory.push(x)

export const Link = ({children, to, disabled, ...props}) => (
  <div {...props} onClick={!disabled && go(to)}>
    {children}
  </div>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default Link
