import { describe, it, expect } from 'vitest'
import { filenameToSlug } from '../lib/mdx'

describe('mdx helpers', () => {
  it('filenameToSlug removes extension', () => {
    expect(filenameToSlug('hello-world.mdx')).toBe('hello-world')
    expect(filenameToSlug('hello-world.md')).toBe('hello-world')
  })
})

