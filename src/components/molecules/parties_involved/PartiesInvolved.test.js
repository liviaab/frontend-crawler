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
    const { parties_involved } = processFixture
    const expectedLength = parties_involved.length + 1

    partiesInvolvedWrapper = shallow(<PartiesInvolved members={parties_involved} />)
    expect(partiesInvolvedWrapper.children()).toHaveLength(expectedLength)
  })
})
