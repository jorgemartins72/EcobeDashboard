<template>
  <div>
    <p class="text-2xl font-semibold mb-8">Nova senha</p>
    <p class="text-base">Defina uma nova senha para acessar o sistema.</p>
    <div class="mt-2">
      <FormKit type="group">
        <FormKit
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Nova senha"
          v-model="form.password"
          validation="required"
          validation-visibility="dirty"
          autocomplete="new-password"
          minlength="6"
          :suffix-icon="showPassword ? 'eye' : 'eyeClosed'"
          suffix-icon-class="cursor-pointer"
          @suffix-icon-click="showPassword = !showPassword"
          :validation-messages="{
            required: 'Informe a nova senha',
            minlength: 'A senha deve conter no mínimo 6 caracteres'
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <FormKit
          :type="showPasswordConfirm ? 'text' : 'password'"
          name="password_confirm"
          label="Confirmar senha"
          v-model="form.passwordConfirm"
          validation="required|confirm"
          validation-visibility="dirty"
          autocomplete="new-password"
          minlength="6"
          :suffix-icon="showPasswordConfirm ? 'eye' : 'eyeClosed'"
          suffix-icon-class="cursor-pointer"
          @suffix-icon-click="showPasswordConfirm = !showPasswordConfirm"
          :validation-messages="{
            required: 'Confirme a nova senha',
            confirm: 'As senhas não conferem'
          }"
          :classes="{ message: 'text-red-700 text-sm' }"
        />

        <div :class="{ 'pointer-events-none': loading }" @click="handleCriar">
          <FormKit type="button" label="Salvar senha" :outer-class="loading ? 'is-loading' : ''" />
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

const { goTo, setupToken } = defineProps({ goTo: { type: Function, required: true }, setupToken: { type: String, default: '' } })

const toast = useAppToast()
const { api } = useApi()
const { isLoading: loading, withLoading } = useLoadingButton()

const form = reactive({ password: '', passwordConfirm: '' })
const showPassword = ref(false)
const showPasswordConfirm = ref(false)

function handleCriar() {
  if (!form.password.trim()) { toast.error('Informe a nova senha'); return }
  if (form.password !== form.passwordConfirm) { toast.error('As senhas não conferem'); return }

  withLoading(async () => {
    try {
      const res = await api('/auth/forgot/senha', { method: 'POST', body: { setup_token: setupToken, password: form.password } })
      toast.success(res.message || 'Senha redefinida com sucesso!')
      goTo('login')
    } catch (err) {
      toast.error(err?.data?.detail || 'Erro ao redefinir senha')
    }
  })
}
</script>
