// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Post from '../../components/Post.vue'

describe('Post with missing content', () => {
  // the site is static (ssr: false, hosted on GitHub Pages) so there is no ipx server to
  // answer /_ipx/ URLs; the image must point at the file in public/
  it('shows the sad tux served directly from public/', async () => {
    const wrapper = await mountSuspended(Post, { props: { content: '/does-not-exist' } })
    expect(wrapper.find('img').attributes('src')).toBe('/tux_head_sad.png')
  })
})
