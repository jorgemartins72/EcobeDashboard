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
        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-600 px-3 mb-2">
          Principal
        </p>

        <NuxtLink
          v-for="item in navPrincipal"
          :key="item.to"
          :to="item.to"
          class="nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400"
          :class="{ active: route.path === item.to }"
        >
          <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
          {{ item.label }}
        </NuxtLink>

        <p class="text-[10px] font-semibold uppercase tracking-widest text-gray-600 px-3 mb-2 mt-5">
          Sistema
        </p>

        <NuxtLink
          v-for="item in navSistema"
          :key="item.to"
          :to="item.to"
          class="nav-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400"
          :class="{ active: route.path === item.to }"
        >
          <Icon :name="item.icon" class="w-4 h-4 shrink-0" />
          {{ item.label }}
        </NuxtLink>






        <UNavigationMenu
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

      </nav>








      <!-- Rodapé do usuário -->
      <div class="shrink-0 border-t border-sidebar-border px-4 py-3">
        <div class="flex items-center gap-3">
<!--
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
 -->
        </div>
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

        <NotificationBell :alert="false" />

        <div class="w-7 h-7 rounded-full bg-ecobe-100 flex items-center justify-center text-xs font-semibold text-ecobe-700 cursor-pointer">
          AA
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
const route = useRoute()

const navPrincipal = [
  { to: '/', label: 'Início', icon: 'i-lucide-house' },
  // { to: '/clientes', label: 'Clientes', icon: 'i-lucide-users' },
  { to: '/a/materiais', label: 'Materiais', icon: 'i-lucide-box' },
  { to: '/materiais', label: 'Materiais Exemplo', icon: 'i-lucide-package-x' },
  // { to: '/analytics', label: 'Analytics', icon: 'i-lucide-bar-chart-2' },
  // { to: '/pagamentos', label: 'Pagamentos', icon: 'i-lucide-credit-card' },
]

const navSistema = [
  { to: '/configuracoes', label: 'Configurações', icon: 'i-lucide-settings' },
  { to: '/suporte', label: 'Suporte', icon: 'i-lucide-help-circle' },
]

const allNavItems = [...navPrincipal, ...navSistema]

const currentPageName = computed(() => {
  if (route.path === '/') return ''
  const item = allNavItems.find((n) => n.to === route.path)
  return item?.label ?? 'Página'
})

// ////////////////////////////////////////////////

import type { NavigationMenuItem } from '@nuxt/ui'

const toast = useToast()

const open = ref(false)

const links = [[{
    label: 'Principal',
    type: 'label'
  }, {
  label: 'Início',
  icon: 'i-lucide-house',
  to: '/'
}, {
  label: 'Materiais',
  icon: 'i-lucide-inbox',
  to: '/a/materiais',
  badge: '4'
}, {
  label: 'Materiais Exemplo',
  icon: 'i-lucide-users',
  to: '/materiais'
}, {
  label: 'Settings',
  to: '/settings',
  icon: 'i-lucide-settings',
  defaultOpen: false,
  type: 'trigger',
  children: [{
    label: 'General',
    to: '/settings',
    exact: true
  }, {
    label: 'Members',
    to: '/settings/members'
  }, {
    label: 'Notifications',
    to: '/settings/notifications'
  }, {
    label: 'Security',
    to: '/settings/security'
  }]
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank'
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat()
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank'
  }]
}])


</script>
