import { describe, expect, it } from 'vitest'

import { sanitizeHtml, sanitizeInlineSvg } from '../../src/runtime/utils/sanitizeHtml'
import { validateVimeoEmbedUrl, validateYoutubeEmbedUrl } from '../../src/runtime/utils/validateEmbedUrl'

describe('sanitizeHtml', () => {
  it('preserves safe RTE markup', () => {
    const input = '<p>Hello <strong>world</strong></p>'
    expect(sanitizeHtml(input)).toBe(input)
  })

  it('strips script tags and event handlers', () => {
    const input = '<p onclick="alert(1)">Hi<script>alert(1)</script></p>'
    expect(sanitizeHtml(input)).toBe('<p>Hi</p>')
  })

  it('blocks javascript: links', () => {
    const input = '<a href="javascript:alert(1)">x</a>'
    expect(sanitizeHtml(input)).not.toContain('javascript:')
  })
})

describe('sanitizeInlineSvg', () => {
  it('preserves basic svg icons', () => {
    const input = '<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>'
    expect(sanitizeInlineSvg(input)).toContain('<svg')
  })

  it('strips script from svg', () => {
    const input = '<svg><script>alert(1)</script></svg>'
    expect(sanitizeInlineSvg(input)).not.toContain('script')
  })
})

describe('validateEmbedUrl', () => {
  it('accepts youtube embed urls', () => {
    expect(validateYoutubeEmbedUrl('https://www.youtube-nocookie.com/embed/abc123')).toBe(true)
  })

  it('rejects unknown youtube hosts', () => {
    expect(validateYoutubeEmbedUrl('https://evil.example/embed/abc123')).toBe(false)
  })

  it('accepts vimeo player urls', () => {
    expect(validateVimeoEmbedUrl('https://player.vimeo.com/video/123456')).toBe(true)
  })
})
