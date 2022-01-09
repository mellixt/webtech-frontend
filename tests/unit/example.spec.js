import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/Navbar.vue'

describe('NavBar.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'My Poll AppNew PollAbout'
    const wrapper = shallowMount(NavBar, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
