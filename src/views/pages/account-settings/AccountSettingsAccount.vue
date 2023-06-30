<script setup>
import avatar1 from '@images/avatars/avatar-14.png'

const accountData = {
  avatarImg: avatar1,
  firstName: ' ',
  lastName: ' ',
  email: ' ',
  org: ' ',
  phone: ' ',
  address: ' ',
  state: ' ',
  zip: ' ',
  country: ' ',
  language: ' ',
  timezone: ' ',
  currency: ' ',
}

const refInputEl = ref()
const isConfirmDialogOpen = ref(false)
const accountDataLocal = ref(structuredClone(accountData))

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Profile Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-4">
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="tabler-cloud-upload"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="secondary"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="tabler-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText class="pt-2">
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.firstName"
                  label="Nombre Comercial"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <AppTextField
                  v-model="accountDataLocal.lastName"
                  label="Nombre o Razon Social"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.email"
                  label="RFC"                  
                />
              </VCol>

              <!-- 👉 Organization -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.org"
                  label="Regimen Fiscal"
                />
              </VCol>

              <!-- 👉 Phone -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.phone"
                  label="Correo Electronico"
                  type="email"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.address"
                  label="Celular"
                />
              </VCol>
              
              <VCol
                cols="12"
                md="12"
              >
                <h3
                  class="pt-3"
                  color="secondary"
                >
                  Direccion Fiscar
                </h3>
              </VCol>
             
              <!-- 👉 State -->
              <VCol
                cols="12"
                md="12"
              >
                <AppTextField
                  v-model="accountDataLocal.state"
                  label="Calle"
                />
              </VCol>

              <!-- 👉 Zip Code -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.zip"
                  label="No. Exterior"
                />
              </VCol>

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.country"
                  label="No. Interior"
                />
              </VCol>

              <!-- 👉 Language -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.language"
                  label="Colonia"                 
                />
              </VCol>

              <!-- 👉 Timezone -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.timezone"
                  label="Localidad"                 
                />
              </VCol>

              <!-- 👉 Currency -->
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.currency"
                  label="Municipio"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.currency"
                  label="Estado"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  v-model="accountDataLocal.currency"
                  label="Pais"
                />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn color="warning">
                  Guardar
                </VBtn>

                <VBtn
                  color="secundary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- Confirm Dialog -->
  <ConfirmDialog
    v-model:isDialogVisible="isConfirmDialogOpen"
    confirmation-question="Are you sure you want to deactivate your account?"
    confirm-title="Deactivated!"
    confirm-msg="Your account has been deactivated successfully."
    cancel-title="Cancelled"
    cancel-msg="Account Deactivation Cancelled!"
  />
</template>
