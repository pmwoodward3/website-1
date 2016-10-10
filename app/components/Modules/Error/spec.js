import { shallow } from 'enzyme'
import { Loading } from './'
import s from './styles.scss'

describe('Loading', () => {
  const element = shallow(<Loading/>)

  it('render', () => {
    expect(element.find(`.${s.root}`)).to.exist
  })
})
