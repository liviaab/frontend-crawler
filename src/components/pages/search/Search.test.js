import React from 'react'
import { shallow } from 'enzyme'
import Search from './Search'
import processFixture from '../../../fixtures/process'


describe('Search page', () => {
  let searchWrapper

  it('shows only the SearchForm when page is loaded', () => {
    searchWrapper = shallow(<Search />)
    expect(searchWrapper.find('SearchForm')).toBeTruthy()
    expect(searchWrapper.state().showResults).toBeFalsy()
    expect(searchWrapper.find('#search-results').hasClass('hideResults')).toBeTruthy()
  })

  it('shows process results and info after search a valid process', () => {
    const expectedState = {
      ...processFixture,
      court_name: ''
    }
    searchWrapper = shallow(<Search />)

    searchWrapper.instance().updateProcess(processFixture)
    expect(searchWrapper.find('#search-results').hasClass('resultsWrapper')).toBeTruthy()
    expect(searchWrapper.state().showResults).toBeTruthy()
    expect(searchWrapper.state().process).toEqual(expectedState)
  })
})
