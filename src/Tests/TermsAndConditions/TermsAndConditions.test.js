import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TermsAndConditionsComponent from '../../Components/TermsAndConditions/TermsAndConditions'

configure({ adapter: new Adapter() })

describe('Renders terms and conditions', () => {
  it('Shows terms and conditions', () => {
    let wrapper = mount(<TermsAndConditionsComponent />)
    let termsCard = wrapper.find('Card')
    expect(termsCard.hasClass('TermsAndConditionsComponent-cardTerms-4')).toEqual(true)
  })
})
