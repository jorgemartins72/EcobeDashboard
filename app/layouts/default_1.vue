<template>
  <div class="h-screen overflow-hidden bg-white">
    <!-- Barra superior fixa -->
    <header
      class="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200 bg-white"
    >
      <UDashboardNavbar>

        <template #trailing>
          <div class="font-sans font-bold text-2xl -tracking-[.05em]">Ecobe</div>
          <!-- <UBadge label="4" variant="subtle" /> -->
        </template>

        <template #right>
          <UNavigationMenu content-orientation="vertical" color="neutral" variant="link" :items="items" class="w-full" />
        </template>


      </UDashboardNavbar>
    </header>

    <!-- Área abaixo da barra -->
    <div class="flex h-full pt-16">
      <!-- Coluna esquerda fixa -->
      <aside
        class="fixed top-16 left-0 bottom-0 w-80 border-r border-gray-200 bg-gray-50"
      >
        <div class="p-4">
          mmmmmm
        </div>
      </aside>

      <!-- Conteúdo -->
      <main class="ml-80 flex-1 overflow-y-auto">
        <div class="min-h-full p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      to: '/'
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
      to: '/'
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      to: '/',
      active: true
    },
    {
      label: 'Usuario',
      icon: 'i-lucide-box',
      active: true,
      children: [
        {
          label: 'Link',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          to: '/'
        },
        {
          label: 'Modal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/'
        },
        {
          label: 'NavigationMenu',
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/'
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          to: '/'
        },
        {
          label: 'Popover',
          icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          to: '/'
        },
        {
          label: 'Progress',
          icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          to: '/'
        }
      ]
    },
  ]
])

</script>

<style scoped>

</style>