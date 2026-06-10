<template>
  <div>
    <p class="text-2xl font-semibold">Login</p>
    <div>
      <div class="mt-8">
        <ButtonGoogle />
      </div>
    </div>
    <Divider label="Ou" />
    <div>
      <FormKit type="group">
        <FormKit
          type="email"
          label="E-mail"
          v-model="form.email"
          validation="required|email"
          validation-visibility="dirty"
          :validation-messages="{
            required: 'Informe o e-mail cadastrado',
            email: 'Informe um e-mail válido'
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <FormKit
          :type="showPassword ? 'text' : 'password'"
          label="Senha"
          v-model="form.password"
          autocomplete="current-password"
          validation="required"
          minlength="6"
          validation-visibility="dirty"
          :validation-messages="{ required: 'Informe sua senha' }"
          :classes="{ message: 'text-red-700 text-sm' }"
          :suffix-icon="showPassword ? 'eye' : 'eyeClosed'"
          suffix-icon-class="cursor-pointer"
          @suffix-icon-click="showPassword = !showPassword"
        />

        <div :class="{ 'pointer-events-none': loading }" @click="handleLogin">
          <FormKit type="button" label="Entrar" :outer-class="loading ? 'is-loading' : ''" />
        </div>
      </FormKit>

      <div class="text-sm text-slate-500">
        <p><a class="hover:underline cursor-pointer" @click="goTo('forgot')">Esqueceu a senha?</a></p>
        <p>Não tem uma conta? <a class="hover:underline cursor-pointer" @click="goTo('register')">Cadastre-se</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from '~/composables/useApi'
import { useSession } from '~/composables/useSession'
import { useAppToast } from '~/composables/useToast'

const { goTo } = defineProps({ goTo: { type: Function, required: true } })

const toast = useAppToast()
const { api } = useApi()
const { setSession } = useSession()
const { isLoading: loading, withLoading } = useLoadingButton()

const form = reactive({ email: 'jorgemartins72@gmail.com', password: 'xxxxx' })
const showPassword = ref(false)

function handleLogin() {
  if (!form.email.trim()) { toast.error('Informe seu e-mail'); return }
  if (!form.password.trim()) { toast.error('Informe sua senha'); return }

  withLoading(async () => {
    try {
      const res = await api('/auth', {
        method: 'POST',
        body: { email: form.email, password: form.password }
      })
      setSession({ access_token: res.access_token, refresh_token: res.refresh_token })
      toast.success('Logado com sucesso')
      await navigateTo('/')
    } catch (err) {
      if (err?.data?.detail?.code === 'PASSWORD_NOT_SET') {
        goTo('primeiro-acesso')
      } else {
        toast.error(err?.data?.detail?.message || err?.data?.message || 'E-mail ou senha incorretos')
      }
    }
  })
}
</script>
