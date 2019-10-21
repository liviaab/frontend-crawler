import React from 'react'
import { shallow } from 'enzyme'
import Title from './Title'

describe('Title component', () => {
  it('renders title without subtitle', () => {
    const titleWrapper = shallow(<Title title="Isso é um título" />)

    expect(titleWrapper.find('.title').text()).toEqual('Isso é um título')
  })

  it('renders title and subtitle', () => {
    const titleWrapper = shallow(<Title
      title="Isso é um título"
      subtitle="Meu subtítulo"
    />)

    expect(titleWrapper.find('.title').text()).toEqual('Isso é um título')
    expect(titleWrapper.find('.subtitle').text()).toEqual('Meu subtítulo')
  })
})
