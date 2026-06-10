<template>
  <div class="tracking-tight select-none">
    <div class="flex flex-col w-87.5 max-w-112.5">
      <Transition :name="transitionName" mode="out-in">
        <div :key="screen">
          <FormAuthLogin          v-if="screen === 'login'"           :go-to="goTo" />
          <FormAuthForgot         v-if="screen === 'forgot'"          :go-to="goTo" />
          <FormAuthRegister       v-if="screen === 'register'"        :go-to="goTo" />
          <FormAuthPrimeiroAcesso v-if="screen === 'primeiro-acesso'" :go-to="goTo" />
          <FormAuthVerificarCodigo v-if="screen === 'verificar-codigo'" :go-to="goTo" :email="screenData.email" />
          <FormAuthCriarSenha      v-if="screen === 'criar-senha'"      :go-to="goTo" :setup-token="screenData.setup_token" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const screen = ref('login')
const transitionName = ref('slide-left')
const screenData = ref({})

function goTo(target, data = {}) {
  const order = { login: 0, forgot: 1, register: 2, 'primeiro-acesso': 3, 'verificar-codigo': 4, 'criar-senha': 5 }
  transitionName.value = order[target] > order[screen.value] ? 'slide-left' : 'slide-right'
  screenData.value = data
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
