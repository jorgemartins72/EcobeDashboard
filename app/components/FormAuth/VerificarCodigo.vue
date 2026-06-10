<template>
  <div>
    <p class="text-2xl font-semibold">Verificar código</p>
    <p class="text-base">Digite o código enviado para o seu e-mail para continuar.</p>
    <div class="mt-2">
      <FormKit type="group">
        <FormKit
          type="text"
          label="Código de acesso"
          v-model="form.code"
          validation="required"
          validation-visibility="dirty"
          :validation-messages="{
            required: 'Informe o código recebido por e-mail'
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <div :class="{ 'pointer-events-none': loading }" @click="handleVerificar">
          <FormKit type="button" label="Verificar" :outer-class="loading ? 'is-loading' : ''" />
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

const { goTo, email } = defineProps({ goTo: { type: Function, required: true }, email: { type: String, default: '' } })

const toast = useAppToast()
const { api } = useApi()
const { isLoading: loading, withLoading } = useLoadingButton()

const form = reactive({ email, code: '' })

function handleVerificar() {
  if (!form.code.trim()) { toast.error('Informe o código recebido por e-mail'); return }

  withLoading(async () => {
    try {
      const res = await api('/auth/primeiro-acesso/verificar', { method: 'POST', body: { email: form.email, code: form.code } })
      toast.success(res.message || 'Código verificado com sucesso.')
      goTo('criar-senha', { setup_token: res.setup_token })
    } catch (err) {
      toast.error(err?.data?.message || 'Código inválido ou expirado')
    }
  })
}
</script>
