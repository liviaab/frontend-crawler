import React from 'react'
import { shallow, mount } from 'enzyme'
import ListOfChanges from './ListOfChanges'
import processFixture from '../../../fixtures/process'


describe('ListOfChanges organism', () => {
  let listOfChanges

  it('renders a table without body when changes argument is empty', () => {
    listOfChanges = mount(<ListOfChanges changes={[]} />)
    expect(listOfChanges.find('Body').children()).toHaveLength(0)
    expect(listOfChanges.find('TableBody').children().length).toEqual(0)
    expect(listOfChanges.find('.Body').children().length).toEqual(0)

  })

  it('renders a full table with correct argument', () => {
    const changes = processFixture.movimentations
    listOfChanges = mount(<ListOfChanges changes={changes} />)
    expect(listOfChanges.find('TableBody').children().length).toBeGreaterThan(0)
  })
})
