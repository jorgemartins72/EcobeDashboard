<template>
  <div>
    <p class="text-2xl font-semibold">Primeiro acesso</p>
    <p class="text-base">Esse é o seu primeiro acesso ao sistema. Confirme o e-mail cadastrado para receber o código de acesso e criar sua senha.</p>
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

        <div :class="{ 'pointer-events-none': loading }" @click="handleSolicitar">
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

const form = reactive({ email: 'jorgemartins72@gmail.com' })

function handleSolicitar() {
  if (!form.email.trim()) { toast.error('Informe seu e-mail'); return }

  withLoading(async () => {
    try {
      const res = await api('/auth/primeiro-acesso/solicitar', { method: 'POST', body: form })
      toast.success(res.message || 'Código enviado para o e-mail informado.')
      goTo('verificar-codigo', { email: form.email })
    } catch (err) {
      toast.error(err?.data?.message || 'Erro ao solicitar primeiro acesso')
    }
  })
}
</script>
