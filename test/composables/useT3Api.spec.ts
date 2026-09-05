import { fileURLToPath } from 'node:url'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'
import { listen } from 'listhen'
import { createApp, eventHandler, getRequestURL, toNodeListener } from 'h3'
import { setup, $fetch } from '@nuxt/test-utils'
import initialData from '../fixtures/api/initialData.json'
import pageData from '../fixtures/api/page.json'

function createTypo3MockApp () {
  return createApp().use(
    '/',
    eventHandler((event) => {
      const url = getRequestURL(event)
      if (url.searchParams.get('type') === '834') {
        return initialData
      }
      return pageData
    }),
  )
}

await setup({
  server: true,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('useT3Api', () => {
  let listener

  beforeEach(async () => {
    listener = await listen(toNodeListener(createTypo3MockApp()), {
      port: 9876
    })
  })

  afterEach(async () => {
    await listener.close()
  })

  it('fetch initialData and set internal state', async () => {
    const result = await $fetch('/client')
    expect(result).includes('<span>initial data: TYPO3 Demo Site</span>')
  }, 15000)

  it('fetch page data and set internal state', async () => {
    const result = await $fetch('/client')
    expect(result).includes('<span>page data: TYPO3 Demo Project</span>')
  }, 15000)

  it('use common headers', async () => {
    const result = await $fetch('/client')

    expect(result).includes('<span>headers test: typo3 is the best</span>')
  }, 15000)
})
