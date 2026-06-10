<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  alert: {
    type: Boolean,
    default: false
  }
})

const animate = ref(false)
let intervalId = null

function playBell() {
  const playOnce = (delay = 0) => {
    setTimeout(() => {
      animate.value = true
      setTimeout(() => {
        animate.value = false
      }, 600)
    }, delay)
  }

  playOnce(0)
  playOnce(800)
  playOnce(1600)
}

onMounted(() => {
  if (props.alert) {
    playBell()
    intervalId = setInterval(playBell, 10000)
  }
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="relative inline-flex overflow-visible">
    <UButton
      size="md"
      color="neutral"
      variant="link"
      class="overflow-visible"
    >
      <template #leading>
        <UIcon
          name="i-lucide-bell"
          class="origin-top text-2xl"
          :class="{ 'animate-bell': animate }"
        />
      </template>
    </UButton>

    <UBadge
      v-if="alert"
      label=" "
      color="error"
      variant="solid"
      class="absolute top-0.5 -right-0.5 z-10 min-w-2.5! w-2.5! h-2.5! rounded-full! p-0!"
    />
  </div>
</template>

<style>
@keyframes bell-ring {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(15deg); }
  30% { transform: rotate(-10deg); }
  45% { transform: rotate(10deg); }
  60% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
}

.animate-bell {
  animation: bell-ring 0.6s ease-in-out;
}
</style>