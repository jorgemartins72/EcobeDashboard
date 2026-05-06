<template>
  <div class="tracking-tight select-none">

    <div class="flex flex-col w-[350px] max-w-[450px]">

      <Transition :name="transitionName" mode="out-in">
        <div :key="screen">

          <!-- LOGIN -->
          <template v-if="screen === 'login'">
            <p class="text-2xl font-semibold">Login</p>
            <div>
              <div class="mt-8">
                <ButtonGoogle />
              </div>
            </div>
            <Divider label="Ou" />
            <div>

              <Formkit type="group">
                <FormKit
                  type="email"
                  label="E-mail"
                  v-model="formlogin.email"
                  validation="required|email"
                  validation-visibility="dirty"

                  :validation-messages="{
                    required: 'Informe o e-mail cadastrado',
                    email: 'Informe um e-mail válido'
                  }"

                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"
                />

                <FormKit
                  :type="showPasswordLogin ? 'text' : 'password'"
                  label="Senha"
                  v-model="formlogin.password"
                  autocomplete="current-password"
                  validation="required"
                  minlength="6"
                  validation-visibility="dirty"

                  :validation-messages="{
                    required: 'Informe sua senha'
                  }"

                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"

                  :suffix-icon="showPasswordLogin ? 'eye' : 'eyeClosed'"
                  suffix-icon-class="cursor-pointer"
                  @suffix-icon-click="showPasswordLogin = !showPasswordLogin"

                />

                <FormKit type="button" label="Entrar" @click="handleLogin" :loading="loading"/>
              </Formkit>
              <div class="text-sm text-slate-500">
                <p><a class="hover:underline" @click="goTo('forgot')">Esqueceu a senha?</a></p>
                <p>Não tem uma conta? <a class="hover:underline" @click="goTo('register')">Cadastre-se</a></p>
              </div>
            </div>

          </template>

          <!-- ESQUECEU SENHA -->
          <template v-if="screen === 'forgot'">
            <p class="text-2xl font-semibold">Esqueceu a senha?</p>
            <p class="text-base">Informe o e-mail cadastrado abaixo</p>
            <div class="mt-2">
              <FormKit type="group">
                <FormKit
                  type="email"
                  label="E-mail"
                  v-model="formforgot.email"
                  validation="required|email"
                  validation-visibility="dirty"

                  :validation-messages="{
                    required: 'Informe o e-mail cadastrado',
                    email: 'Informe um e-mail válido'
                  }"

                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"
                />
                <FormKit type="button" label="Enviar" @click="handleForgot" :loading="loading" />
              </FormKit>
              <div class="text-sm text-slate-500">
                <p>Não tem uma conta? <a class="hover:underline" @click="goTo('register')">Cadastre-se</a></p>
                <p> Voltar para o <a class="hover:underline" @click="goTo('login')">Login</a></p>
              </div>
            </div>

          </template>

          <!-- CADASTRO -->
          <template v-if="screen === 'register'">
            <p class="text-2xl font-semibold">Crie sua conta</p>
            <div>
              <div class="mt-8">
                <ButtonGoogle />
              </div>
            </div>
            <Divider label="Ou" />
            <div>

              <FormKit type="group">
                <FormKit
                  type="text"
                  label="Nome"
                  v-model="formregister.nome"
                  validation="required|length:3"
                  validation-visibility="dirty"

                  :validation-messages="{
                    required: 'Informe seu nome',
                    length: 'O nome deve conter no mínimo 3 caracteres',
                  }"
                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"
                />

                <FormKit
                  type="email"
                  label="E-mail"
                  v-model="formregister.email"
                  validation="required|email"
                  validation-visibility="dirty"
                  :validation-messages="{
                    required: 'Informe seu e-mail',
                    email: 'Informe um e-mail válido'
                  }"
                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"
                />
                <FormKit
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  label="Senha"
                  v-model="formregister.password"
                  validation="required"
                  validation-visibility="dirty"
                  autocomplete="new-password"
                  minlength="6"

                  :suffix-icon="showPassword ? 'eye' : 'eyeClosed'"
                  suffix-icon-class="cursor-pointer"
                  @suffix-icon-click="showPassword = !showPassword"

                  :validation-messages="{
                    required: 'Informe sua senha',
                    minlength: 'A senha deve conter no mínimo 6 caracteres'
                  }"

                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"

                />

                <FormKit
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  name="password_confirm"
                  label="Confirmar Senha"
                  validation="required|confirm"
                  validation-visibility="dirty"
                  autocomplete="new-password"
                  minlength="6"

                  :suffix-icon="showPasswordConfirm ? 'eye' : 'eyeClosed'"
                  suffix-icon-class="cursor-pointer"
                  @suffix-icon-click="showPasswordConfirm = !showPasswordConfirm"

                  :validation-messages="{
                    confirm: 'As senhas não conferem',
                    minlength: 'A senha deve conter no mínimo 6 caracteres'
                  }"

                  :classes="{
                    message: 'text-red-700 text-sm'
                  }"

                />
                <FormKit type="button" label="Enviar" @click="handleRegister" :loading="loading" />
              </FormKit>



              <div class="text-sm text-slate-500">
                <p> Voltar para o <a class="hover:underline" @click="goTo('login')">Login</a></p>
              </div>
            </div>


          </template>

        </div>
      </Transition>



    </div>

  </div>
