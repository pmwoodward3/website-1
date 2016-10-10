import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import s from './styles.scss'
import './sad.svg'

const Error = ({title='Page not Found'}) => (
  <div className={s.root}>
    <Helmet
      title={title}
      />
    <img src="/sad.svg" alt="Sad" className={s.sad}/>
    <h1 className={s.title}>{title}</h1>
  </div>
)

Error.propTypes = {
  title: PropTypes.string,
}

export default Error
