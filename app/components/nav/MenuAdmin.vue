<template>
  <UNavigationMenu
    :items="items[0]"
    orientation="vertical"
    color="neutral"
    tooltip
    popover
  />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import menuAdmin from '../../data/menu_admin.json'
import { useMenu } from '../../composables/useMenu'

const { items } = useMenu(menuAdmin as NavigationMenuItem[][])
</script>
