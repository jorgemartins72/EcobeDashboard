<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Materiais" :ui="{root: 'h-12 sm:px-3', title: 'text-3xl font-sans -tracking-[.05em]'}">

        <template #right>
          <NotificationBell :alert="!false" />
        </template>

      </UDashboardNavbar>
    </template>
  </UDashboardPanel>
</template>

<script setup>

</script>

<style scoped>

</style>