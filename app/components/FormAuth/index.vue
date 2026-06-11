<template>
  <div class="tracking-tight select-none">
    <div class="flex flex-col w-87.5 max-w-112.5">
      <Transition :name="transitionName" mode="out-in">
        <FormAuthLogin                 v-if="screen === 'login'"            key="login"            :go-to="goTo" />
        <FormAuthForgot                v-else-if="screen === 'forgot'"      key="forgot"           :go-to="goTo" />
        <FormAuthForgotVerificarCodigo v-else-if="screen === 'forgot-verificar'" key="forgot-verificar" :go-to="goTo" :email="screenData.email" />
        <FormAuthForgotCriarSenha      v-else-if="screen === 'forgot-senha'" key="forgot-senha"   :go-to="goTo" :setup-token="screenData.setup_token" />
        <FormAuthRegister              v-else-if="screen === 'register'"    key="register"         :go-to="goTo" />
        <FormAuthPrimeiroAcesso        v-else-if="screen === 'primeiro-acesso'" key="primeiro-acesso" :go-to="goTo" />
        <FormAuthVerificarCodigo       v-else-if="screen === 'verificar-codigo'" key="verificar-codigo" :go-to="goTo" :email="screenData.email" />
        <FormAuthCriarSenha            v-else-if="screen === 'criar-senha'" key="criar-senha"      :go-to="goTo" :setup-token="screenData.setup_token" />
      </Transition>
    </div>
  </div>
</template>

<script setup>
const screen = ref('login')
const transitionName = ref('slide-left')
const screenData = ref({})

function goTo(target, data = {}) {
  const order = { login: 0, forgot: 1, 'forgot-verificar': 2, 'forgot-senha': 3, register: 4, 'primeiro-acesso': 5, 'verificar-codigo': 6, 'criar-senha': 7 }
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
