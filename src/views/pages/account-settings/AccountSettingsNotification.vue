<script setup>
const toggleSwitch = ref(true)
const toggleFalseSwitch = ref(false)
const toggleSwitch1 = ref(false)
const toggleFalseSwitch2 = ref(false)

const capitalizedLabel = label => {
  const convertLabelText = label.toString()
  
  return convertLabelText.charAt(0).toUpperCase() + convertLabelText.slice(1)
}

const recentDevices = ref([
  {
    type: 'New for you',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'Account activity',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: 'A new browser used to sign in',
    email: true,
    browser: true,
    app: false,
  },
  {
    type: 'A new device is linked',
    email: true,
    browser: false,
    app: false,
  },
])

const selectedNotification = ref('Only when I\'m online')
</script>

<template>
  <VCard>
    <VCardText>
      <VSwitch
        v-model="toggleSwitch"
        label="Notificacion de tratamiento Efectivo"
        class="pt-5"
      />
      <VSwitch
        v-model="toggleSwitch1"
        class="pt-5 pb-5"
        label="Notificacion de Nota Medica"
      />
    </VCardText>
   
    <VCardText>
      <VBtn
        color="#00ce96"
        style="margin-right: 15px;"
      >
        Guardar
      </VBtn>
      <VBtn
        color="#bebebe"
        variant="tonal"
        type="reset"
        @click.prevent="resetForm"
      >
        Reset
      </VBtn>
    </VCardText>
  </VCard>
</template>
