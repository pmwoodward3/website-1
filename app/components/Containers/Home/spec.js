import { mount } from 'enzyme'
import { Home } from './'
import s from './styles.scss'
import { mocks } from 'test/constants'

const itemCount = 10

const items = mocks.mangaTableItems(itemCount)

const createProps = () => ({
  releases: {
    isLoaded: true,
    items,
  },
  readingHistory: {
    isLoaded: true,
    items,
  },
  recommendations: {
    isLoaded: true,
    items,
  },
  rawFavorites: {
    isLoaded: true,
    items,
  },
  home: {
    sectionRowLength: itemCount / 2,
    expandedSections: {},
  },
  offline: false,
  getReleases: sinon.spy(),
  changeHeader: sinon.spy(),
  getRecommendations: sinon.spy(),
  expandSection: sinon.spy(),
  closeSection: sinon.spy(),
  setSectionRowLength: sinon.spy(),
})

const renderElement = (props) => mount(
  <Home {...props}/>
)

describe('Home', () => {
  const props = createProps()
  const element = renderElement(props)

  it('renders', () => {
    expect(element.find(`.${s.root}`)).to.exist
    expect(element.find(`.${s.section}`)).to.exist
    expect(element.find(`.${s.sectionTitle}`)).to.exist
  })

  it('has all props', () => {
    expect(element.props()).to.contain(props)
  })

  it('changes header title on mount', () => {
    expect(props.changeHeader.calledOnce).to.equal(true)
  })

  it('sets sectionRowLength on mount', () => {
    expect(props.setSectionRowLength.calledOnce).to.equal(true)
  })

  it('gets releases on mount', () => {
    expect(props.getReleases.calledOnce).to.equal(true)
  })

  it('gets recommendations on mount', () => {
    expect(props.getRecommendations.calledOnce).to.equal(true)
  })

  it('shows all sections', () => {
    expect(element.find(`.${s.section}`).length).to.equal(4)
  })

  describe('shows/hides expand button', () => {
    describe('when sectionRowLength is less than items', () => {
      const props = createProps()
      const element = renderElement({
        ...props,
        home: {
          ...props.home,
          sectionRowLength: itemCount / 2,
        },
      })
      it('expand button is visible', () => {
        expect(element.find(`.${s.expandButton}`)).to.exist
      })
    })

    describe('when sectionRowLength is equal or more than items', () => {
      const props = createProps()
      const element = renderElement({
        ...props,
        home: {
          ...props.home,
          sectionRowLength: itemCount * 2,
        },
      })
      it('expand button is hidden', () => {
        expect(element.find(`.${s.expandButton}`)).to.not.exist
      })
    })
  })

  describe('expands and contracts list', () => {
    const props = createProps()
    const element = renderElement(props)

    it('shows expand button when sections are not expanded', () => {
      expect(element.find(`.${s.expandButton}`)).to.exist
    })

    // it('calls expandSection when button is tapped', () => {
      // const node  = ReactDOM.findDOMNode(element.node)
      // TestUtils.Simulate.touchTap(node)
      // console.log(props.expandSection.callCount)
    // })

    it('shows contract button when sections are expanded', () => {
      element.setProps ({
        home: {
          ...props.home,
          expandedSections: {
            'readingHistory': true,
            'recommendations': true,
          },
        },
      })
      expect(element.find(`.${s.contractButton}`)).to.exist
    })
  })

  describe('is correct when offline', () => {
    const props = createProps()
    const element = renderElement({
      ...props,
      offline: true,
    })

    it('doesn\'t get releases on mount', () => {
      expect(props.getReleases.calledOnce).to.equal(false)
    })

    it('doesn\'t get recommendations on mount', () => {
      expect(props.getRecommendations.calledOnce).to.equal(false)
    })

    it('only shows readingHistory', () => {
      expect(element.find(`.${s.section}`).length).to.equal(1)
    })
  })

  describe('updates when back online', () => {
    const props = createProps()
    const element = renderElement({
      ...props,
      offline: true,
    })

    element.setProps({
      offline: false,
    })

    it('gets releases', () => {
      expect(props.getReleases.calledOnce).to.equal(true)
    })

    it('gets recommendations', () => {
      expect(props.getRecommendations.calledOnce).to.equal(true)
    })
  })
})
