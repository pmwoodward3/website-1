import { shallow } from 'enzyme'
import { Link } from './'
import { mocks } from 'test/constants'

const childrenCount = 20

const props = {
  to: '/home',
}

describe('Link', () => {
  const element = shallow(
    <Link {...props}>
      {mocks.children(childrenCount)}
    </Link>
  )

  it('render', () => {
    expect(element).to.exist
  })

  it('render children', () => {
    expect(element.children().length).to.equal(childrenCount)
  })
})
