<template>
  <div class="h-full overflow-hidden grid grid-rows-[auto_1fr]">

    <!-- Toolbar fixa -->
    <div class="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
      <h1 class="text-sm font-semibold text-gray-800">Materiais</h1>
    </div>

    <!-- Conteúdo com scroll -->
    <div class="overflow-hidden p-6">
      <div class="border border-gray-200 rounded-lg h-full bg-white flex flex-col">

        <!-- Cabeçalho da tabela (fixo, não rola) -->
        <div class="shrink-0 flex items-center px-4 py-2 text-xs text-gray-400 tracking-wide bg-gray-50 border-b border-gray-200">
          <div class="colNome">Nome</div>
          <div class="colCategorias">Categorias</div>
          <div class="colLocalizacao">Localização</div>
          <div class="colEstoque">Estoque</div>
          <div class="colStatus">Status</div>
        </div>

        <!-- Lista com scroll -->
        <div class="flex-1 overflow-y-auto">
          <UPageList>
            <div
              v-for="(material, index) in materiais"
              :key="material.id"
              class="flex items-center px-4 py-2 font-normal text-sm select-none"
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'"
            >
              <div class="colNome">{{ material.nome }}</div>
              <div class="colCategorias">
                <UBadge
                  v-for="cat in material.categorias"
                  :key="cat"
                  :label="cat"
                  size="sm"
                />
              </div>
              <div class="colLocalizacao">
                <UBadge
                  v-for="loc in material.localizacao"
                  :key="loc"
                  :label="loc"
                  size="sm"
                  color="info"
                />
              </div>
              <div class="colEstoque text-gray-500 font-bold font-mono">{{ material.estoque }}</div>
              <div class="colStatus font-bold" :class="material.status === 'DISPONÍVEL' ? 'text-green-600' : 'text-gray-400'">
                {{ material.status }}
              </div>
            </div>
          </UPageList>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const { api } = useApi()
const toast = useAppToast()
const { withLoading } = useLoadingButton()
const materiais = ref<any[]>([])

onMounted(() => {
  withLoading(async () => {
    try {
      materiais.value = await api('/materiais')
    } catch {
      toast.error('Erro ao carregar materiais')
    }
  })
})
</script>

<style scoped>
@reference "~/assets/css/tailwind.css";

.colNome {
  @apply w-3/12;
}
.colCategorias {
  @apply w-3/12 flex flex-wrap gap-1 pr-4;
}
.colLocalizacao {
  @apply w-3/12 flex flex-wrap gap-1 pr-4;
}
.colEstoque {
  @apply w-2/12;
}
.colStatus {
  @apply w-1/12;
}
</style>
