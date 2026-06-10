<template>
  <div>

    <div class="flex flex-col w-87.5 max-w-112.5 text-black mx-auto">
      <div class="flex flex-col w-full gap-2 py-24">
        <h1 class="text-3xl font-bold text-center">AAA</h1>

        <div :class="{ 'pointer-events-none': isLoading }" @click="handleClick">
          <FormKit
            type="button"
            label="Botão"
            :outer-class="isLoading ? 'is-loading' : ''"
          />
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
const toast = useToast()
const { isLoading, withLoading } = useLoadingButton()

function handleClick() {
  withLoading(async () => {
    toast.add({ title: 'Carregando...', color: 'info' })
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.add({ title: 'Concluído!', color: 'success' })
  })
}
</script>
