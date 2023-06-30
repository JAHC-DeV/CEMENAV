<script setup>
import UserList from '@/views/apps/roles/UserList.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h4 class="text-h4 mb-6">
        Roles
      </h4>
    </VCol>
    <VCol cols="12">
      <!-- 👉 User List  -->
      <UserList />
    </VCol>
  </VRow>
</template>
