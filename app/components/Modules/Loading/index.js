import React from 'react'
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys'

import Spinner from 'react-mdl/lib/Spinner'

import s from './styles.scss'

export const Loading = () => (
  <div className={s.root}>
    <Spinner />
  </div>
)

export default onlyUpdateForKeys([])(Loading)
