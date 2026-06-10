<template>
  <div>
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
          v-model="form.nome"
          validation="required|length:3"
          validation-visibility="dirty"
          :validation-messages="{
            required: 'Informe seu nome',
            length: 'O nome deve conter no mínimo 3 caracteres',
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <FormKit
          type="email"
          label="E-mail"
          v-model="form.email"
          validation="required|email"
          validation-visibility="dirty"
          :validation-messages="{
            required: 'Informe seu e-mail',
            email: 'Informe um e-mail válido'
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <FormKit
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Senha"
          v-model="form.password"
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
          :classes="{ message: 'text-red-700 text-sm' }"
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
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <div :class="{ 'pointer-events-none': loading }" @click="handleRegister">
          <FormKit type="button" label="Enviar" :outer-class="loading ? 'is-loading' : ''" />
        </div>
      </FormKit>

      <div class="text-sm text-slate-500">
        <p>Voltar para o <a class="hover:underline cursor-pointer" @click="goTo('login')">Login</a></p>
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

const form = reactive({ nome: '', email: '', password: '' })
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

function handleRegister() {
  if (!form.nome.trim()) { toast.error('Informe seu nome'); return }
  if (!hasNomeSobrenome(form.nome)) { toast.error('Informe nome e sobrenome'); return }
  if (!form.email.trim()) { toast.error('Informe seu e-mail'); return }
  if (!form.password.trim()) { toast.error('Informe sua senha'); return }

  withLoading(async () => {
    try {
      const res = await api('/auth/register', { method: 'POST', body: form })
      setSession({ access_token: res.access_token, refresh_token: res.refresh_token })
      toast.success(res.message || 'Cadastro realizado com sucesso')
      goTo('login')
    } catch (err) {
      toast.error(err?.data?.message || 'Erro ao tentar cadastrar')
    }
  })
}

function hasNomeSobrenome(nome) {
  return nome.trim().split(/\s+/).length >= 2
}
</script>
