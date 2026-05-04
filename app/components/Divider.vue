<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  align: {
    type: String,
    default: 'center' // center | left | right
  }
})
</script>

<template>
  <div class="relative flex items-center py-4">
    <div class="flex-grow border-t border-slate-300"></div>

    <span
      v-if="label"
      :class="[
        'text-sm text-slate-500 bg-white px-3',
        align === 'left' && 'order-first pl-0 pr-3',
        align === 'right' && 'order-last pr-0 pl-3'
      ]"
    >
      {{ label }}
    </span>

    <div v-if="label" class="flex-grow border-t border-slate-300"></div>
  </div>
</template>