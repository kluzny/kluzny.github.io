// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExtLink from '../../components/ExtLink.vue'

const stubs = { Icon: true }

describe('ExtLink', () => {
  it('prepends // to bare hostnames', () => {
    const wrapper = mount(ExtLink, { props: { href: 'example.com' }, global: { stubs } })
    expect(wrapper.find('a').attributes('href')).toBe('//example.com')
  })

  it('leaves https:// URLs unchanged', () => {
    const wrapper = mount(ExtLink, {
      props: { href: 'https://example.com' },
      global: { stubs },
    })
    expect(wrapper.find('a').attributes('href')).toBe('https://example.com')
  })

  it('leaves http:// URLs unchanged', () => {
    const wrapper = mount(ExtLink, { props: { href: 'http://example.com' }, global: { stubs } })
    expect(wrapper.find('a').attributes('href')).toBe('http://example.com')
  })

  it('sets rel=noopener noreferrer', () => {
    const wrapper = mount(ExtLink, { props: { href: 'example.com' }, global: { stubs } })
    expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
  })
})
