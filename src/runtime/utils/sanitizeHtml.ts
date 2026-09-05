import sanitizeHtmlLib from 'sanitize-html'

const RTE_ALLOWED_TAGS = [
  'a',
  'abbr',
  'b',
  'blockquote',
  'br',
  'caption',
  'code',
  'col',
  'colgroup',
  'dd',
  'div',
  'dl',
  'dt',
  'em',
  'figcaption',
  'figure',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'span',
  'strong',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
]

const RTE_ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  '*': ['class', 'id', 'title'],
  a: ['href', 'target', 'rel'],
  img: ['src', 'alt', 'width', 'height'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
}

const SVG_ALLOWED_TAGS = [
  'svg',
  'circle',
  'ellipse',
  'g',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
]

const SVG_ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  svg: ['viewBox', 'width', 'height', 'class', 'aria-hidden', 'role', 'xmlns', 'fill'],
  circle: ['cx', 'cy', 'r', 'fill', 'class'],
  ellipse: ['cx', 'cy', 'rx', 'ry', 'fill', 'class'],
  g: ['fill', 'class'],
  line: ['x1', 'x2', 'y1', 'y2', 'stroke', 'class'],
  path: ['d', 'fill', 'class'],
  polygon: ['points', 'fill', 'class'],
  polyline: ['points', 'fill', 'class'],
  rect: ['x', 'y', 'width', 'height', 'fill', 'class'],
}

const SANITIZE_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: RTE_ALLOWED_TAGS,
  allowedAttributes: RTE_ALLOWED_ATTRIBUTES,
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
}

const SVG_SANITIZE_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: SVG_ALLOWED_TAGS,
  allowedAttributes: SVG_ALLOWED_ATTRIBUTES,
  disallowedTagsMode: 'discard',
}

export function sanitizeHtml (html: string): string {
  if (!html) {
    return ''
  }

  return sanitizeHtmlLib(html, SANITIZE_OPTIONS)
}

export function sanitizeInlineSvg (svg: string): string {
  if (!svg) {
    return ''
  }

  return sanitizeHtmlLib(svg, SVG_SANITIZE_OPTIONS)
}
