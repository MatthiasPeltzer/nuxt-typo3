import { fileURLToPath } from 'node:url'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createApp, eventHandler, getRequestURL, toNodeListener } from 'h3'
import { listen } from 'listhen'
import { setup, $fetch, createPage } from '@nuxt/test-utils'
import initialData from '../fixtures/api/initialData.json'
import pageData from '../fixtures/api/page.json'

await setup({
  server: true,
  browser: true,
  rootDir: fileURLToPath(new URL('../fixtures', import.meta.url))
})

describe('T3DynamicComponent', () => {
  let listener

  beforeEach(async () => {
    const app = createApp().use(
      '/',
      eventHandler((event) => {
        const url = getRequestURL(event)
        if (url.searchParams.get('type') === '834') {
          return initialData
        }
        return pageData
      }),
    )

    listener = await listen(toNodeListener(app), {
      port: 9879
    })
  })

  afterEach(async () => {
    await listener.close()
  })

  it('renders updated components', async () => {
    const page = await createPage('/components')
    const result = await $fetch('/components')
    expect(result).toContain('Apples are awesome')
    await page.click('[id="refresh"]')
    await page.waitForFunction(() => document.body.innerText.includes('Updated content'))
    const content = await page.content()
    expect(content).toContain('Updated content')
  }, 15000)
})
