<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
    <p>Conteúdo da página de {{ title }}.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const segments = computed(() => route.params.slug as string[])
const title = computed(() => {
  const last = segments.value[segments.value.length - 1] ?? ''
  return last.charAt(0).toUpperCase() + last.slice(1)
})
</script>
