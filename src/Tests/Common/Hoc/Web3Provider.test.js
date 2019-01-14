import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import Web3Provider from '../../../Components/Common/Hoc/Web3Provider/Web3Provider'
import * as texts from '../../../Components/Common/UI/Texts/Texts'

configure({ adapter: new Adapter() })

describe('Web3 provider  ', () => {
  it(`Renders web3 provider without errors'`, () => {
    const wrapper = mount(<Web3Provider />)
    expect(wrapper.find('Web3Provider'))
  })
  it(`Renders web3 provider with content provider'`, () => {
    const wrapper = shallow(<Web3Provider />)
    expect(wrapper.find('ContextProvider'))
    //   expect(wrapper.find('Footer')).toHaveLength(1)
  })
  it(`Error if user do not have web3'`, () => {
    const wrapper = shallow(<Web3Provider />)
    const state = wrapper.state()
    expect(state.web3).toBe(null)
    expect(state.error).toBe(true)
    expect(state.displayMsg).toBe(texts.NO_WEB3)
  })
  it(`No error if user has web3'`, async () => {
    const mockCallback = jest.fn(() => true)
    window.ethereum = {
      enable: mockCallback
    }
    let wrapper = shallow(<Web3Provider />)
    wrapper.instance().loadUserDataFromWeb3 = jest.fn(() => 'This is a mocked function')
    wrapper.update()
    await wrapper.instance().busy
    expect(wrapper.instance().loadUserDataFromWeb3).toBeCalled()
  })
  it(`Error if user has web3 but no permissions granted'`, async () => {
    const mockCallback = jest.fn(() => false)
    window.ethereum = {
      enable: mockCallback
    }
    let wrapper = shallow(<Web3Provider />)
    await wrapper.instance().busy
    await wrapper.update()
    const state = wrapper.state()
    expect(state.displayMsg).toBe(texts.NO_PERMISSIONS)
  })
})
