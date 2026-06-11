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
import menuProfessor from '../../data/menu_professor.json'
import { useMenu } from '../../composables/useMenu'

const { items } = useMenu(menuProfessor as NavigationMenuItem[][])
</script>
