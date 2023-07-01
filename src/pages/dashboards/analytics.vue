<script setup>
import ApexChartDataScience from '@/views/charts/apex-chart/ApexChartDataScience.vue'
import { useTheme } from 'vuetify'


const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors

const statisticsVerticalA = {
  title: 'Solicitudes de Citas',
  color: currentTheme.primary,
  icon: 'custom-iconsolicitas',
  stats: '145',  height: 97,  series: [{
    data: [
      100,
      200,
      300,
      350,
      100,
      0,
      1,
    ],
    colors: [currentTheme.primary], // Color de línea para la serie de datos
  }],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: false },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: { show: false },
    colors: [currentTheme.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: { show: false },
      labels: { show: false },
      stroke: { width: 0 },
      axisBorder: { show: false },
    },
    yaxis: {
      stroke: { width: 0 },
      show: false,
    },
  },
}

const statisticsVerticalB = {
  title: 'Citas en Turno',
  color: currentTheme.warning,
  icon: 'custom-iconcitasenturno',
  stats: '250',
  height: 97,
  series: [{
    data: [
      10,
      20,
      30,
      100,
      500,
      250,
      10,
    ],
    colors: [currentTheme.warning], // Color de línea para la serie de datos
  }],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: false },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: { show: false },
    colors: [currentTheme.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: { show: false },
      labels: { show: false },
      stroke: { width: 0 },
      axisBorder: { show: false },
    },
    yaxis: {
      stroke: { width: 0 },
      show: false,
    },
  },
}

const statisticsVerticalC = {
  title: 'Citas Canceladas',
  color: currentTheme.success,
  icon: 'custom-iconcanceladas',
  stats: '124',
  height: 97,
  series: [{
    data: [
      300,
      350,
      330,
      380,
      340,
      400,
      380,
    ],
    colors: [currentTheme.success], // Color de línea para la serie de datos
  }],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: false },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: { show: false },
    colors: [currentTheme.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: { show: false },
      labels: { show: false },
      stroke: { width: 0 },
      axisBorder: { show: false },
    },
    yaxis: {
      stroke: { width: 0 },
      show: false,
    },
  },
}

const statisticsVerticalD = {
  title: 'Total de Aplicantes',
  color: currentTheme.info,
  icon: 'custom-iconaplicantes',
  stats: '10',
  height: 97,
  series: [{
    data: [
      10,
      50,
      20,
      40,
      100,
      50,
      10,
    ],
    colors: [currentTheme.info], // Color de línea para la serie de datos
  }],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: false },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: { show: false },
    colors: [currentTheme.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: { show: false },
      labels: { show: false },
      stroke: { width: 0 },
      axisBorder: { show: false },
    },
    yaxis: {
      stroke: { width: 0 },
      show: false,
    },
  },
}


import { useUserListStore } from '@/views/apps/user/useUserListStore'
import { avatarText } from '@core/utils/formatters'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()
const totalPage = ref(1)
const totalUsers = ref(0)
const users = ref([])

const options = ref({
  page: 1,
  itemsPerPage: 0,
})

// Headers
const headers = [
  {
    title: 'Paciente',
    key: 'user',
  },
  {
    title: 'Medico Asignado',
    key: 'role',
  },
  {
    title: 'Fecha',
    key: 'plan',
  },
  {
    title: 'Enfermedades',
    key: 'billing',
  },
  {
    title: 'Acciones',
    key: 'actions',
    sortable: false,
  },
]

const headersDocs = [
  {
    title: 'Médicos',
    key: 'user',
  },
  {
    title: 'Estado',
    key: 'status',
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
    totalPage.value = response.data.totalPage
    totalUsers.value = response.data.totalUsers
    options.value.page = response.data.page
  }).catch(error => {
    console.error(error)
  })
}

watchEffect(fetchUsers)

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'warning',
      icon: 'tabler-circle-check',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'primary',
      icon: 'tabler-chart-pie-2',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'info',
      icon: 'tabler-edit',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  
  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'en consulta')
    return 'warning'
  if (statLowerCase === 'disponible')
    return 'success'
  if (statLowerCase === 'ausente')
    return 'secondary'
  
  return 'primary'
}

const resolveUserStatusVariantE = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'influenza')
    return 'primary'
  if (statLowerCase === 'neumonia')
    return 'error'
  if (statLowerCase === 'diabetes')
    return 'info'
  
  return 'primary'
}

