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

describe('SearchForm', () => {
  it('does not update state if api does not return courts response', (done) => {
    process.env.REACT_APP_BASE_URL = 'http://base.url/api/v1'
    const mockFunction = jest.fn()

    nock(process.env.REACT_APP_BASE_URL)
      .get('/courts')
      .reply(500, 'Internal Server Error', { 'Content-Type': 'application/json' })

    const searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    setTimeout(() => {
      done()
      expect(searchFormWrapper.state().courts).toHaveLength(0)
    }, 300)
  })
})

describe('SearchForm organism', () => {
  const processNumber = '0067154-55.2010.8.02.0001'
  let mockFunction
  let searchFormWrapper

  beforeAll(() => {
    process.env.REACT_APP_BASE_URL = 'http://base.url/api/v1'
    mockFunction = jest.fn()

    initCourtNock()
  })

  it('loads all courts after mount', (done) => {
    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    setTimeout(() => {
      done()
      expect(searchFormWrapper.state().courts).toHaveLength(courtsResponse.length)
    }, 300)
  })

  it('calls the `updateParent` function after search for a valid process number', (done) => {
    const validState = {
      processNumber: {
        value: processNumber,
        valid: true
      },
      courtName: {
        value: 'TJAL',
        valid: true
      }
    }

    nock(process.env.REACT_APP_BASE_URL)
      .get(`/processes/${processNumber}`)
      .reply(200, processResponse, { 'Content-Type': 'application/json' })

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    searchFormWrapper.setState({ ...validState })
    searchFormWrapper.find('#submit').simulate('click')

    setTimeout(() => {
      done()
      expect(mockFunction).toHaveBeenCalledTimes(1)
    }, 300)
  })

  it('calls `updateParent` function if the process number is invalid '
      + 'but it does not show results', (done) => {
    nock(process.env.REACT_APP_BASE_URL)
      .get('/processes/invalido')
      .reply(404, 'Not Found', { 'Content-Type': 'application/json' })

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    const invalidProcessState = {
      ...searchFormWrapper.state(),
      courtName: {
        valid: true,
        value: 'TJAL'
      },
      processNumber: {
        valid: true,
        value: 'invalido'
      }
    }

    searchFormWrapper.setState({ invalidProcessState })
    setTimeout(() => {
      done()
      searchFormWrapper.find('#submit').simulate('click')
      expect(mockFunction).toHaveBeenCalledTimes(1)
    }, 200)
  })

  it('updates state if court is selected', () => {
    const event = { id: 1, label: 'TJAL' }

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    const combobox = searchFormWrapper.find('Combobox')
    combobox.simulate('change', event)
    expect(searchFormWrapper.state().courtName.value).toEqual('TJAL')
  })

  it('updates state if process number is selected', () => {
    const event = {
      target: {
        value: processNumber
      }
    }

    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    const input = searchFormWrapper.find('#input-process-number')
    input.simulate('change', event)
    expect(searchFormWrapper.state().processNumber.value).toEqual(processNumber)
  })

  it('does not do search if fields are empty', () => {
    searchFormWrapper = shallow(<SearchForm updateParent={mockFunction} />)
    expect(searchFormWrapper.instance().canDoSearch()).toBeFalsy()
  })
})
