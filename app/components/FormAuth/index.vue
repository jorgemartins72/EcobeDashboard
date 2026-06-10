<template>
  <div class="tracking-tight select-none">
    <div class="flex flex-col w-87.5 max-w-112.5">
      <Transition :name="transitionName" mode="out-in">
        <div :key="screen">
          <FormAuthLogin    v-if="screen === 'login'"    :go-to="goTo" />
          <FormAuthForgot   v-if="screen === 'forgot'"   :go-to="goTo" />
          <FormAuthRegister v-if="screen === 'register'" :go-to="goTo" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const screen = ref('login')
const transitionName = ref('slide-left')

function goTo(target) {
  const order = { login: 0, forgot: 1, register: 2 }
  transitionName.value = order[target] > order[screen.value] ? 'slide-left' : 'slide-right'
  screen.value = target
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
