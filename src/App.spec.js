import React from 'react'
import { MemoryRouter } from 'react-router'
import { configure, mount, shallow } from 'enzyme'
import App from '../src/App'
import Adapter from 'enzyme-adapter-react-16/build'
import { AccountSummaryComponent, HomeComponent } from './Components'
import spinner from './Components/Common/UI/Spinner/Spinner'

/*it('renders welcome message', () => {
  const wrapper = mount(<App />)
  const welcome = 'Hello LivePeer Alerts!'
  expect(wrapper.contains(welcome)).toEqual(true)
})*/

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
  /*  it('Expect route / to be AccountSummaryComponent if the user is authenticated', () => {
    let props = {
      web3: [],
      userData: {
        authenticated: true
      },
      render: false
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={['/account']} initialIndex={0}>
        <App />
      </MemoryRouter>
    )

    //expect(wrapper.find(HomeComponent)).toHaveLength(1)
    expect.any(wrapper.find(AccountSummaryComponent)).toHaveLength(1)

  })*/
})
