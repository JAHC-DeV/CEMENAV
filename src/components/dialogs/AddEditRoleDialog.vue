<script setup>
import { VForm } from 'vuetify/components/VForm'

const props = defineProps({
  rolePermissions: {
    type: Object,
    required: false,
    default: () => ({
      name: '',
      permissions: [],
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'update:rolePermissions',
])


// 👉 Permission List
const permissions = ref([
  {
    name: 'Consultas',
    read: false,
    write: false,
    create: false,
  },
  {
    name: 'Pacientes',
    read: false,
    write: false,
    create: false,
  },
  {
    name: 'Doctores',
    read: false,
    write: false,
    create: false,
  },
  {
    name: 'Cátalogos',
    read: false,
    write: false,
    create: false,
  },
  {
    name: 'Roles',
    read: false,
    write: false,
    create: false,
  },
  {
    name: 'Configuración',
    read: false,
    write: false,
    create: false,
  },
])

const isSelectAll = ref(false)
const role = ref('')
const refPermissionForm = ref()

const checkedCount = computed(() => {
  let counter = 0
  permissions.value.forEach(permission => {
    Object.entries(permission).forEach(([key, value]) => {
      if (key !== 'name' && value)
        counter++
    })
  })
  
  return counter
})

const isIndeterminate = computed(() => checkedCount.value > 0 && checkedCount.value < permissions.value.length * 3)

// select all
watch(isSelectAll, val => {
  permissions.value = permissions.value.map(permission => ({
    ...permission,
    read: val,
    write: val,
    create: val,
  }))
})

// if Indeterminate is false, then set isSelectAll to false
watch(isIndeterminate, () => {
  if (!isIndeterminate.value)
    isSelectAll.value = false
})

// if all permissions are checked, then set isSelectAll to true
watch(permissions, () => {
  if (checkedCount.value === permissions.value.length * 3)
    isSelectAll.value = true
}, { deep: true })

// if rolePermissions is not empty, then set permissions
watch(props, () => {
  if (props.rolePermissions && props.rolePermissions.permissions.length) {
    role.value = props.rolePermissions.name
    permissions.value = permissions.value.map(permission => {
      const rolePermission = props.rolePermissions?.permissions.find(item => item.name === permission.name)
      if (rolePermission) {
        return {
          ...permission,
          ...rolePermission,
        }
      }
      
      return permission
    })
  }
})

const onSubmit = () => {
  const rolePermissions = {
    name: role.value,
    permissions: permissions.value,
  }

  emit('update:rolePermissions', rolePermissions)
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}

const onReset = () => {
  emit('update:isDialogVisible', false)
  isSelectAll.value = false
  refPermissionForm.value?.reset()
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="onReset"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="onReset" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 👉 Title -->
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          Nuevo Rol
        </VCardTitle>
      </VCardItem>

      <VCardText class="mt-6">
        <!-- 👉 Form -->
        <VForm ref="refPermissionForm">
          <!-- 👉 Role name -->
          <VRow>
            <VCol sm="6">
              <AppTextField
                v-model="role"
                label="Nombre"
                placeholder=""
              />
            </VCol>
            <VCol sm="6">
              <AppTextField
                v-model="role"
                label="Tipo de Rol"
                placeholder=""
              />
            </VCol>
            <VCol sm="12">
              <AppTextField
                v-model="role"
                label="Email"
                placeholder=""
              />
            </VCol>
          </VRow>
          
          <h6
            class="text-h4 mt-8 mb-3"
            style="color: #3545b3;"
          >
            Permisos
          </h6>

          <!-- 👉 Role Permissions -->

          <VTable
            class="permission-table text-no-wrap"
            fixed-header
          >
            <!-- 👉 Admin  -->
            <tr style=" width: 100%;table-layout: fixed;">
              <td>
                MODULOS
              </td>
              <td>
                LEER
              </td>
              <td>
                CREAR
              </td>
              <td>
                EDITAR
              </td> <td>
                ELIMINAR
              </td>              
            </tr>

            <!-- 👉 Other permission loop -->
            <template
              v-for="permission in permissions"
              :key="permission.name"
            >
              <tr>
                <td>{{ permission.name }}</td>
                <td>
                  <div class="d-flex justify-center">
                    <VCheckbox
                      v-model="permission.read"
                      label=""
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center">
                    <VCheckbox
                      v-model="permission.write"
                      label=""
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center">
                    <VCheckbox
                      v-model="permission.create"
                      label=""
                    />
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center">
                    <VCheckbox
                      v-model="permission.create"
                      label=""
                    />
                  </div>
                </td>
              </tr>
            </template>
          </VTable>

          <!-- 👉 Actions button -->
          <div class="d-flex align-center justify-center gap-3 mt-6">
            <VBtn
              color="#00ce96"
              style="color: #fff;"
              @click="onSubmit"
            >
              Guardar
            </VBtn>

            <VBtn
              color="#bebebe"
              variant="tonal"
             
              @click="onReset"
            >
              Cancel
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.permission-table {
  td {
    border-block-end: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    padding-block: 0.5rem;

    .v-checkbox {
      min-inline-size: 4.75rem;
    }

    &:not(:first-child) {
      padding-inline: 0.5rem;
    }

    .v-label {
      white-space: nowrap;
    }
  }
}
</style>
