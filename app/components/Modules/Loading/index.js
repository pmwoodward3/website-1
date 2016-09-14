import React from 'react'
import { onlyUpdateForKeys } from 'recompose'

import CircularProgress from 'material-ui/CircularProgress'

import s from './styles.scss'

const Loading = () => (
  <div className={s.root}>
    <CircularProgress size={1.5} />
  </div>
)

export default onlyUpdateForKeys([])(Loading)