</template>

<script setup>

const toast = useAppToast()

const formlogin = reactive({
  email: '',
  password: ''
})

const formforgot = reactive({
  email: ''
})

const formregister = reactive({
  nome: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const showPasswordLogin = ref(false)

const screen = ref('login')
const transitionName = ref('slide-left')

function goTo(target) {
  resetLogin()
  resetForgot()
  resetRegister()

  const order = {
    login: 0,
    forgot: 1,
    register: 2
  }

  transitionName.value = order[target] > order[screen.value]
    ? 'slide-left'
    : 'slide-right'

  screen.value = target
}

const loading = ref(false)
const error = ref(null)

async function handleLogin() {
  if (loading.value) return

  if (!formlogin.email.trim()) {
    toast.error('Informe seu e-mail')
    return
  }

  if (!formlogin.password.trim()) {
    toast.error('Informe sua senha')
    return
  }

  loading.value = true
  error.value = null

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: formlogin
    })

    console.log(res)
    toast.success('Logado com sucesso')
    // await navigateTo('/restrita')

  } catch (err) {
    toast.error(err?.data?.message || 'Ocorreu um erro ao tentar logar')
  } finally {
    loading.value = false
  }
}

async function handleForgot() {
  if (loading.value) return

  if (!formforgot.email.trim()) {
    toast.error('Informe seu e-mail')
    return
  }

  loading.value = true
  error.value = null

  try {
    const res = await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: formforgot
    })

    console.log(res)
    toast.info(res.message || 'Instruções enviadas para seu e-mail')

    goTo('login')
  } catch (err) {
    toast.error(err?.data?.message || 'Erro ao solicitar recuperação de senha')
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  if (loading.value) return

  if (!formregister.nome.trim()) {
    toast.error('Informe seu nome')
    return
  }

  if (!hasNomeSobrenome(formregister.nome)) {
    toast.error('Informe nome e sobrenome')
    return
  }

  if (!formregister.email.trim()) {
    toast.error('Informe seu e-mail')
    return
  }

  if (!formregister.password.trim()) {
    toast.error('Informe sua senha')
    return
  }

  loading.value = true
  error.value = null

  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: formregister
    })

    console.log(res)
    toast.success(res.message || 'Cadastro realizado com sucesso')

    goTo('login')
  } catch (err) {
    toast.error(err?.data?.message || 'Erro ao tentar cadastrar')
  } finally {
    loading.value = false
  }
}

function hasNomeSobrenome(nome) {
  return nome.trim().split(/\s+/).length >= 2
}

function resetLogin() {
  formlogin.email = ''
  formlogin.password = ''

  showPasswordLogin.value = false
}

function resetForgot() {
  formforgot.email = ''
}

function resetRegister() {
  formregister.nome = ''
  formregister.email = ''
  formregister.password = ''

  showPassword.value = false
  showPasswordConfirm.value = false
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