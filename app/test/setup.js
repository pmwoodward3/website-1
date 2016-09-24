import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-test-utils'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'
import { jsdom } from 'jsdom'
import injectTapEventPlugin from 'react-tap-event-plugin'

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.document = jsdom('')
global.window = document.defaultView
global.navigator = { userAgent: 'browser' }

global.React = React
global.ReactDOM = ReactDOM
global.TestUtils = TestUtils
global.expect = expect
global.sinon = sinon

global.fdescribe = (...args) => describe.only(...args)
global.fit = (...args) => it.only(...args)

window.matchMedia = window.matchMedia || function matchMedia() {
  return {
    matches: () => {},
    addListener: () => {},
    removeListener: () => {},
  }
}

injectTapEventPlugin()
