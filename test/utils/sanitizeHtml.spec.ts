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

  it('preserves list-style-type on ul and ol', () => {
    const input = '<ul style="list-style-type:disc;"><li>a</li></ul><ol style="list-style-type:upper-latin;"><li>b</li></ol>'
    expect(sanitizeHtml(input)).toContain('list-style-type:disc')
    expect(sanitizeHtml(input)).toContain('list-style-type:upper-latin')
  })

  it('strips unsafe inline styles from lists', () => {
    const input = '<ul style="list-style-type:disc;background:url(javascript:alert(1))"><li>a</li></ul>'
    const output = sanitizeHtml(input)
    expect(output).toContain('list-style-type:disc')
    expect(output).not.toContain('javascript')
    expect(output).not.toContain('background')
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
