<template>
  <iframe
    v-if="embedUrl"
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    :src="embedUrl"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :title="file.properties.title!"
    frameborder="0"
    class="t3-ce-media-video t3-ce-media-vimeo"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import type { T3File } from '../../../../module'
import { validateVimeoEmbedUrl } from '../../../utils/validateEmbedUrl'

const props = defineProps<{
  file: T3File
}>()

const embedUrl = computed(() => {
  const url = props.file.publicUrl
  if (!url || !validateVimeoEmbedUrl(url)) {
    return ''
  }
  return url
})
</script>
