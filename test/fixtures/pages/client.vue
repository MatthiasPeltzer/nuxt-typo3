<template>
  <div>
    <span>initial data: {{ initialData.navigation[0].title }}</span>
    <span>page data: {{ pageData?.meta.title }}</span>
    <span>headers test: {{ headersTest['accept-only'] }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useState } from '#app'
import { useT3Api } from '../../../src/runtime/composables/useT3Api'
const { initialData, pageData, getPage, getInitialData, setHeaders } =
  useT3Api()
const headersTest = useState<Record<string, string>>('headers', () => ({}))
setHeaders({ 'accept-only': 'typo3 is the best' })
headersTest.value = { 'accept-only': 'typo3 is the best' }

const { data: t3InitialData } = await useAsyncData(() =>
  getInitialData('/?type=834', {
    baseURL: 'http://localhost:9876'
  })
)

initialData.value = t3InitialData.value

const { data: t3PageData } = await useAsyncData(() =>
  getPage('/', {
    baseURL: 'http://localhost:9876'
  })
)

pageData.value = t3PageData.value
</script>
