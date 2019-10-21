import nock from 'nock'
import React from 'react'
import { shallow } from 'enzyme'
import SearchForm from './SearchForm'
import courtsResponse from '../../../fixtures/courts'
import processResponse from '../../../fixtures/process'

const initCourtNock = () => (
  nock(process.env.REACT_APP_BASE_URL)
    .get('/courts')
    .reply(200, courtsResponse, { 'Content-Type': 'application/json' })
)

describe('SearchForm organism', () => {
  const processNumber = '0067154-55.2010.8.02.0001'
  let mockFunction
  let searchFormWrapper

  beforeEach(() => {
    process.env.REACT_APP_BASE_URL = 'http://base.url/api/v1'
    mockFunction = jest.fn()
  })

  it('loads all courts after mount', (done) => {
    initCourtNock()
    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    setTimeout(() => {
      done()
      expect(searchFormWrapper.state().courts).toHaveLength(courtsResponse.length)
    }, 200)
  })

  it('does not update state if api does not return courts response', (done) => {
    nock(process.env.REACT_APP_BASE_URL)
      .get('/courts')
      .reply(500, 'Internal Server Error', { 'Content-Type': 'application/json' })


    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    setTimeout(() => {
      done()
      expect(searchFormWrapper.state().courts).toHaveLength(0)
    }, 200)
  })

  it('calls the `updateParent` function after search for a valid process number', (done) => {
    const initialState = {
      courts: [],
      court_name: '',
      process_number: ''
    }
    const expectedFinalState = {
      courts: courtsResponse.map((item) => ({ id: item.id, label: item.initials })),
      court_name: '',
      process_number: processNumber
    }

    initCourtNock()
    nock(process.env.REACT_APP_BASE_URL)
      .get(`/processes/${processNumber}`)
      .reply(200, processResponse, { 'Content-Type': 'application/json' })


    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    expect(searchFormWrapper.state()).toEqual(initialState)

    searchFormWrapper.setState({ process_number: processNumber })
    searchFormWrapper.find('#submit').simulate('click')

    setTimeout(() => {
      done()
      expect(mockFunction).toHaveBeenCalledTimes(1)
      expect(searchFormWrapper.state()).toEqual(expectedFinalState)
    }, 200)
  })

  it('does not call `updateParent` function  if the process number is invalid', (done) => {
    initCourtNock()
    nock(process.env.REACT_APP_BASE_URL)
      .get('/processes/undefined')
      .reply(500, 'Internal Server Error', { 'Content-Type': 'application/json' })

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    setTimeout(() => {
      done()
      expect(mockFunction).not.toHaveBeenCalled()
    }, 200)
  })

  it('updates state if court is selected', () => {
    initCourtNock()
    const event = { id: 1, label: 'TJAL' }

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    const combobox = searchFormWrapper.find('Combobox')
    combobox.simulate('change', event)
    expect(searchFormWrapper.state().court_name).toEqual('TJAL')
  })

  it('updates state if process number is selected', () => {
    initCourtNock()
    const event = {
      target: {
        value: processNumber
      }
    }

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    const input = searchFormWrapper.find('#input-process-number')
    input.simulate('change', event)
    expect(searchFormWrapper.state().process_number).toEqual(processNumber)
  })
})
