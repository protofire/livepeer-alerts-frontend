import React from 'react'
import { MemoryRouter } from 'react-router'
import { configure, mount } from 'enzyme'
import App from '../App'
import Adapter from 'enzyme-adapter-react-16'
import { AccountSummaryComponent, HomeComponent } from '../Components'

configure({ adapter: new Adapter() })
describe('Check public and protected routes', () => {
  it('Expect route / to be homeComponent', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(wrapper.find(HomeComponent)).toHaveLength(1)
  })
  it('Redirect from /account to / unauthenticated users', () => {
    let props = {
      web3: [],
      userData: {
        authenticated: false,
        reason: '',
        address: 123,
        currentNetwork: 123
      },
      render: true
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={['/account']}>
        <App {...props} />
      </MemoryRouter>
    )
    expect(wrapper.find(AccountSummaryComponent)).toHaveLength(0)
    expect(wrapper.find(HomeComponent)).toHaveLength(1)
  })
})
