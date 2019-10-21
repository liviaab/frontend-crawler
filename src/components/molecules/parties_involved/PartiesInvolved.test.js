import React from 'react'
import { shallow } from 'enzyme'
import PartiesInvolved from './PartiesInvolved'
import processFixture from '../../../fixtures/process'

describe('PartiesInvolved molecule', () => {
  let partiesInvolvedWrapper

  it('renders only the title if arg is empty', () => {
    partiesInvolvedWrapper = shallow(<PartiesInvolved members={[]} />)
    expect(partiesInvolvedWrapper).toHaveLength(1)
    expect(partiesInvolvedWrapper.children().text()).toEqual('Partes envolvidas')
  })

  it('renders the list content', () => {
    const members = processFixture.parties_involved
    const expectedLength = members.length + 1

    partiesInvolvedWrapper = shallow(<PartiesInvolved members={members} />)
    expect(partiesInvolvedWrapper.children()).toHaveLength(expectedLength)
  })
})
