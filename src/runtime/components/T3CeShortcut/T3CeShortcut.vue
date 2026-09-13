<template>
  <div class="t3-ce-shortcut">
    <T3Renderer :content="shortcut" />
  </div>
</template>

<script setup lang="ts">
import type { T3CeBaseProps } from '../../../module'

interface T3CeShortcutProps {
  shortcut: Array<T3CeBaseProps>
}

defineProps<T3CeShortcutProps>()
</script>
