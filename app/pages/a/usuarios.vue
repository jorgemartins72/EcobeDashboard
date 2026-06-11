<template>
  <div>
    <pre class="text-xs text-wrap">
      {{ dados }}
    </pre>
  </div>
</template>

<script setup>
import { useSession } from '../../composables/useSession'
const { getSession } = useSession()
const dados = getSession().user
</script>
