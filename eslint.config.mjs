import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({})
  .append({
    ignores: [
      'dist/**',
      'node_modules/**',
      'docs/**',
    ],
  })
  .append({
    rules: {
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-empty-object-type': ['error', {
        allowInterfaces: 'with-single-extends',
      }],
    },
  })
