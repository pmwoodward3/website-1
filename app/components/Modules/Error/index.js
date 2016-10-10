import React from 'react'

import s from './styles.scss'
import './sad.svg'

const Error = () => (
  <div className={s.root}>
    <img src="/sad.svg" alt="Sad" className={s.sad}/>
    <h1 className={s.title}>Page not Found</h1>
  </div>
)

export default Error
