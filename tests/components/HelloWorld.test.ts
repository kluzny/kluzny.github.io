import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HelloWorld from '../../components/HelloWorld.vue'

describe('HelloWorld', () => {
  it('starts with count 0', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.text()).toContain('Count: 0')
    expect(wrapper.text()).toContain('Double: 0')
  })

  it('increments count on button click', async () => {
    const wrapper = mount(HelloWorld)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Count: 1')
  })

  it('keeps double in sync with count', async () => {
    const wrapper = mount(HelloWorld)
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Count: 2')
    expect(wrapper.text()).toContain('Double: 4')
  })
})
