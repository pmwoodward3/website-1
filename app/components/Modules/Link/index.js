import React from 'react'
import { browserHistory } from 'react-router'

const go = (x) => () => browserHistory.push(x)

const Link = ({children, to, disabled, ...props}) => (
  <div {...props} onTouchTap={!disabled && go(to)}>
    {children}
  </div>
)

export default Link
