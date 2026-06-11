<template>
  <div class="tracking-tight select-none">
    <div
      class="flex flex-col w-87.5 max-w-112.5"
      :style="wrapperHeight !== null ? { height: wrapperHeight + 'px' } : {}"
    >
      <div
        ref="titleRef"
        class="text-[3rem] font-bold text-center mb-12 tracking-tighter text-shadow-lg/20"
        :style="{ transform: `translateY(${titleOffset}px)`, transition: titleTransition }"
      >Ecobé</div>
      <div ref="contentRef">
        <Transition
          :name="transitionName"
          mode="out-in"
          @before-leave="onBeforeLeave"
          @after-enter="onAfterEnter"
        >
          <FormAuthLogin                 v-if="screen === 'login'"                 key="login"             :go-to="goTo" />
          <FormAuthForgot                v-else-if="screen === 'forgot'"           key="forgot"            :go-to="goTo" />
          <FormAuthForgotVerificarCodigo v-else-if="screen === 'forgot-verificar'" key="forgot-verificar"  :go-to="goTo" :email="screenData.email" />
          <FormAuthForgotCriarSenha      v-else-if="screen === 'forgot-senha'"     key="forgot-senha"      :go-to="goTo" :setup-token="screenData.setup_token" />
          <FormAuthRegister              v-else-if="screen === 'register'"         key="register"          :go-to="goTo" />
          <FormAuthPrimeiroAcesso        v-else-if="screen === 'primeiro-acesso'"  key="primeiro-acesso"   :go-to="goTo" />
          <FormAuthVerificarCodigo       v-else-if="screen === 'verificar-codigo'" key="verificar-codigo"  :go-to="goTo" :email="screenData.email" />
          <FormAuthCriarSenha            v-else-if="screen === 'criar-senha'"      key="criar-senha"       :go-to="goTo" :setup-token="screenData.setup_token" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const screen          = ref('login')
const transitionName  = ref('slide-left')
const screenData      = ref({})
const titleRef        = ref(null)
const contentRef      = ref(null)
const wrapperHeight   = ref(null)
const titleOffset     = ref(0)
const titleTransition = ref('none')

let prevTitleY      = 0
let isTransitioning = false

function measureHeight() {
  if (!titleRef.value || !contentRef.value) return null
  const titleH  = titleRef.value.getBoundingClientRect().height
  const marginB = parseFloat(getComputedStyle(titleRef.value).marginBottom)
  const contentH = contentRef.value.getBoundingClientRect().height
  return Math.round(titleH + marginB + contentH)
}

function updateHeight() {
  if (isTransitioning) return
  const h = measureHeight()
  if (h !== null) wrapperHeight.value = h
}

function onBeforeLeave() {
  isTransitioning = true
  prevTitleY = titleRef.value?.getBoundingClientRect().top ?? 0
  const h = measureHeight()
  if (h !== null) wrapperHeight.value = h
}

function onAfterEnter() {
  isTransitioning = false
  const h = measureHeight()
  if (h !== null) wrapperHeight.value = h

  nextTick(() => {
    const newTitleY = titleRef.value?.getBoundingClientRect().top ?? 0
    const delta = newTitleY - prevTitleY
    if (Math.abs(delta) < 1) return

    titleTransition.value = 'none'
    titleOffset.value = -delta

    requestAnimationFrame(() => requestAnimationFrame(() => {
      titleTransition.value = 'transform 0.9s ease'
      titleOffset.value = 0
    }))
  })
}

let ro = null
onMounted(() => nextTick(() => {
  updateHeight()
  ro = new ResizeObserver(updateHeight)
  ro.observe(contentRef.value)
}))
onUnmounted(() => ro?.disconnect())

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
