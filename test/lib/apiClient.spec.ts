import { expect, describe, it } from 'vitest'
import { T3ApiClient } from '../../src/runtime/lib/apiClient'

const siteConfig = {
  hostname: 'localhost',
  api: {
    baseUrl: 'https://api.t3pwa.com',
    endpoints: {
      initialData: '?type=834',
      initialDataFallback: '/?type=834'
    }
  },
  i18n: {
    default: 'pl',
    locales: ['pl', 'en']
  }
}

describe('T3ApiClient', () => {
  it('returns raw headers', () => {
    const client = new T3ApiClient(siteConfig)
    client.setHeaders({ Authorization: 'Token' })
    const { headers } = client.getOptions({})
    expect(headers).toEqual({ Authorization: 'Token' })
  })

  it('uses internal fetch instance with custom setup', () => {
    const client = new T3ApiClient(siteConfig)
    client.setHeaders({ Authorization: 'Token' })

    const options = client.getOptions({})

    expect(options).toHaveProperty('baseURL', 'https://api.t3pwa.com')
    expect((options.headers as Record<string, string>).Authorization).toBe('Token')
  })

  it('preserves the type query parameter when allowQuery is disabled', () => {
    const client = new T3ApiClient({
      ...siteConfig,
      api: {
        ...siteConfig.api,
        allowQuery: false,
      },
    })

    expect(client.filterQuery('/about?type=834&utm_source=test')).toBe('/about?type=834')
  })
})