const deleteUser = id => {
  userListStore.deleteUser(id)

  // refetch User
  fetchUsers()
}
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 Statistics Vertical -->
    <VCol
      cols="12"
      md="3"
      sm="4"
    >
      <CardStatisticsVertical
        v-bind="statisticsVerticalA"
        :chart-options="{
          ...statisticsVerticalA.chartOptions,
          colors: [currentTheme.primary] // Color de línea para el gráfico
        }"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
      sm="4"
    >
      <CardStatisticsVertical
        v-bind="statisticsVerticalB"
        :chart-options="{
          ...statisticsVerticalB.chartOptions,
          colors: [currentTheme.warning] // Otro color de línea para el gráfico
        }"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
      sm="4"
    >
      <CardStatisticsVertical
        v-bind="statisticsVerticalC"
        :chart-options="{
          ...statisticsVerticalC.chartOptions,
          colors: [currentTheme.success] // Otro color de línea para el gráfico
        }"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
      sm="4"
    >
      <CardStatisticsVertical
        v-bind="statisticsVerticalD"
        :chart-options="{
          ...statisticsVerticalD.chartOptions,
          colors: [currentTheme.info] // Otro color de línea para el gráfico
        }"
      />
    </VCol>

    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Ingresos y Egresos</VCardTitle>
        </VCardItem>

        <VCardText>
          <ApexChartDataScience />
        </VCardText>
      </VCard>
    </VCol>
    
    <VCol
      cols="12"
      sm="8"
    >
      <VCard title="Ultimas Citas">
        <!-- SECTION datatable -->
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
              <VAvatar
                size="34"
                :variant="!item.raw.avatar ? 'tonal' : undefined"
                :color="!item.raw.avatar ? resolveUserStatusVariantE(item.raw.role).color : undefined"
                class="me-3"
              >
                <VImg
                  v-if="item.raw.avatar"
                  :src="item.raw.avatar"
                />
                <span v-else>{{ avatarText(item.raw.fullName) }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                    class="font-weight-medium user-list-name"
                  >
                    {{ item.raw.fullName }}
                  </RouterLink>
                </h6>              
              </div>
            </div>
          </template>

          <!-- 👉 Role -->
          <template #item.role="{ item }">
            <div class="d-flex align-center gap-4">
              <span class="text-capitalize">{{ item.raw.role }}</span>
            </div>
          </template>

          <!-- Plan -->
          <template #item.plan="{ item }">
            <span class="text-capitalize font-weight-medium">{{ item.raw.currentPlan }}</span>
          </template>

          <!-- Status -->
          <template #item.billing="{ item }">
            <VChip
              :color="resolveUserStatusVariant(item.raw.status)"
              size="small"
              label
              class="text-capitalize"
            >
              {{ item.raw.billing }}
            </VChip>
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <IconBtn @click="deleteUser(item.raw.id)">
              <VIcon icon="tabler-trash" />
            </IconBtn>

            <IconBtn>
              <VIcon icon="tabler-edit" />
            </IconBtn>

            <VBtn
              icon
              variant="text"
              size="small"
              color="medium-emphasis"
            >
              <VMenu activator="parent">
                <VList>
                  <VListItem :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }">
                    <template #prepend>
                      <VIcon icon="tabler-eye" />
                    </template>

                    <VListItemTitle>View</VListItemTitle>
                  </VListItem>

                  <VListItem link>
                    <template #prepend>
                      <VIcon icon="tabler-pencil" />
                    </template>
                    <VListItemTitle>Edit</VListItemTitle>
                  </VListItem>

                  <VListItem @click="deleteUser(item.raw.id)">
                    <template #prepend>
                      <VIcon icon="tabler-trash" />
                    </template>
                    <VListItemTitle>Delete</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </template>
        </VDataTableServer>
        <!-- SECTION -->
      </VCard>
    </VCol>
    <VCol
      cols="12"
      sm="4"
    >
      <VCard title="Médicos">
        <!-- DOCTORES -->
        <VDataTableServer
          :items="users"
          :items-length="null"
          :headers="headersDocs"
          :pagination="false"
          class="text-no-wrap"
          @update:options="options = $event"
        >
          <!-- User -->
          <template #item.user="{ item }">
            <div class="d-flex align-center">
              <VAvatar
                size="34"
                :variant="!item.raw.avatar ? 'tonal' : undefined"
                :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
                class="me-3"
              >
                <VImg
                  v-if="item.raw.avatar"
                  :src="item.raw.avatar"
                />
                <span v-else>{{ avatarText(item.raw.fullName) }}</span>
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-base">
                  <RouterLink
                    :to="{ name: 'apps-user-view-id', params: { id: item.raw.id } }"
                    class="font-weight-medium user-list-name"
                  >
                    {{ item.raw.fullName }}
                  </RouterLink>
                </h6>
              </div>
            </div>
          </template>

          <!-- Status -->
          <template #item.status="{ item }">
            <VChip
              :color="resolveUserStatusVariant(item.raw.status)"
              size="small"
              label
              class="text-capitalize"
            >
              {{ item.raw.status }}
            </VChip>
          </template>            
        </VDataTableServer>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
