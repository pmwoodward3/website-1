import { shallow } from 'enzyme'
import { MangaItemCard } from './'
import s from './styles.scss'
import { context } from 'test/constants'

const props = {
  mangaid: 0,
  cover: 'cover',
  title: 'title',
  chapter: 'chapter',
  chapternum: 0,
  pagenum: 12,
  source: 'source',
  flex: true,
}

describe('MangaItemCard', () => {
  const element = shallow(<MangaItemCard {...props}/>, {context})

  it('render', () => {
    expect(element.find(`.${s.root}`)).to.exist
    expect(element.find(`.${s.cover}`)).to.exist
  })

  it('expect img to use cover corresponding to the state', () => {
    expect(element.state()).to.contain({fullCover: true})

    expect(element.find(`.${s.cover}`).prop('src')).to.equal(`http://mcd.iosphe.re/t/${props.mangaid}/1/front/a/`)

    element.setState({fullCover: false})

    expect(element.state()).to.contain({fullCover: false})

    expect(element.find(`.${s.cover}`).prop('src')).to.equal(props.cover)
  })
})
