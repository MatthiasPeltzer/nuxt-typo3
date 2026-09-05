<template>
  <iframe
    v-if="embedUrl"
    id="ytplayer"
    v-bind="$attrs"
    :class="[$attrs.class, $attrs.staticClass]"
    :width="file.properties.dimensions.width || 640"
    :height="file.properties.dimensions.height || 360"
    :src="embedUrl"
    class="t3-ce-media-video t3-ce-media-youtube"
    type="text/html"
    frameborder="0"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import type { T3File } from '../../../../module'
import { validateYoutubeEmbedUrl } from '../../../utils/validateEmbedUrl'

const props = defineProps<{
  file: T3File
}>()

const embedUrl = computed(() => {
  const url = props.file.publicUrl
  if (!url || !validateYoutubeEmbedUrl(url)) {
    return ''
  }
  return url
})
</script>
