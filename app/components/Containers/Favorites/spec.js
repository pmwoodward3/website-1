import { mount } from 'enzyme'
import { Favorites } from './'
import s from './styles.scss'
import { mocks } from 'test/constants'

const props = {
  favorites: {
    isLoaded: true,
    items: mocks.mangaTableItems(10),
  },
  changeHeader: sinon.spy(),
}

const renderElement = (props) => mount(
  <Favorites {...props}/>
)

describe('Favorites', () => {
  const element = renderElement(props)

  it('renders', () => {
    expect(element.find(`.${s.root}`)).to.exist
    expect(element.find(`.${s.section}`)).to.exist
    expect(element.find(`.${s.favorites}`)).to.exist
  })
  
  it('has all props', () => {
    expect(element.props()).to.contain(props)
  })

  it('changes header title on mount', () => {
    expect(props.changeHeader.calledOnce).to.equal(true)
  })

  it('renders all items', () => {
    expect(element.find(`.${s.favorites}`).children().length).to.equal(props.favorites.items.length)
  })
})
