import { shallowMount } from '@vue/test-utils'
import NavBar from '@/components/NavBar.vue'
import Polls from '@/views/Polls.vue'
import Vue from 'vue'

describe('NavBar.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'My Poll AppNew PollAbout'
    const wrapper = shallowMount(NavBar, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
describe('Polls.vue', () => {
  it('checks if polls exist', () => {
    // build component
    const Constructor = Vue.extend(Polls)
    const PollsComponent = new Constructor().$mount()
    expect(PollsComponent)
  })
})
