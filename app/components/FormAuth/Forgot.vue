<template>
  <div>
    <p class="text-2xl font-semibold mb-8">Esqueceu a senha?</p>
    <p class="text-base">Informe o e-mail cadastrado abaixo</p>
    <div class="mt-2">
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

        <div :class="{ 'pointer-events-none': loading }" @click="handleForgot">
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
import { useAppToast } from '~/composables/useToast'

const { goTo } = defineProps({ goTo: { type: Function, required: true } })

const toast = useAppToast()
const { api } = useApi()
const { isLoading: loading, withLoading } = useLoadingButton()

const form = reactive({ email: '' })

function handleForgot() {
  if (!form.email.trim()) { toast.error('Informe seu e-mail'); return }

  withLoading(async () => {
    try {
      await api('/auth/forgot/solicitar', { method: 'POST', body: form })
      toast.success('Código enviado para o e-mail informado.')
      goTo('forgot-verificar', { email: form.email })
    } catch (err) {
      const code = err?.data?.detail?.code
      if (code === 'EMAIL_NOT_FOUND') {
        toast.warning(err?.data?.detail?.message || 'E-mail não encontrado.')
      } else {
        toast.big_warning(err?.data?.detail?.message || err?.data?.message || 'Erro ao solicitar recuperação de senha')
      }
    }
  })
}
</script>
