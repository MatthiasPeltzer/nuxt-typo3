const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'youtu.be',
])

const VIMEO_HOSTS = new Set([
  'vimeo.com',
  'www.vimeo.com',
  'player.vimeo.com',
])

function normalizeHost (hostname: string): string {
  return hostname.trim().toLowerCase().replace(/\.$/, '')
}

function hostMatches (hostname: string, allowedHosts: Set<string>): boolean {
  const host = normalizeHost(hostname)
  return allowedHosts.has(host)
}

export function validateYoutubeEmbedUrl (url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') {
      return false
    }
    return hostMatches(parsed.hostname, YOUTUBE_HOSTS)
  } catch {
    return false
  }
}

export function validateVimeoEmbedUrl (url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') {
      return false
    }
    return hostMatches(parsed.hostname, VIMEO_HOSTS)
  } catch {
    return false
  }
}
