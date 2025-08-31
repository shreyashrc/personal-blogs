import { describe, it, expect } from 'vitest'
import { formatDate, cn } from '../lib/utils'

describe('utils', () => {
  it('formats date safely', () => {
    expect(formatDate('2025-09-01')).toBe('Sep 1, 2025')
  })
  it('joins class names', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })
})

