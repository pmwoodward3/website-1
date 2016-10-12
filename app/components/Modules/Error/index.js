import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import toClass from 'utils/toClass'

import s from './styles.scss'
import './sad.svg'

const Error = ({title='Page not Found', className, setTitle=true}) => (
  <div className={toClass(s.root, className)}>
    {setTitle && (
      <Helmet
        title={title}
        />
    )}
    <img src="/sad.svg" alt="Sad" className={s.sad}/>
    <h1 className={s.title}>{title}</h1>
  </div>
)

Error.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  setTitle: PropTypes.bool,
}

export default Error
