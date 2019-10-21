import React from 'react'
import { shallow } from 'enzyme'
import LawsuitDetails from './LawsuitDetails'
import processFixture from '../../../fixtures/process'

describe('LawsuitDetails molecule', () => {
  let lawsuitDetailsWrapper

  it('renders only the title if arg is empty', () => {
    lawsuitDetailsWrapper = shallow(<LawsuitDetails process={{}} />)
    expect(lawsuitDetailsWrapper).toHaveLength(1)
    expect(lawsuitDetailsWrapper.children().text()).toEqual('Detalhes do processo')
  })

  it('renders the list content', () => {
    lawsuitDetailsWrapper = shallow(<LawsuitDetails process={processFixture} />)
    expect(lawsuitDetailsWrapper.children()).toHaveLength(6)
  })
})
