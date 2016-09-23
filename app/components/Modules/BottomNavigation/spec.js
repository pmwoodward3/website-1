import { shallow } from 'enzyme'
import { BottomNavigation } from './'
import s from './styles.scss'

const props = {
  location: {
    pathname: '/home',
  },
}

describe('BottomNavigation', () => {
  const element = shallow(<BottomNavigation {...props}/>)

  it('render', () => {
    expect(element.find(`.${s.root}`)).to.exist
  })
})
