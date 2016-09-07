import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { myList as myListSelector } from 'redux/selectors/myList'

import s from './styles.scss'
import MangaItemCard from 'components/Modules/MangaItemCard'
import List from 'components/Modules/List'
import Paper from 'material-ui/Paper'

export class MyList extends Component {
  static propTypes = {
    myList: PropTypes.object.isRequired,
  };

  render() {
    const { myList } = this.props

    return (
      <section className={s.root}>
        <Helmet
          title="SB - MyList"
          />
        <Paper zDepth={2} className={s.section}>
          <List className={s.myList}>
            {myList.items.map((item) => item && (
              <MangaItemCard key={'myList'+item.mangaid} {...item}/>
            ))}
          </List>
        </Paper>
      </section>
    )
  }
}

export default connect(
  state => ({
    myList: myListSelector(state),
  }),
)(MyList)
