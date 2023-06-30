<script setup>
import { useAppAbility } from '@/plugins/casl/useAppAbility'
import axios from '@axios'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import cemenavImgLogin from '@images/img_fondologin.png'
import cemenavLogo from '@images/logos/cemenav.png'
import imageWelcome from '@images/pages/LoginPageWelcome.png'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import {
  emailValidator,
  requiredValidator,
} from '@validators'
import { VForm } from 'vuetify/components/VForm'

/*
Color azul | 3545b3
Color naranja | ff8c44
Color verde | 00ce96
Color gris | bebebe
Color morado | 6a3cbf
Color verde cajas | 037c44
*/
const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, cemenavLogo, imageWelcome, cemenavImgLogin, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)
const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const ability = useAppAbility()

const errors = ref({
  email: undefined,
  password: undefined,
})

const refVForm = ref()
const email = ref('admin@demo.com')
const password = ref('admin')
const rememberMe = ref(false)

const login = () => {
  axios.post('/auth/login', {
    email: email.value,
    password: password.value,
  }).then(r => {
    const { accessToken, userData, userAbilities } = r.data

    localStorage.setItem('userAbilities', JSON.stringify(userAbilities))
    ability.update(userAbilities)
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('accessToken', JSON.stringify(accessToken))

    // Redirect to `to` query if exist or redirect to index route
    router.replace(route.query.to ? String(route.query.to) : '/')
  }).catch(e => {
    const { errors: formErrors } = e.response.data

    errors.value = formErrors
    console.error(e.response.data)
  })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative bg-background rounded-lg w-100 ma-0 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg :src="cemenavImgLogin" />
        </div>        
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex flex-column justify-center mx-auto"
      style="height: 100vh;"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4 justify-center mx-auto"
      >
        <VCardText>
          <VImg
            max-width="200"
            :src="cemenavLogo"
            class="auth-illustration mt-0 mb-0 mx-auto"
          />
          <h3
            class="text-h3 mb-1 text-center"
            style="color: #3545b3;"
          >
            Iniciar Sesion
          </h3>
        </VCardText>  

        <VCardText>
          <h5 class="text-h5 mb-1 text-center">
            <strong>Ingresa tus credenciales correspondientes CEMENAV</strong>
          </h5>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  label="Correo Electrónico"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  label="Contraseña"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Recordar contraseña"
                  />
                  <RouterLink
                    class="text-primary ms-2 mb-1"
                    :to="{ name: 'forgot-password' }"
                  >
                    Olvidé mi contraseña
                  </RouterLink>
                </div>

                <VBtn
                  block
                  type="submit"
                  color="rgb(255, 117, 0)"
                  style="color: #fff; font-weight: bold;"
                >
                  Iniciar Sesión
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>

      <div
        class="text-center mb-2"
        style="margin-top: auto;"
      >
        Copyright © 2023 CEMENAV Centro Médico Naval/ Todos los derechos reservados Diseño web por <strong><span style="color: rgb(57, 52, 168);">dosbyte.com.mx</span></strong>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
