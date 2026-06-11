<template>
  <div
    class="h-screen overflow-hidden grid"
    style="grid-template-columns: 220px 1fr; grid-template-rows: 52px 1fr;"
  >
    <!-- SIDEBAR: col 1, todas as rows -->
    <aside
      class="flex flex-col bg-sidebar border-r border-sidebar-border"
      style="grid-column: 1; grid-row: 1 / -1;"
    >
      <!-- Logo -->
      <div class="h-13 flex items-center justify-center px-5 border-b border-sidebar-border shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="font-bold text-3xl text-white tracking-tighter select-none text-shadow-lg/15 text-shadow-white">Ecobé</div>
        </div>
      </div>

      <!-- Navegação -->
      <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 scrollbar-sidebar">
        <NavMenuAdmin class="mb-8" />
      </nav>

      <!-- Rodapé do usuário -->
      <div class="shrink-0 border-t border-sidebar-border px-4 py-3">
        <!--
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-full bg-sidebar-accent-muted flex items-center justify-center text-xs font-semibold text-ecobe-400 shrink-0">
            JM
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-white truncate">Jorge M.</p>
            <p class="text-[11px] text-gray-500 truncate">Admin</p>
          </div>
          <button class="text-gray-500 hover:text-gray-300 transition-colors">
            <Icon name="i-lucide-log-out" class="w-4 h-4" />
          </button>
        </div>
        -->
      </div>
    </aside>

    <!-- TOPBAR: col 2, row 1 -->
    <header
      class="flex items-center justify-between px-6 bg-clean border-b border-gray-200"
      style="grid-column: 2; grid-row: 1;"
    >
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm">
        <span class="text-gray-800 font-semibold text-[1.6rem] tracking-tighter select-none">{{ currentPageName }}</span>
      </div>

      <!-- Ações -->
      <div class="flex items-center gap-3">

        <!-- <NotificationBell :alert="false" /> -->

        <div class="flex items-center gap-3 select-none">
          <UAvatar :alt="usuario" size="md" :ui="{ root: 'bg-ecobe-400', fallback: 'text-white' }" />
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium truncate line-clamp-1">
              {{usuario}}
            </p>
            <p class="text-[11px] text-gray-500 truncate">
              {{role}}
            </p>
          </div>
          <button class="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer" @click="handleSair">
            <Icon name="i-lucide-log-out" class="w-4 h-4" />
          </button>
        </div>


      </div>
    </header>

    <!-- CONTEÚDO PRINCIPAL: col 2, row 2 -->
    <main
      class="overflow-y-auto bg-clean"
      style="grid-column: 2; grid-row: 2;"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { useMenu } from '../composables/useMenu'
import { useSession } from '../composables/useSession'
import menuAdmin from '../data/menu_admin.json'

const route = useRoute()
const { allItems } = useMenu(menuAdmin as NavigationMenuItem[][])

const { clearSession, getSession } = useSession()
const user = getSession().user
const usuario = computed(() => `${user.first_name} ${user.last_name}`)
const role = computed(() => user.roles?.length ? user.roles[0].name : 'Super Administrador')

function handleSair() {
  clearSession()
  navigateTo('/auth')
}

const currentPageName = computed(() => {
  if (route.path === '/') return ''
  const item = allItems.find(n => n.to === route.path)
  return item?.label ?? 'Página'
})


</script>
