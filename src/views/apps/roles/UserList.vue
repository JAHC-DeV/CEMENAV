<script setup>
import { paginationMeta } from '@/@fake-db/utils'
import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalUsers = ref(0)
const users = ref([])

const isRoleDialogVisible = ref(false)
const roleDetail = ref()
const isAddRoleDialogVisible = ref(false)

const editPermission = value => {
  isRoleDialogVisible.value = true
  roleDetail.value = value
}


const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const headers = [
  {
    title: 'Nombre',
    key: 'user',
  },
  {
    title: 'Rol',
    key: 'company',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

// 👉 Fetching users
const fetchUsers = () => {
  userListStore.fetchUsers({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    role: selectedRole.value,
    options: options.value,
  }).then(response => {
    users.value = response.data.users
    totalUsers.value = response.data.totalUsers
    options.value.page = response.data.page
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

// 👉 search filters
const roles = [
  {
    title: 'Super Administrador',
    value: 'super administrador',
  },
  {
    title: 'Administrador',
    value: 'administrador',
  },
  {
    title: 'Doctor@s',
    value: 'editor',
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'primary',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'warning',
      icon: 'tabler-settings',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'success',
      icon: 'tabler-chart-donut',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'info',
      icon: 'tabler-pencil',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'error',
      icon: 'tabler-device-laptop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = userData => {
  userListStore.addUser(userData)

  // refetch User
  fetchUsers()
}

const deleteUser = id => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <VBtn @click="isAddRoleDialogVisible = true">
          Add New Role
        </VBtn>
        <AddEditRoleDialog v-model:is-dialog-visible="isAddRoleDialogVisible" />
        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Search User"
            density="compact"
            style="width: 12.5rem;"
          />

          <!-- 👉 Add user button -->
          <VSelect
            v-model="selectedRole"
            label="Select Role"
            :items="roles"
            density="compact"
            clearable
            clear-icon="tabler-x"
            style="width: 10rem;"
          />
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable USERS -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="users"
        :items-length="totalUsers"
        :headers="headers"
        class="text-no-wrap"
        @update:options="options = $event"
      >
        <!-- User -->
        <template #item.user="{ item }">
          <div class="d-flex align-center">
            <div class="d-flex flex-column">
              <h6 class="text-body-1 font-weight-medium">
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                  class="user-list-name"
                >
                  {{ item.raw.fullName }}
                </RouterLink>
              </h6>             
            </div>
          </div>
        </template>

        <!-- Role -->
        <template #item.company="{ item }">
          <div class="d-flex align-center gap-4">
            <span class="text-capitalize">{{ item.raw.company }}</span>
          </div>
        </template>

        <!-- Plan -->
        <template #item.email="{ item }">
          <span class="text-capitalize font-weight-medium">{{ item.raw.email }}</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            label
            size="small"
            class="text-capitalize"
            :color="resolveUserStatusVariant(item.raw.status)"
          >
            {{ item.raw.status }}
          </VChip>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta(options, totalUsers) }}
            </p>

            <VPagination
              v-model="options.page"
              :length="Math.ceil(totalUsers / options.itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Previous
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Next
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <VIcon icon="tabler-edit" />
          </IconBtn>
          <IconBtn @click="deleteUser(item.raw.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
  <AddEditRoleDialog
    v-model:is-dialog-visible="isRoleDialogVisible"
    v-model:role-permissions="roleDetail"
  />
</template>

<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
