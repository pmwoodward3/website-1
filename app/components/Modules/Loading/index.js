import React, { PropTypes } from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'
import toClass from 'utils/toClass'

import Spinner from 'react-mdl/lib/Spinner'

import s from './styles.scss'

export const Loading = ({className}) => (
  <div className={toClass(s.root, className)}>
    <Spinner />
  </div>
)

Loading.propTypes = {
  className: PropTypes.string,
}

export default onlyUpdateForKeys([])(Loading)
