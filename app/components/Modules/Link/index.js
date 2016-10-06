import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

const go = (x, disabled) => (e) => {
  e.preventDefault()
  if(!disabled) browserHistory.push(x)
}

export const Link = ({children, to, disabled, ...props}) => (
  <a {...props} onClick={go(to, disabled)} href={to}>
    {children}
  </a>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default Link
