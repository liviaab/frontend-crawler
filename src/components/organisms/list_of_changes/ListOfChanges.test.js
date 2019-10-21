import React from 'react'
import { shallow } from 'enzyme'
import ListOfChanges from './ListOfChanges'
import processFixture from '../../../fixtures/process'


describe('ListOfChanges organism', () => {
  let listOfChanges

  it('renders a table without body when changes argument is empty', () => {
    listOfChanges = shallow(<ListOfChanges changes={[]} />)
    expect(listOfChanges.find('TableBody').children()).toHaveLength(0)
  })

  it('renders a full table with correct argument', () => {
    const changes = processFixture.movimentations
    listOfChanges = shallow(<ListOfChanges changes={changes} />)
    expect(listOfChanges.find('TableBody').children()).toHaveLength(5)
  })
})
