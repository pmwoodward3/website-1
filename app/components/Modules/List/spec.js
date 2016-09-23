import { shallow } from 'enzyme'
import { List } from './'
import s from './styles.scss'
import { mocks } from 'test/constants'

const props = {
  sectionRowLength: 5,
  expanded: false,
}

const childrenCount = 20

const renderElement = (props) => shallow(
  <List {...props}>
    {mocks.children(childrenCount)}
  </List>
)

describe('List', () => {
  const element = renderElement(props)

  it('render', () => {
    expect(element.find(`.${s.root}`)).to.exist
  })

  it('renders only an amount of items described by the prop sectionRowLength', () => {
    expect(element.children().length).to.equal(props.sectionRowLength)

    props.sectionRowLength = 10
    const newElement = renderElement(props)

    expect(newElement.children().length).to.equal(props.sectionRowLength)
  })

  it('expands to show all items', () => {
    props.expanded = true
    const newElement = renderElement(props)

    expect(newElement.children().length).to.equal(childrenCount)
  })
})
