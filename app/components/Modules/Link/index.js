import React from 'react'
import { hashHistory } from 'react-router'

const go = (x) => () => hashHistory.push(x)

const Link = ({children, to, disabled, ...props}) => (
  <div {...props} onTouchTap={!disabled && go(to)}>
    {children}
  </div>
)

export default Link
